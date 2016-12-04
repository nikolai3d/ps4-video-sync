const ytapi = require('node-youtubeapi-simplifier'); //Youtube API Wrapper doc: https://github.com/Haidy777/node-youtubeAPI-simplifier/tree/master/docs
const api_key = require('./api-key').api_key();

console.log("Key", api_key);
ytapi.setup(api_key); //To get your API key:
// https://developers.google.com/youtube/registering_an_application#Create_API_Keys
// https://console.developers.google.com/apis/credentials (may need to create a New Project)

ytapi.searchFunctions.channelInternalSearch('NikolaiOfTardis', 'Battlefield', 5).then(function (data) {
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
