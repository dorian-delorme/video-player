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

    // Check Video Status to display the right button
    if(player.autoplay) {
      playPauseButton.classList.add('isPlaying')
    } else {
      playPauseButton.classList.remove('isPlaying')
    }

    let playPauseEvents = [player, playPauseButton]
    playPauseEvents.forEach(function(e) {
      e.addEventListener('click', function() {
        if(player.paused) {
          player.play()
          playPauseButton.classList.add('isPlaying')
        } else {
          player.pause()
          playPauseButton.classList.remove('isPlaying')
        }
      })
    })

    this.parent.addEventListener('keydown', function(e) {
      if (e.keyCode === 32) {
        if(player.paused) {
          player.play()
          playPauseButton.classList.add('isPlaying')
        } else {
          player.pause()
          playPauseButton.classList.remove('isPlaying')
        }
      }
    })

    // Volume

    // Mute Button
    let muteButton = document.createElement('div')
    muteButton.className = 'muteButton'
    controlBar.appendChild(muteButton)

    muteButton.addEventListener('click', function() {
      let volumeSaved = 0;
      if (!muteButton.classList.contains('isMuted')) {
        this.volumeSaved = player.volume
        player.volume = 0;
        muteButton.classList.toggle('isMuted')
      } else {
        player.volume = this.volumeSaved
        muteButton.classList.toggle('isMuted')
      }
    })

    // Volume Slider
    let volumeController = document.createElement('div')
    volumeController.className = 'volumeController'
    controlBar.appendChild(volumeController)

    let volumeBar = document.createElement('div')
    volumeBar.className = 'volumeBar'
    volumeController.appendChild(volumeBar)
    player.volume = 0.5
    volumeBar.style.transform = 'scaleX('+ player.volume + ')'

    let active = false

    volumeController.addEventListener('mousedown', function(event) {
      active = true
      muteButton.classList.remove('isMuted')
        if( 0.1 <= event.offsetX / volumeController.offsetWidth && event.offsetX / volumeController.offsetWidth <= 0.9) {
          player.volume = event.offsetX / volumeController.offsetWidth
        } else if (event.offsetX / volumeController.offsetWidth < 0.1) {
          player.volume = 0
          muteButton.classList.add('isMuted')
        } else {
          player.volume = 1
        }
        volumeBar.style.transform = 'scaleX(' + player.volume + ')'
    })

    volumeController.addEventListener('mousemove', function(event) {
      if(active) {
       muteButton.classList.remove('isMuted')
        if( 0.1 <= event.offsetX / volumeController.offsetWidth && event.offsetX / volumeController.offsetWidth <= 0.9) {
          player.volume = event.offsetX / volumeController.offsetWidth
        } else if (event.offsetX / volumeController.offsetWidth < 0.1) {
          player.volume = 0
          muteButton.classList.add('isMuted')
        } else {
          player.volume = 1
        }
        volumeBar.style.transform = 'scaleX(' + player.volume + ')'
      }
    })

    window.addEventListener('mouseup', function(){
      active = false
    })
  }
}

// Creating new Player

let customPlayer = new Player({ basePath: './src/videos/', parent: '.player', id: '1', className: 'customPlayer', link: 'video.mp4', width: 400, height: 300, controls: true, autoplay: true})
let customPlayer_2 = new Player({ basePath: './src/videos/', parent: '.player_2', id: '2', className: 'customPlayer', link: 'video.mp4', width: 400, height: 300, controls: true, autoplay: true})
