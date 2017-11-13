// Beautiful player using POO

// Work In Progress

class Player {
  constructor(params = {
    basePath,
    parent,
    id,
    className,
    name,
    width,
    height,
    controls,
    autoplay,
    loop,
    poster,
    mainColor,
    secondColor
  }) {

    this.parent = document.querySelector(params.parent)
    this.basePath = params.basePath
    this.name = params.name
    this.link = params.basePath + params.name
    this.width = params.width
    this.height = params.height
    this.loop = params.loop
    this.id = params.id
    this.className = params.className

    this.playerContainer = document.createElement('div')

    this.playerContainer.className = 'playerContainer'
    this.playerContainer.tabIndex = 0
    this.playerContainer.style.width = this.width + 'px'
    this.playerContainer.style.height = 'auto'
    this.parent.appendChild(this.playerContainer)

    this.player = document.createElement('video')

    this.player.src = this.link
    this.player.id = this.id
    this.player.className = this.className
    this.player.autoplay = params.autoplay
    this.player.controls = false
    this.player.loop = this.loop
    this.player.poster = params.basePath + params.poster
    this.mainColor = params.mainColor
    this.secondColor = params.secondColor

    this.playerContainer.appendChild(this.player)

    // Check if controls are required
    if (params.controls) {
      this.createControllers()
    } else {
      console.log('To enable controllers turn controls paramaters to true')
    }
  }

