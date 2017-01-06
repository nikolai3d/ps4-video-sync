```
$ npm install
```

2. Install FFmpeg: https://ffmpeg.org/download.html

3. Make sure the ffmpeg binaries are in the PATH:, e.g. put this into your `~/.bash_profile`
```
PATH=/D/Dropbox/BatchVideoProcessing/ffmpeg-3.2-win64-static/bin:$PATH
```

4. Needs API key to run, create a `api-key.js` file in the root directory:
```
function api_key(){
  return "XXXXXXXXXXXXXXXXXXXXXXXXXXX-XXXXXXXXXXX"
}

module.exports = {
  api_key
};
```


5. To get an API key:
   * https://developers.google.com/youtube/registering_an_application#Create_API_Keys
   * Create new project, get a project ID `PROJECT_ID`
   * https://console.developers.google.com/apis/api/youtube/overview?project=PROJECT_ID (click `Enable API`)
   * You now should see `YouTube Data API v3` on your API dashboard: https://console.developers.google.com/apis/dashboard?project=PROJECT_ID
   * https://console.developers.google.com/apis/credentials?project=PROJECT_ID (Go to `Credentials` tab, Click `Create Credentials` > `API Key`)

4. Run:

```
$ node downloader.js <YT-URL>
```
