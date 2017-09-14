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

    // Create Mute Button
    let muteButton = document.createElement('div')
    muteButton.className = 'muteButton'
    controlBar.appendChild(muteButton)

    // Create Volume Slider
    let volumeController = document.createElement('div')
    volumeController.className = 'volumeController'
    controlBar.appendChild(volumeController)

    // Create Volume Bar inside Volume Slider
    let volumeBar = document.createElement('div')
    volumeBar.className = 'volumeBar'
    volumeController.appendChild(volumeBar)

    let activeVolume = false

    // Create currentTimer
    let currentTimer = document.createElement('div')
    currentTimer.className = 'currentTimer'
    currentTimer.innerHTML = '0:00'
    controlBar.appendChild(currentTimer)

    // Create Timeline
    let timeline = document.createElement('div')
    timeline.className = 'timeline'
    controlBar.appendChild(timeline)
    let activeTimeline = false

    // Create vars for lerp
    let position = 0
    let amount = 0.1

    // Create TimelineLoadingBar
    let timelineLoadingBar = document.createElement('div')
    timelineLoadingBar.className = 'timelineLoadingBar'
    timeline.appendChild(timelineLoadingBar)

    // Create Timeline Bar
    let timelineBar = document.createElement('div')
    timelineBar.className = 'timelineBar'
    timeline.appendChild(timelineBar)

    // Create durationTimer
    let durationTimer = document.createElement('div')
    durationTimer.className = 'durationTimer'
    durationTimer.innerHTML = '0:00'
    controlBar.appendChild(durationTimer)

    // Check at start

    // Check Video Status to display the right button
    if(player.autoplay) {
      playPauseButton.classList.add('isPlaying')
    } else {
      playPauseButton.classList.remove('isPlaying')
    }

    // Set volume at start
    player.volume = 0
    volumeBar.style.transform = 'scaleX('+ player.volume + ')'

    // Events

    // PlayPause Events
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

    // Volume Events
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

    volumeController.addEventListener('mousedown', function(event) {
      activeVolume = true
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
      if(activeVolume) {
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
      activeVolume = false
    })

    // Timeline Events
    setInterval(function barProgression(){
          // Display bar progression
      let timelineBarProgression = player.currentTime / player.duration

      if(position === 0) {
        timelineBar.style.transform = 'scaleX(' + timelineBarProgression + ')'
        position += player.currentTime
      } else {
        position += (player.currentTime - position) * amount
        timelineBarProgression = position / player.duration
        timelineBar.style.transform = 'scaleX(' + timelineBarProgression + ')'
      }

      // Display on timeline what is already loaded
      timelineLoadingBar.style.transform = 'scaleX(' + player.buffered.end(0) / player.duration + ')'

    }, 16);

    player.addEventListener('timeupdate', function() {

      // Display time formated
      let durationTimeFormated = new Date(null)
      durationTimeFormated.setSeconds(Math.floor(player.duration))
      let ds = durationTimeFormated.getSeconds()
      let dm = durationTimeFormated.getMinutes()
      let dh = durationTimeFormated.getUTCHours()

      let currentTimeFormated = new Date(null)
      currentTimeFormated.setSeconds(Math.floor(player.currentTime))

      let cs = currentTimeFormated.getSeconds()
      let cm = currentTimeFormated.getMinutes()
      let ch = currentTimeFormated.getUTCHours()

      // Checks for currentTime display
      if(cs >= 0 && cs < 10) {
        cs = '0' + cs
      }
      if(ch > 0 && (cm === 0 && cm < 10)) {
        cm = '0' + cm
      }

      // Checks for durationTime display
      if(ds >= 0 && ds < 10) {
        ds = '0' + ds
      }
      if(dh > 0 && (dm === 0 && dm < 10)) {
        dm = '0' + cm
      }

      //
      if(dh === 0 || ch === 0) {
        currentTimer.innerHTML = cm + ':' + cs
        durationTimer.innerHTML = dm + ':' + ds
      } else {
        currentTimer.innerHTML = ch + ':' + cm + ':' + cs
        durationTimer.innerHTML = dh + ':' + dm + ':' + ds
      }
    })

    timeline.addEventListener('mousedown', function(event) {
      player.pause()
      timelineBar.classList.add('isTransiting')
      activeTimeline = true
      let requestedPosition = event.offsetX / timeline.offsetWidth
      player.currentTime = player.duration * requestedPosition
      timelineBar.style.transform = 'scaleX(' + requestedPosition + ')'
      position = player.currentTime
    })

    timeline.addEventListener('mousemove', function(event) {
      if(activeTimeline) {
      let requestedPosition = event.offsetX / timeline.offsetWidth
      player.currentTime = player.duration * requestedPosition
      timelineBar.style.transform = 'scaleX(' + requestedPosition + ')'
      position = player.currentTime
      }
    })

    window.addEventListener('mouseup', function(){
      if(activeTimeline) {
        timelineBar.classList.remove('isTransiting')
        player.play()
        playPauseButton.classList.add('isPlaying')
        activeTimeline = false
      }
    })
  }
}

// Creating new Player
let customPlayer = new Player({ basePath: './src/videos/', parent: '.player', id: '1', className: 'customPlayer', link: 'video.mp4', width: 800, height: 525, controls: true, autoplay: true})
// let customPlayer_2 = new Player({ basePath: './src/videos/', parent: '.player_2', id: '2', className: 'customPlayer', link: 'video.mp4', width: 400, height: 300, controls: true, autoplay: true})
