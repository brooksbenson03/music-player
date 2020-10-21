class AudioPlayer {
  constructor() {
    this.songs = [
      {
        src: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",
      },
      {
        src: "jacinto-2",
        displayName: "Seven Nation Army Remix",
        artist: "Jacinto Design",
      },
      {
        src: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Jacinto Design",
      },
    ]
    this.songIndex = 0
    this.audio = document.getElementById("audio")
    this.prevSongBtn = document.getElementById("prev")
    this.playSongBtn = document.getElementById("play")
    this.nextSongBtn = document.getElementById("next")
    this.image = document.getElementById("image")
    this.title = document.getElementById("title")
    this.artist = document.getElementById("artist")
    this.progressContainer = document.getElementById("progress-container")
    this.progress = document.getElementById("progress")
    this.currentTime = document.getElementById("current-time")
    this.duration = document.getElementById("duration")
    this.isPlaying = false

    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.handleSongChange = this.handleSongChange.bind(this)
    this.handleAudioTimeUpdate = this.handleAudioTimeChange.bind(this)

    this.playSongBtn.addEventListener("click", this.handlePlayClick)
    this.nextSongBtn.addEventListener("click", () =>
      this.handleSongChange(this.songIndex + 1)
    )
    this.prevSongBtn.addEventListener("click", () =>
      this.handleSongChange(this.songIndex - 1)
    )
    this.audio.addEventListener("timeupdate", this.handleAudioTimeUpdate)
    this.loadSong(this.songs[this.songIndex])
  }

  handleAudioTimeChange(e) {
    if (this.isPlaying) {
      const { currentTime, duration } = e.srcElement

      const displayProgress = (current, duration) => {
        const percent = (current / duration) * 100
        this.progress.style.width = `${percent}%`
      }

      const displayTime = (totalSeconds, timeElement) => {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = Math.floor(totalSeconds % 60)
        if (typeof minutes === "number" && typeof seconds === "number") {
          timeElement.textContent = `${minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`
        }
      }

      displayProgress(currentTime, duration)
      displayTime(duration, this.duration)
      displayTime(currentTime, this.currentTime)
    }
  }

  handlePlayClick() {
    this.isPlaying ? this.pauseSong() : this.playSong()
  }

  handleSongChange(newSongIndex) {
    if (newSongIndex === this.songs.length) newSongIndex = 0
    else if (newSongIndex === -1) newSongIndex = this.songs.length - 1
    this.songIndex = newSongIndex
    this.loadSong(this.songs[newSongIndex])
    this.playSong()
  }

  playSong() {
    this.audio.play()
    this.playSongBtn.classList.replace("fa-play", "fa-pause")
    this.playSongBtn.setAttribute("title", "Pause")
    this.isPlaying = true
  }

  pauseSong() {
    this.audio.pause()
    this.playSongBtn.classList.replace("fa-pause", "fa-play")
    this.playSongBtn.setAttribute("title", "Play")
    this.isPlaying = false
  }

  loadSong(song) {
    this.title.textContent = song.displayName
    this.artist.textContent = song.artist
    this.audio.src = `music/${song.src}.mp3`
    this.image.src = `img/${song.src}.jpg`
  }
}

const audioPlayer = new AudioPlayer()

function handleProgressBarClick(e) {
  const progress = e.offsetX / this.clientWidth
  const audio = document.getElementById("audio")
  audio.currentTime = progress * audio.duration
  audio.play()
}

document
  .getElementById("progress-container")
  .addEventListener("click", handleProgressBarClick)
