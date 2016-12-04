const ytapi = require('node-youtubeapi-simplifier'); //Youtube API Wrapper doc: https://github.com/Haidy777/node-youtubeAPI-simplifier/tree/master/docs
const api_key = require('./api-key').api_key();
const ytlist = require('./videos-list-api-wrapper');
console.log("Key", api_key);
ytapi.setup(api_key); //To get your API key:
// https://developers.google.com/youtube/registering_an_application#Create_API_Keys
// https://console.developers.google.com/apis/credentials (may need to create a New Project)


var videoFunctions = {
    _getDetailsForVideoIds: function (videoIds, pageToken) {
        var params = {
            part: 'snippet,statistics',
            maxResults: 50,
            id: ''
        };

        if(pageToken){
            params.pageToken = pageToken;
        }

        for (var i = 0; i < videoIds.length; i++) {
            params.id = params.id + videoIds[i] + ',';
        }

        //remove last ,
        if (params.id.substr(-1) === ',') {
            params.id = params.id.substr(0, params.id.length - 1);
        }

        return ytlist.list(params).then(function (data) {
            var videoDetails = [],
                items = data.items,
                nextPageToken = data.nextPageToken || '';

            for(var i = 0; i < items.length; i++){
                var video = items[i],
                    snippet = video.snippet;

                videoDetails.push({
                    id: video.id,
                    title: snippet.title,
                    description: snippet.description,
                    publishedAt: snippet.publishedAt,
                    thumbnails: snippet.thumbnails,
                    statistics: video.statistics,
                    channelId: snippet.channelId
                });
            }

            if(nextPageToken !== ''){
                return videoFunctions._getDetailsForVideoIds(videoIds.slice(49), nextPageToken).then(function (data) {
                   return videoDetails.concat(data);
                });
            }

            return Promise.all(videoDetails);
        });
    },

    getDetailsForVideoIds: function (videoIds) {
        return videoFunctions._getDetailsForVideoIds(videoIds);
    }
};

ytapi.searchFunctions.channelInternalSearch('NikolaiOfTardis', 'Battlefield', 5).then(function (data) {
    // console.log(data);

    if (data.length > 0) {
      const videoID = data[0].videoId;
      console.log("VideoID", videoID);

      videoFunctions.getDetailsForVideoIds([videoID]).then(function (data) {
      console.log(data);
      });
    }

});

// ytapi.searchFunctions.simpleSearch('Battlefield').then(function (data) {
//     console.log(data);
// });

// ytapi.channelFunctions.getDetailsForUser('NikolaiOfTardis').then(function (data) {
//     console.log('ChannelId: ' + data.channelId);
//     console.log('Title: ' + data.title);
//     console.log('Description: ' + data.description);
//     console.log('Published at: ' + data.publishedAt);
//     console.log('Avatar Urls:');
//     console.log(data.avatar);
//     console.log('Likes Playlist: ' + data.likesPlaylist);
//     console.log('Favorites Playlist: ' + data.favoritesPlaylist);
//     console.log('Uploads Playlist: ' + data.uploadsPlaylist);
// });

// ytapi.videoFunc
