var youtubeAPI = require('youtube-api');
//Wraps this guy: https://developers.google.com/youtube/v3/docs/videos/list
const videos = {
    /**
     * Wrapper function for YoutubeAPI videos.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Promise(function (resolve, reject) {
            youtubeAPI.videos.list(params, function(err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
};

module.exports = videos;
