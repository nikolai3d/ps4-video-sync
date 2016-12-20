'use strict';

var ffmpeg = require('ffmpeg');

// try {
// 	var process = new ffmpeg('D:\\Dropbox\\BatchVideoProcessing\\Gallipoli.mp4');
// 	process.then(function (video) {
// 		// Video metadata
// 		console.log(video.metadata);
// 		// FFmpeg configuration
// 		//console.log(video.info_configuration);
// 	}, function (err) {
// 		console.log('Error: ' + err);
// 	});
//
// //   process.then(function (video) {
// //   // Callback mode
// //   video.fnExtractFrameToJPG('D:\\Dropbox\\BatchVideoProcessing\\Frames\\', {
// //     frame_rate : 1,
// //     number : 115,
// //     file_name : 'my_frame_%t_%s'
// //   }, function (error, files) {
// //     if (!error)
// //       console.log('Frames: ' + files);
// //   });
// // }, function (err) {
// //   console.log('Error: ' + err);
// // });
//
//
// } catch (e) {
// 	console.log(e.code);
// 	console.log(e.msg);
// }

var fs = require('fs');
var ytdl = require('ytdl-core');
var fsextra = require('fs-extra');
const path = require('path');
// ytdl('https://www.youtube.com/watch?v=ut4Ba5QGOwI')
//   .pipe(fs.createWriteStream('zara.flv'));

  // import { Pully, Presets } from 'pully';
  const Pully = require('pully').Pully;
  const Presets = require('pully').Presets;

  const ProgressBar = require('ascii-progress');

  const pully = new Pully();

  const bar = new ProgressBar();

  // console.log(process);

  if (process.argv.length < 2) {
    throw new Error ("Bad Arguments");
  }

  const argURL = process.argv[2];

  // 'https://www.youtube.com/watch?v=HEImxRk8Ugw',
  // https://www.youtube.com/watch?v=lH2Ctn1Afn4', //'https://youtu.be/1LGoIk8oILE',//https://www.youtube.com/watch?v=NOIzH6UcoW4', //https://www.youtube.com/watch?v=ut4Ba5QGOwI', // https://www.youtube.com/watch?v=J7UwSVsiwzI

  const options = {
    url: argURL,
    preset: Presets.Max,
    progress: (data) => {
      //console.log(data.percent + '%');
      bar.update(data.percent * 0.01);
    } // Progress reporter callback...
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
