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

  process.then(function (video) {
  // Callback mode
  video.fnExtractFrameToJPG('D:\\Dropbox\\BatchVideoProcessing\\Frames\\', {
    frame_rate : 1,
    number : 115,
    file_name : 'my_frame_%t_%s'
  }, function (error, files) {
    if (!error)
      console.log('Frames: ' + files);
  });
}, function (err) {
  console.log('Error: ' + err);
});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}
