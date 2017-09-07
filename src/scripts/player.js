// Beautiful player using POO

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
}

// Creating new Player

new Player('./src/videos/', '.container', '', 'playerCustom', 'video.mp4', 400, 300, true).create()