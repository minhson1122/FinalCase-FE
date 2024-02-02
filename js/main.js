let audio = document.getElementById("myAudio");
let progressBar = document.getElementById("progressBar");
let progress = document.getElementById("progress");
let currentTimeSpan = document.getElementById("currentTime");
const nameMuic = document.getElementById("music-name");
const nameSing = document.getElementById("nameSinger");
const img = document.getElementById("avatar");
const audioElement = document.getElementById("myAudio");
const pausePlay = document.getElementById("pauseMusic")
const displayPlay = document.getElementById("displayPlay")

function toggleAudio(url, name, nameSinger, avatar) {
    nameSing.innerHTML = nameSinger;
    nameMuic.innerHTML = name;
    img.src = avatar;
    img.style.display = 'block'
    audioElement.src = url;
    console.log(url)

    if (audioElement.paused) {
        audioElement.play();
        pausePlay.style.display = 'block'
        displayPlay.style.display = 'none'
    } else {
        audioElement.pause();
    }
}

function pause() {
    audioElement.pause();
    pausePlay.style.display = 'none'
    displayPlay.style.display = 'block'
}

function playMusic() {
    if (audioElement.paused) {
        audioElement.play();
        pausePlay.style.display = 'block'
        displayPlay.style.display = 'none'
    }
}

function seek(event) {
    let rect = progressBar.getBoundingClientRect();
    let totalWidth = rect.width;
    let clickX = event.clientX - rect.left;
    let percentage = (clickX / totalWidth);
    let seekTime = percentage * audio.duration;

    audio.currentTime = seekTime;
}

audio.addEventListener("timeupdate", function () {
    let currentTime = audio.currentTime;
    let duration = audio.duration;
    let progressPercentage = (currentTime / duration) * 100;

    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    currentTimeSpan.style.display = 'block';
    currentTimeSpan.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    progress.style.width = progressPercentage + "%";
});
