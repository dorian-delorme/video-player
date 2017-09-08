// Beautiful player using POO

// Work In Progress

class Player {
  constructor(basePath, parent, id, className, link, width, height, autoplay) {
    this.parent    = document.querySelector(parent)
    this.link      = basePath + link
    this.width     = width
    this.height    = height
    this.autoplay  = autoplay
    this.id        = id
    this.className = className
  }

  create() {
    let myPlayer = document.createElement('video')

    myPlayer.src       = this.link
    myPlayer.id        = this.id
    myPlayer.className = this.className
    myPlayer.autoplay  = this.autoplay
    myPlayer.width     = this.width
    myPlayer.height    = this.height

    this.parent.appendChild(myPlayer)
  }

  controls() {
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

    // Check Video Status to display the right button
    // if(player.paused) {
    //   player.className.remove('.isPlaying')
    //   player.className.add('.isPaused')
    // }
    // else {
    //   player.className.remove('.isPaused')
    //   player.className.add('.isPlaying')
    // }

    // Event Play/Pause on click video
    player.addEventListener('click', function() {
      if(player.paused) {
        player.play()
      }
      else {
        player.pause()
      }
    })

    // Event Play/Pause on click button
    playPauseButton.addEventListener('click', function() {
      if(player.paused) {
        player.play()
      }
      else {
        player.pause()
      }
    })
    console.log(player.currentTime);
  }
}

// Creating new Player

let customPlayer = new Player('./src/videos/', '.player', '1', 'customPlayer', 'video.mp4', 400, 300, true)

customPlayer.create()

customPlayer.controls()