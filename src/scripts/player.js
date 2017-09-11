// Beautiful player using POO

// Work In Progress

class Player {
  constructor(basePath, parent, id, className, link, width, height, controls, autoplay) {
    this.parent    = document.querySelector(parent)
    this.link      = basePath + link
    this.width     = width
    this.height    = height
    this.autoplay  = autoplay
    this.id        = id
    this.className = className

    let myPlayer = document.createElement('video')

    myPlayer.src       = this.link
    myPlayer.id        = this.id
    myPlayer.className = this.className
    myPlayer.autoplay  = this.autoplay
    myPlayer.width     = this.width
    myPlayer.height    = this.height

    this.parent.appendChild(myPlayer)

    // Check if controls are required
    if (controls) {
      this.createControllers()
    } else {
      console.log('To enable controllers turn controls to true')
    }
  }

  createControllers() {
    // Target the player
    let player = document.getElementById(this.id)

    // Create control bar
    let controlBar = document.createElement('div')
    controlBar.className = 'controlBar'
    this.parent.appendChild(controlBar)

    // Create play/pause button
    let playPauseButton = document.createElement('div')
    playPauseButton.className = 'playPauseButton'
    controlBar.appendChild(playPauseButton)

    // Check Video Status to display the right button (at start) (could be improved for sure)
    if(player.paused) {
      playPauseButton.classList.remove('isPlaying')
      playPauseButton.classList.add('isPaused')
    } else {
      playPauseButton.classList.remove('isPaused')
      playPauseButton.classList.add('isPlaying')
    }

    // Event Play/Pause on click video
    player.addEventListener('click', function() {
      if(player.paused) {
        player.play()
        playPauseButton.classList.remove('isPlaying')
        playPauseButton.classList.add('isPaused')
      } else {
        player.pause()
        playPauseButton.classList.remove('isPaused')
        playPauseButton.classList.add('isPlaying')
      }
    })

    // Event Play/Pause on click button
    playPauseButton.addEventListener('click', function() {
      if(player.paused) {
        player.play()
        playPauseButton.classList.remove('isPlaying')
        playPauseButton.classList.add('isPaused')
      } else {
        player.pause()
        playPauseButton.classList.remove('isPaused')
        playPauseButton.classList.add('isPlaying')
      }
    })

    // Volume
    let volumeController = document.createElement('div')
    volumeController.className = 'volumeController'
    controlBar.appendChild(volumeController)
    let volumeBar = document.createElement('div')
    volumeBar.className = 'volumeBar'
    volumeController.appendChild(volumeBar)
    volumeBar.style.width = (player.volume * 100) + '%';
  }
}

// Creating new Player

let customPlayer = new Player('./src/videos/', '.player', '1', 'customPlayer', 'video.mp4', 400, 300, true, true)
