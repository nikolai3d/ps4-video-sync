'use strict';

var ffmpeg = require('ffmpeg');

try {
	var process = new ffmpeg('D:\\Dropbox\\BatchVideoProcessing\\Gallipoli.mp4');
	process.then(function (video) {
		// Video metadata
		console.log(video.metadata);
		// FFmpeg configuration
		//console.log(video.info_configuration);
	}, function (err) {
		console.log('Error: ' + err);
	});

//   process.then(function (video) {
//   // Callback mode
//   video.fnExtractFrameToJPG('D:\\Dropbox\\BatchVideoProcessing\\Frames\\', {
//     frame_rate : 1,
//     number : 115,
//     file_name : 'my_frame_%t_%s'
//   }, function (error, files) {
//     if (!error)
//       console.log('Frames: ' + files);
//   });
// }, function (err) {
//   console.log('Error: ' + err);
// });


} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}

var fs = require('fs');
var ytdl = require('ytdl-core');
var fsextra = require('fs-extra');
const path = require('path');
// ytdl('https://www.youtube.com/watch?v=ut4Ba5QGOwI')
//   .pipe(fs.createWriteStream('zara.flv'));

  // import { Pully, Presets } from 'pully';
  const Pully = require('pully').Pully;
  const Presets = require('pully').Presets;

  const pully = new Pully();

  const options = {
    url: 'https://www.youtube.com/watch?v=ut4Ba5QGOwI', // https://www.youtube.com/watch?v=J7UwSVsiwzI
    preset: Presets.HD,
    progress: (data) => console.log(data.percent + '%') // Progress reporter callback...
  };
  console.log("Starting download", options.url)
  pully.download(options).then(
    (resultpath) => {
      console.log('Downloaded to ' + resultpath.path);
      const destpath =  path.resolve(__dirname,'./result.mp4');
      console.log('Copying to ' + destpath)
      fsextra.copySync(resultpath.path,destpath);
    }).catch(
    (err) => {
      console.error(err);
    } // Error info
  );
