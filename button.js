const fileInput = document.getElementById('fileInput');
const songName = document.getElementById('songName');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const audioPlayer = document.getElementById('audioPlayer');

let audio = new Audio();
let isPlaying = false;

function updateUI(){

    let songfile = fileInput.file[0];
    if(songfile){
        songName.textContent = songfile.name;
        audio.src = URL.createObjectURL(songfile);
    }else{
        songName.textContent = 'no file selected';
    }
}
fileInput.addEventListener('change', updateUI);

function playPauseAudio(){

    let audio  = new Audio ();

    isPlaying = false;

    let Audio = audio.playPauseBtn;

    if(!isPlaying){
        audio.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }else{
        audio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}
playPauseBtn.addEventListener('click', playPauseAudio);

function stopAudio(){
audio.stop();
isPlaying = false;
stopBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
}
stopBtn.addEventListener('click', stopAudio);