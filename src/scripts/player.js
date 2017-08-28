console.log('hello world');

let container = document.querySelector('.container');

let video = document.createElement('video');

video.src = "./src/videos/video.mp4";

video.id = "video";

video.autoplay = "true";

video.controls = "true";

container.appendChild(video);