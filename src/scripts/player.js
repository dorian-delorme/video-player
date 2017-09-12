// Beautiful player using POO

// Work In Progress

class Player {
  constructor(params = { basePath, parent, id, className, link, width, height, controls, autoplay}) {

    this.parent    = document.querySelector(params.parent)
    this.link      = params.basePath + params.link
    this.width     = params.width
    this.height    = params.height
    this.autoplay  = params.autoplay
    this.id        = params.id
    this.className = params.className

    let myPlayer = document.createElement('video')

    myPlayer.src       = this.link
    myPlayer.id        = this.id
    myPlayer.className = this.className
    myPlayer.autoplay  = this.autoplay
    myPlayer.width     = this.width
    myPlayer.height    = this.height

    this.parent.appendChild(myPlayer)

    // Check if controls are required
    if (params.controls) {
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

    let playPauseEvents = [player, playPauseButton]
    playPauseEvents.forEach(function(e) {
      e.addEventListener('click', function() {
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
    })

    // Volume
    let volumeController = document.createElement('div')
    volumeController.className = 'volumeController'
    controlBar.appendChild(volumeController)
    // player.volume = volumeController.value / 100

    let volumeBar = document.createElement('div')
    volumeBar.className = 'volumeBar'
    volumeController.appendChild(volumeBar)
    player.volume = 0.5
    volumeBar.style.width = (player.volume * 100) + '%'

    // Mute Button

    // Events to make the volume goes up or down on click
    let events = ['click']
    events.forEach(function(e) {
      volumeController.addEventListener( e, function(event) {
        console.log(e);
        player.volume = event.offsetX / volumeController.offsetWidth
        volumeBar.style.width = ((event.offsetX / volumeController.offsetWidth ) * 100) + '%'
      })
    })
  }
}

// Creating new Player

let customPlayer = new Player({ basePath: './src/videos/', parent: '.player', id: '1', className: 'customPlayer', link: 'video.mp4', width: 400, height: 300, controls: true, autoplay: true})
let customPlayer_2 = new Player({ basePath: './src/videos/', parent: '.player_2', id: '2', className: 'customPlayer', link: 'video.mp4', width: 400, height: 300, controls: true, autoplay: true})
