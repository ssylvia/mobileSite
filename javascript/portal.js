dojo.require('esri.arcgis.Portal');
dojo.require("esri.IdentityManager");
dojo.require("dojox.lang.aspect");

var _storySwipe;

var displayOptions = {
    templateUrl: 'http://www.arcgis.com/apps/OnePane/basicviewer/profile.html',
    numItemsPerPage: 3,
    group: {
        "owner": "StoryMaps",
        "title": "Recent story maps"
    },
    portalUrl: 'http://www.arcgis.com'
};

var _portal,
    _group,
    _nextQueryParams,
    _queryParams,
    _apps = [],
    _total;

var init = function() {
    _portal = new esri.arcgis.Portal(displayOptions.portalUrl);
    dojo.connect(_portal, 'onLoad', loadPortal);
    dojox.lang.aspect.advise(_portal, "queryItems", {
        afterReturning: function (queryItemsPromise) {
            queryItemsPromise.then(function (result) {
                _nextQueryParams = result.nextQueryParams;
                _queryParams = result.queryParams;
            });
        }
    });
};

var loadPortal = function(){

    var params = {
        q: 'title: ' + displayOptions.group.title + ' AND owner:' + displayOptions.group.owner
    };

    _portal.queryGroups(params).then(function(groups){
        if (groups.results.length > 0) {
            _group = groups.results[0];

            var params = {
                q: ' type: Web Mapping Application',
                num: displayOptions.numItemsPerPage,
                sortField : 'uploaded',
                sortOrder : 'desc'
            };

            _group.queryItems(params).then(loadApplicationData);

        }
    });
};

var loadApplicationData = function(queryResponse){
    _total = queryResponse.total;
    dojo.forEach(queryResponse.results, function(app,i){
        if (_queryParams.start === 0){
            $("#imgCon"+i).css("background-image","url("+app.thumbnailUrl+")");
        }
        _apps.push(app);
    });

    queryAll();
};

var queryAll = function(){

    var params = {
        q: ' type: Web Mapping Application',
        num: _total,
        sortField : 'uploaded',
        sortOrder : 'desc'
    };

    _group.queryItems(params).then(function(queryResponse){
        dojo.forEach(queryResponse.results, function(app,i){
            if (i > 2){
                _apps.push(app);
            }
        });
        dojo.forEach(_apps,function(story,i){
            if (i === 0){
                $("#storiesGallery").append("<li style='display:block'><div id='storyCon"+i+"' class='storyCon'><div id='storyImg"+i+"' class='imgCon storyCon' style='background-image:url("+story.thumbnailUrl+");'></div><p id='storyText"+i+"' class='storyText'><strong style='font-size:18px'>"+story.title+"</strong><br>"+story.snippet+"<br><br><em style='font-size:14px'>Visit our website on your desktop or iPad to view the full story.</em></p></li>");
            }
            else{
                $("#storiesGallery").append("<li style='display:none'><div id='storyCon"+i+"' class='storyCon'><div id='storyImg"+i+"' class='imgCon storyCon' style='background-image:url("+story.thumbnailUrl+");'></div><p id='storyText"+i+"' class='storyText'><strong style='font-size:18px'>"+story.title+"</strong><br>"+story.snippet+"<br><br><em style='font-size:14px'>Visit our website on your desktop or iPad to view the full story.</em></p></li>");
            }
        });
    });
};

dojo.addOnLoad(init);