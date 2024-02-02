
let audio = document.getElementById("myAudio");
let progressBar = document.getElementById("progressBar");
let progress = document.getElementById("progress");
let currentTimeSpan = document.getElementById("currentTime");

function toggleAudio( url) {
    const audioElement = document.getElementById("myAudio");
    audioElement.src = url;
    console.log(url)
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
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

audio.addEventListener("timeupdate", function() {
    let currentTime = audio.currentTime;
    let duration = audio.duration;
    let progressPercentage = (currentTime / duration) * 100;

    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    currentTimeSpan.style.display='block';
    currentTimeSpan.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    progress.style.width = progressPercentage + "%";
});
