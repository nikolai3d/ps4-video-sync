const ytapi = require('node-youtubeapi-simplifier');


ytapi.setup('AIzaSyBgbcxUK2lL3x-JTnV4wqut8vXWlak7_wM');

ytapi.searchFunctions.channelInternalSearch('NikolaiOfTardis', 'DOOM', 25).then(function (data) {
    console.log(data);
});

// ytapi.searchFunctions.simpleSearch('Battlefield').then(function (data) {
//     console.log(data);
// });

ytapi.channelFunctions.getDetailsForUser('NikolaiOfTardis').then(function (data) {
    console.log('ChannelId: ' + data.channelId);
    console.log('Title: ' + data.title);
    console.log('Description: ' + data.description);
    console.log('Published at: ' + data.publishedAt);
    console.log('Avatar Urls:');
    console.log(data.avatar);
    console.log('Likes Playlist: ' + data.likesPlaylist);
    console.log('Favorites Playlist: ' + data.favoritesPlaylist);
    console.log('Uploads Playlist: ' + data.uploadsPlaylist);
});
