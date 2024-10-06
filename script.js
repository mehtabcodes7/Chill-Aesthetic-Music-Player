const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const albumCover = document.getElementById('album-cover');
const trackTitle = document.getElementById('track-title');

let currentTrackIndex = 0;
const tracks = [
    {
        title: "Neffex - Grateful",
        src: "/Music/Song-1.mp3",
        cover: "/Images/Song-Cover.jpg"
    },
    {
        title: "Neffex - Believe",
        src: "/Music/Song-2.mp3",
        cover: "/Images/Song-Cover-2.jpg"
    },
    {
        title: "Neffex - Cold",
        src: "/Music/Song-3.mp3",
        cover: "/Images/Song-Cover-3.jpg"
    },
    {
        title: "Neffex - Destiny",
        src: "/Music/Song-4.mp3",
        cover: "/Images/Song-Cover-4.jpg"
    }
    // Add more tracks as needed
];

// Load the initial track
function loadTrack(index) {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
    albumCover.src = tracks[index].cover;
    audio.currentTime = 0; // Start from the beginning
}

// Play/Pause functionality
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
    } else {
        audio.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
    }
}

playButton.addEventListener('click', togglePlayPause);
pauseButton.addEventListener('click', togglePlayPause);

// Progress Slider
audio.addEventListener('timeupdate', () => {
    const progressValue = (audio.currentTime / audio.duration) * 100;
    progress.style.setProperty('--progress', progressValue + '%'); // Update the gradient
    progress.value = progressValue || 0;
});

// Seek functionality for the progress slider
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Function to change tracks with animation
function changeTrack(index) {
    albumCover.classList.remove('fade-in'); // Remove fade-in class for fade-out effect
    albumCover.classList.add('fade-out'); // Add fade-out class

    setTimeout(() => {
        loadTrack(index);
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        albumCover.classList.remove('fade-out'); // Remove fade-out class after loading new track
        albumCover.classList.add('fade-in'); // Add fade-in class
    }, 500); // Match duration with CSS fade-out animation duration
}

// Load next track
nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    changeTrack(currentTrackIndex);
});

// Load previous track
prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    changeTrack(currentTrackIndex);
});

// Spacebar functionality
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling when spacebar is pressed
        togglePlayPause();
    }
});

// Load the first track initially
loadTrack(currentTrackIndex);
