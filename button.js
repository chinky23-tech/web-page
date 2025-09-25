const fileInput = document.getElementById('fileInput');
const songName = document.getElementById('songName');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const audioPlayer = document.getElementById('audioPlayer');

let isPlaying = false;

// when user selects a file
function fileSelected() {
    let songfile = fileInput.files[0]; // ✅ fixed

    if (songfile) {
        songName.textContent = songfile.name;
        audioPlayer.src = URL.createObjectURL(songfile); // ✅ only one line needed
        audioPlayer.load(); // optional but ensures reload
    } else {
        songName.textContent = 'No file selected';
        audioPlayer.src = '';
    }
}
fileInput.addEventListener('change', fileSelected);

// play / pause button
function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
  } else {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
  }
}
playPauseBtn.addEventListener('click', togglePlayPause);

// stop button
function stopAudio() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  isPlaying = false;
}
stopBtn.addEventListener('click', stopAudio);

// reset button when song ends
audioPlayer.addEventListener('ended', () => {
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  isPlaying = false;
});
