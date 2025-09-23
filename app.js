// Select elements
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volume");
const muteIcon = document.getElementById("muteIcon");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const albumArt = document.getElementById("albumArt");

// Playlist (add your own mp3 files here)
const playlist = [
  {
    title: "Night Vibes",
    artist: "LoFi Beats",
    src: "song/DHOL TODA.wav",
    cover:"img/Music.jpg"
  },
  {
    title: "Dreamscape",
    artist: "Chillhop",
    src: "song/promo vocals.wav",
    cover: "img/Music.jpg"
  },
  {
    title: "Energy Flow",
    artist: "EDM Mix",
    src: "song/dubstep loop.wav",
    cover: "img/Music.jpg"
  }
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();

// Load a song
function loadSong(index) {
  const song = playlist[index];
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  albumArt.src = song.cover;
  audio.src = song.src;
  audio.load();
}
loadSong(currentSongIndex);

// Play Song
function playSong() {
  audio.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // change button to pause
}

// Pause Song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; // change button to play
}

// Toggle Play/Pause
playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next Song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  playSong();
}
nextBtn.addEventListener("click", nextSong);

// Previous Song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  playSong();
}
prevBtn.addEventListener("click", prevSong);

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek Song
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume Control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// mute //unmute icon
muteIcon.addEventListener('click', () => {
 if(audio.muted){
  audio.muted = false;
  muteIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
 } else {
  audio.muted = true;
  muteIcon.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
 }


});
// Auto-play Next Song
audio.addEventListener("ended", nextSong);
