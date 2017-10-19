# video-player

Custom video player using Javascript

## Getting Started

This player is build in Javascript in OOP using Class method, to build a new player use :

```
new Player({ basePath: './src/videos/', parent: '.parent', id: '1', ... })
```

## To-Do

* (FIXED) Fix bufferend.range error
* (FIXED) Replace SetInterval by RAF
* (FIXED) Get flex back
* (FIXED) NaN duration issue
* (FIXED) PlayState after switching src
<br/>

* (DONE) Add poster if autoplay is not enabled
* (DONE) Replace all transition : all 500ms ease by transition: truescope time realanimation
* (DONE) Display targeted time on timeline hover
* (DONE) Add Loader
* (DONE) Add quality switch
* (DONE) Color personnalization
<br/>

* Add poster from random frame
* Add subtitle to the video
* Allow no-ES6 friendly to use this player
* Add playspeed options even if I don't see the utily atm
* Add icons to replace ugly blocks
* Play pause animation on screen
* Display frame preview on timeline hover
* More incoming (if you have an idea just send me dm or pull requests)

## Built With

* Javascript ES6
* Class

## Contributing

Please read [CONTRIBUTING.md](https://github.com/dorian-delorme/video-player/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Dorian Delorme** - *Video-Player* - [dorian-delorme](https://github.com/dorian-delorme)

See also the list of [contributors](https://github.com/dorian-delorme/video-player/contributors) who participated in this project.