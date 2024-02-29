
axios.get('http://localhost:8080/api/songs').then(res => {
    const card = document.getElementById("card");
    localStorage.setItem('activeSongList', 'savedSongs');
    localStorage.setItem('songs', JSON.stringify(res.data));
    card.innerHTML = '';
    res.data.forEach((item, index) => {
        const songDiv = document.createElement("div");
        songDiv.className = "App__section-grid-item";
        songDiv.innerHTML = `
            <div class=""><img src="${item.album.avatar}" alt=""></div> 
            <div class="song-name">${item.name}</div>
            <span>${item.singer.name}</span>
            
        `;
        songDiv.querySelector('.song-name').addEventListener('click', function ()  {
            localStorage.setItem('activeSongList', 'savedSongs');
            localStorage.setItem('idSong',JSON.stringify(`${item.id}`))
            playSong(index)

        });
        card.appendChild(songDiv);
    });
    love.addEventListener('click', () => {
        axios.get(`http://localhost:8080/api/songs/like/${idSongs}`
        ).then(res => {
            updateLike(res.data.likes)

        })
    });
});
const song =JSON.parse(localStorage.getItem('indexSong'))
const savedSongs =JSON.parse(localStorage.getItem('songs'))
const idSongs =JSON.parse(localStorage.getItem('idSong'))
console.log("song",savedSongs)
function playSong(indexSong) {
    function getCurrentSongList() {
        const activeSongList = localStorage.getItem('activeSongList');
        if (activeSongList === 'saveListSongs') {
            return JSON.parse(localStorage.getItem('listSongs'));
        } else if(activeSongList==='savedSongs') {
            return JSON.parse(localStorage.getItem('songs'));
        }
    }

    const currentSongs = getCurrentSongList();
    console.log("check",currentSongs)
    if (indexSong < 0 || indexSong >= currentSongs.length) return;
    const song = currentSongs[indexSong];
    localStorage.setItem('indexSong', JSON.stringify(currentSongs[indexSong]));
    toggleAudio(song.src, song.name, song.singer.name, song.album.avatar)
    updateLike(song.likes)
    if (localStorage.getItem('activeSongList')==='saveListSongs'){
        const audioPlayer = document.getElementById('myAudio');
        audioPlayer.onended = () => {
            if (indexSong < currentSongs.length - 1) {
                playSong(indexSong + 1);
            } else {
                console.log('End of playlist');
                playSong(0)
            }
        };
    }

    axios.get(`http://localhost:8080/api/songs/listen/${song.id}`
    ).then(res => {
        console.log(res.data)

    })
    document.getElementById("nextSong").addEventListener("click", function () {
        if (indexSong >= 0 && indexSong < currentSongs.length - 1) {
            playSong(indexSong + 1);

        }
    });
    document.getElementById("prevSong").addEventListener("click", function () {
        if (indexSong > 0) {
            playSong(indexSong - 1);
        }
    });
}
function playList() {
    localStorage.setItem('activeSongList', 'saveListSongs');
    document.getElementById('displayPlay').style.display = 'none';
    document.getElementById('pauseMusic').style.display = 'block';
    playSong(0);


}
