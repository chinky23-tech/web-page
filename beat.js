// Create AudioContext (main engine of Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to load and play sounds
async function playSound(file) {
  // Fetch the sound file
  const response = await fetch(file);
  const arrayBuffer = await response.arrayBuffer();

  // Decode audio data into a usable format
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  // Create a source node (like a player)
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;

  // Connect source → destination (speakers)
  source.connect(audioCtx.destination);

  // Start playing
  source.start(0);
}

// Map sound names to files
const soundMap = {
  kick: "sounds/kick.wav",
  snare: "sounds/snare.wav",
  clap: "sounds/clap.wav",
  hihat: "sounds/hihat.wav",
};

// Add event listeners to buttons
document.querySelectorAll(".drum-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const sound = btn.dataset.sound;
    playSound(soundMap[sound]);
    animateButton(btn);
  });
});

// Keyboard keys → sounds
document.addEventListener("keydown", (e) => {
  const keyMap = { a: "kick", s: "snare", d: "clap", f: "hihat" };
  const sound = keyMap[e.key.toLowerCase()];
  if (sound) {
    const btn = document.querySelector(`[data-sound="${sound}"]`);
    playSound(soundMap[sound]);
    animateButton(btn);
  }
});

// Button animation
function animateButton(btn) {
  btn.classList.add("scale-110", "ring-4", "ring-white");
  setTimeout(() => {
    btn.classList.remove("scale-110", "ring-4", "ring-white");
  }, 150);
}