  createControllers() {

    function formatTime(value) {
      if (value < 10) {
        value = '0' + value
        return value
      } else return value
    }

    let body = document.querySelector('body')

    let player = this.player
    let playerContainer = this.playerContainer
    let parent = this.parent
    let basePath = this.basePath
    let videoName = this.name;
    let mainColor = this.mainColor
    let secondColor = this.secondColor

    // Create Loader
    let loader = document.createElement('div')
    loader.className = 'loader'
    loader.style.borderTop = '8px solid' + mainColor
    playerContainer.appendChild(loader)

    // Create playPause alert
    let playPauseAlert = document.createElement('div')
    playPauseAlert.className = 'playPauseAlert'
    playerContainer.appendChild(playPauseAlert)

    let playAlert = document.createElement('div')
    playAlert.className = 'playAlert'
    playPauseAlert.appendChild(playAlert)

    let pauseAlert = document.createElement('div')
    pauseAlert.className = 'pauseAlert'
    playPauseAlert.appendChild(pauseAlert)

    // Create control bard
    let controlBar = document.createElement('div')
    controlBar.className = 'controlBar'
    playerContainer.appendChild(controlBar)

    let controlBarLeft = document.createElement('div')
    controlBarLeft.className = 'controlBarLeft'
    controlBar.appendChild(controlBarLeft)

    let controlBarRight = document.createElement('div')
    controlBarRight.className = 'controlBarRight'
    controlBar.appendChild(controlBarRight)

    let timer = null

    let bufferedReady = 0

    // Create play/pause button
    let playPauseButton = document.createElement('div')
    playPauseButton.className = 'playPauseButton'
    controlBarLeft.appendChild(playPauseButton)

    // Create volumeContainer
    let volumeContainer = document.createElement('div')
    volumeContainer.className = 'volumeContainer'
    controlBarLeft.appendChild(volumeContainer)

    let volumeTimer = null

    // Create Mute Button
    let muteButton = document.createElement('div')
    muteButton.className = 'muteButton'
    volumeContainer.appendChild(muteButton)

    // Create Volume Slider
    let volumeController = document.createElement('div')
    volumeController.className = 'volumeController'
    volumeContainer.appendChild(volumeController)

    // Create Volume Bar inside Volume Slider
    let volumeBar = document.createElement('div')
    volumeBar.className = 'volumeBar'
    volumeBar.style.backgroundColor = mainColor
    volumeController.appendChild(volumeBar)

    let activeVolume = false

    // Create currentTimer
    let currentTimer = '0:00'

    // Create durationTimer
    let durationTimer = '0:00'

    // Create timerComplete
    let timerComplete = document.createElement('div')
    timerComplete.className = 'timerComplete'
    timerComplete.innerHTML = currentTimer + '\xa0 / \xa0' + durationTimer

    controlBarLeft.appendChild(timerComplete)

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
    timelineLoadingBar.style.backgroundColor = secondColor
    timeline.appendChild(timelineLoadingBar)

    // Create Timeline Bar
    let timelineBar = document.createElement('div')
    timelineBar.className = 'timelineBar'
    timelineBar.style.backgroundColor = mainColor
    timeline.appendChild(timelineBar)

    // Create qualitySwitcher
    let qualitySwitcher = document.createElement('div')
    qualitySwitcher.className = 'qualitySwitcher'
    controlBarRight.appendChild(qualitySwitcher)

    // Create qualitySwitcherItems
    let qualitySwitcherItems = document.createElement('div')
    qualitySwitcherItems.className = 'qualitySwitcherItems'
    qualitySwitcher.appendChild(qualitySwitcherItems)

    // Create qualitySwitcherItem
    let qualitySwitcherItemHD = document.createElement('div')
    qualitySwitcherItemHD.className = 'qualitySwitcherItemHD'
    qualitySwitcherItemHD.classList.add('qualitySwitcherItem')
    qualitySwitcherItemHD.style.backgroundColor = secondColor
    qualitySwitcherItemHD.innerHTML = 'HD'
    qualitySwitcherItems.appendChild(qualitySwitcherItemHD)

    // Create qualitySwitcherItem
    let qualitySwitcherItemSD = document.createElement('div')
    qualitySwitcherItemSD.className = 'qualitySwitcherItemSD'
    qualitySwitcherItemSD.classList.add('qualitySwitcherItem')
    qualitySwitcherItemSD.style.backgroundColor = secondColor
    qualitySwitcherItemSD.innerHTML = 'SD'
    qualitySwitcherItems.appendChild(qualitySwitcherItemSD)

    let qualityTimer = null

    // Create fullscreenButton
    let fullscreenButton = document.createElement('div')
    fullscreenButton.className = 'fullscreenButton'
    controlBarRight.appendChild(fullscreenButton)

    let fullscreenButtonImg = document.createElement('img')
    fullscreenButtonImg.src = basePath + '../../src/img/fullscreen.svg'
    fullscreenButton.appendChild(fullscreenButtonImg)

    // Create timerIndication
    let timerIndication = document.createElement('div')
    timerIndication.className = 'timerIndication'
    timeline.appendChild(timerIndication)

    let isPlaying = null

    let fullscreenMode = false

    let playerStatus = null

    // Check at start

    // Check Video Status to display the right button
    if (player.autoplay) {
      isPlaying = true
      playPauseButton.classList.add('isPlaying')
    } else {
      isPlaying = false
      playPauseButton.classList.remove('isPlaying')
    }

    if (!isPlaying) {
      playPauseAlert.classList.add('playPauseAlertActive')
      playPauseAlert.classList.add('playState')
      playAlert.classList.add('playAlertActive')
    }

    function destroy() {
      playerContainer.removeEventListener('click', function() {
        playerContainer.style.cursor = 'default'
        destroy()
      })
    }

    playerContainer.addEventListener('click', function() {
      playerContainer.style.cursor = 'default'
      destroy()
    })

    // Set volume at start
    player.volume = 0
    volumeBar.style.transform = 'scaleX(' + player.volume + ')'

    // Events

    // PlayPause Events
    let playPauseEvents = [player, playPauseButton]
    playPauseEvents.forEach(function(e) {
      e.addEventListener('click', function() {
        if (player.paused) {
          player.play()
          isPlaying = true
          playPauseButton.classList.add('isPlaying')
        } else {
          player.pause()
          isPlaying = false
          playPauseButton.classList.remove('isPlaying')
        }
      })
    })

    parent.addEventListener('keydown', function(e) {
      if (e.keyCode === 32) {
        if (player.paused) {
          player.play()
          isPlaying = true
          playPauseButton.classList.add('isPlaying')
        } else {
          player.pause()
          isPlaying = false
          playPauseButton.classList.remove('isPlaying')
        }
      }
    })

    // Volume Events
    volumeContainer.addEventListener('mouseover', function() {
      clearTimeout(volumeTimer)
      volumeController.classList.add('volumeControllerHovered')
    })

    volumeContainer.addEventListener('mouseleave', function() {
      volumeTimer = setTimeout(mouseOut, 2000)
    })

    function mouseOut()  {
      volumeController.classList.remove('volumeControllerHovered')
      clearTimeout(volumeTimer)
    }

    muteButton.addEventListener('click', function() {
      let volumeSaved = 0
      if (!muteButton.classList.contains('isMuted')) {
        this.volumeSaved = player.volume
        player.volume = 0
        muteButton.classList.toggle('isMuted')
        volumeBar.style.transform = 'scaleX(' + 0 + ')'
      } else {
        player.volume = this.volumeSaved
        muteButton.classList.toggle('isMuted')
        volumeBar.style.transform = 'scaleX(' + player.volume + ')'
      }
    })

    volumeController.addEventListener('mousedown', function(event) {
      activeVolume = true
      muteButton.classList.remove('isMuted')
      if (0.1 <= event.offsetX / volumeController.offsetWidth && event.offsetX / volumeController.offsetWidth <= 0.9) {
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
      if (activeVolume) {
        muteButton.classList.remove('isMuted')
        if (0.1 <= event.offsetX / volumeController.offsetWidth && event.offsetX / volumeController.offsetWidth <= 0.9) {
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

    window.addEventListener('mouseup', function() {
      activeVolume = false
    })

    let durationTimeFormated = null
    let ds = null
    let dm = null
    let dh = null

    player.addEventListener('canplay', function() {
      durationTimeFormated = new Date(null)
      durationTimeFormated.setSeconds(Math.floor(player.duration))
      ds = durationTimeFormated.getSeconds()
      dm = durationTimeFormated.getMinutes()
      dh = durationTimeFormated.getUTCHours()

      if (dh == 0) {
        durationTimer = dm + ':' + formatTime(ds)
      } else if (dm < 10) {
        durationTimer = dh + ':' + formatTime(dm) + ':' + formatTime(ds)
      } else {
        durationTimer = dh + ':' + formatTime(dm) + ':' + formatTime(ds)
      }
      bufferedReady = player.buffered.end(0)
    })

    let statusSaved = null

    // Timeline Events
    function barProgression() {
      // Display bar progression
      let timelineBarProgression = player.currentTime / player.duration

      if (position === 0) {
        timelineBar.style.transform = 'scaleX(' + timelineBarProgression + ')'
        position += player.currentTime
      } else {
        position += (player.currentTime - position) * amount
        timelineBarProgression = position / player.duration
        timelineBar.style.transform = 'scaleX(' + timelineBarProgression + ')'
      }

      // Display on timeline what is already loaded
      timelineLoadingBar.style.transform = 'scaleX(' + bufferedReady / player.duration + ')'

      if (player.readyState === 0) {
        loader.classList.add('loaderActive')
        console.log('Can\'t find media source');
      } else if (player.readyState === 1)  {
        loader.classList.add('loaderActive')
      } else if (player.readyState === 2) {
        loader.classList.add('loaderActive')
      } else if (player.readyState === 3) {
        loader.classList.remove('loaderActive')
      } else if (player.readyState === 4) {
        loader.classList.remove('loaderActive')
      }

      if (statusSaved == null) {

      } else if (statusSaved != isPlaying) {
        if (isPlaying) {
          clearTimeout(alertTimer)
          playPauseAlert.classList.add('playPauseAlertActive')
          playPauseAlert.classList.add('playState')
          playAlert.classList.add('playAlertActive')
          alertTimer = setTimeout(alertFadeOut, 100)
        } else {
          clearTimeout(alertTimer)
          playPauseAlert.classList.add('playPauseAlertActive')
          playPauseAlert.classList.add('pauseState')
          pauseAlert.classList.add('pauseAlertActive')
          alertTimer = setTimeout(alertFadeOut, 100)
        }
      }

      statusSaved = isPlaying

      if (!isPlaying) {
        controlBar.classList.add('controlBarIsActive')
      }

      requestAnimationFrame(barProgression)
    }

    function alertFadeOut() {
      playPauseAlert.classList.remove('playPauseAlertActive')
      playPauseAlert.classList.remove('pauseState')
      playPauseAlert.classList.remove('playState')
      pauseAlert.classList.remove('pauseAlertActive')
      playAlert.classList.remove('playAlertActive')
    }

    let alertTimer = null

    requestAnimationFrame(barProgression)

    player.addEventListener('timeupdate', function() {

      // Display time formated

      let currentTimeFormated = new Date(null)
      currentTimeFormated.setSeconds(Math.floor(player.currentTime))

      let cs = currentTimeFormated.getSeconds()
      let cm = currentTimeFormated.getMinutes()
      let ch = currentTimeFormated.getUTCHours()

      // Checks for currentTime display
      if (cs >= 0 && cs < 10)  {
        cs = '0' + cs
      }
      if (ch > 0 && (cm === 0 && cm < 10)) {
        cm = '0' + cm
      }

      //
      if (dh === 0 || ch === 0) {
        currentTimer = cm + ':' + cs
      } else {
        currentTimer = ch + ':' + cm + ':' + cs
      }

      timerComplete.innerHTML = currentTimer + '\xa0/\xa0' + durationTimer

    })

    timeline.addEventListener('mousedown', function(event) {
      playerStatus = player.paused
      player.pause()
      timelineBar.classList.add('isTransiting')
      activeTimeline = true
      let requestedPosition = event.offsetX / timeline.offsetWidth
      player.currentTime = player.duration * requestedPosition
      timelineBar.style.transform = 'scaleX(' + requestedPosition + ')'
      position = player.currentTime
    })

    timeline.addEventListener('mousemove', function(event) {
      let requestedPosition = event.offsetX / timeline.offsetWidth
      let timerHoverValue = new Date(null)
      timerHoverValue.setSeconds(requestedPosition * player.duration)
      let thvS = timerHoverValue.getSeconds()
      let thvM = timerHoverValue.getMinutes()
      let thvH = timerHoverValue.getUTCHours()
      if (thvH === 0 && thvM === 0) {
        timerIndication.innerHTML = '0' + ':' + formatTime(thvS)
      } else if (thvH === 0) {
        timerIndication.innerHTML = thvM + ':' + formatTime(thvS)
      } else {
        timerIndication.innerHTML = thvH + formatTime(thvM) + ':' + formatTime(thvS)
      }
      timerIndication.style.left = (requestedPosition * 100) - (timerIndication.getBoundingClientRect().width / 20) + '%'
      if (activeTimeline) {
        player.currentTime = player.duration * requestedPosition
        timelineBar.style.transform = 'scaleX(' + requestedPosition + ')'
        position = player.currentTime
      }
    })

    timeline.addEventListener('mouseleave', function(event) {
      timerIndication.innerHTML = ''
    })

    window.addEventListener('mouseup', function() {
      if (activeTimeline) {
        timelineBar.classList.remove('isTransiting')
        if (!playerStatus) {
          player.play()
        }
        playPauseButton.classList.add('isPlaying')
        activeTimeline = false
      }
    })

    // Quality switcher
    qualitySwitcher.addEventListener('click', function() {
      clearTimeout(qualityTimer)
      qualitySwitcherItems.classList.add('qualitySwitcherItemsActive')
      qualityTimer = setTimeout(qualitySwitcherHidden, 5000)
    })

    qualitySwitcherItems.addEventListener('mouseleave', function() {
      qualityTimer = setTimeout(qualitySwitcherHidden, 2000)
    })

    qualitySwitcherItems.addEventListener('mouseover', function() {
      clearTimeout(qualityTimer)
    })

    let qItems = [qualitySwitcherItemSD, qualitySwitcherItemHD]

    qItems.forEach(function(el) {
      el.addEventListener('mouseover', function() {
        el.style.backgroundColor = mainColor
      })

      el.addEventListener('mouseleave', function() {
        el.style.backgroundColor = secondColor
      })
    })

    qualitySwitcherItemHD.addEventListener('click', function() {
      playerStatus = player.paused
      player.pause()
      let timeSaved = player.currentTime
      player.src = basePath + 'HD_' + videoName
      player.currentTime = timeSaved
      player.load();
      if (!playerStatus) {
        player.play()
      }
    })

    qualitySwitcherItemSD.addEventListener('click', function() {
      playerStatus = player.paused
      player.pause()
      let timeSaved = player.currentTime
      player.src = basePath + 'SD_' + videoName
      player.currentTime = timeSaved
      player.load();
      if (!playerStatus) {
        player.play()
      }
    })

    function qualitySwitcherHidden() {
      qualitySwitcherItems.classList.remove('qualitySwitcherItemsActive')
    }

    // Fullscreen
    fullscreenButton.addEventListener('click', function(e) {
      if (!fullscreenMode) {
        if (playerContainer.requestFullscreen) {
          playerContainer.requestFullscreen()
        } else if (playerContainer.mozRequestFullScreen) {
          playerContainer.mozRequestFullScreen()
        } else if (playerContainer.webkitRequestFullscreen) {
          playerContainer.webkitRequestFullscreen()
        }
        fullscreenMode = true
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
        fullscreenMode = false
      }
    })

    // Fullscreen on double click
    player.addEventListener('dblclick', function(e) {
      if (!fullscreenMode) {
        if (playerContainer.requestFullscreen) {
          playerContainer.requestFullscreen()
        } else if (playerContainer.mozRequestFullScreen) {
          playerContainer.mozRequestFullScreen()
        } else if (playerContainer.webkitRequestFullscreen) {
          playerContainer.webkitRequestFullscreen()
        }
        fullscreenMode = true
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
        fullscreenMode = false
      }
    })

    let isFullscreen = false

    const fullscreenEvents = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"]
    fullscreenEvents.forEach(function(event) {
      document.addEventListener(event, function() {
        isFullscreen = !isFullscreen
        if (!isFullscreen) {
          fullscreenMode = false
        }
      })
    })

    // Display ControlBar correctly
    player.addEventListener('mousemove', function() {
      controlBar.classList.add('controlBarIsActive')
      body.classList.remove('cursorIsRemoved')
      clearTimeout(timer)
      timer = setTimeout(mouseStopped, 2000)
    })

    player.addEventListener('mouseleave', function() {
      controlBar.classList.remove('controlBarIsActive')
      clearTimeout(timer)
    })

    controlBar.addEventListener('mouseleave', function() {
      controlBar.classList.remove('controlBarIsActive')
      clearTimeout(timer)
    })

    controlBar.addEventListener('mouseover', function() {
      clearTimeout(timer)
      controlBar.classList.add('controlBarIsActive')
      body.classList.remove('cursorIsRemoved')
    })

    function mouseStopped() {
      controlBar.classList.remove('controlBarIsActive')
      body.classList.add('cursorIsRemoved')
    }
  }
}

// Creating new Player
let customPlayer = new Player({
  basePath: './src/videos/',
  parent: '.container',
  id: '1',
  className: 'customPlayer',
  name: 'video.mp4',
  width: 800,
  height: 'auto',
  controls: true,
  autoplay: false,
  loop: false,
  poster: '../../src/img/poster.jpg',
  mainColor: '#3498db',
  secondColor: 'rgba(52, 152, 219, 0.4)'
})