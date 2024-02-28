


axios.get('http://localhost:8080/api/songs').then(res => {
    const card = document.getElementById("card");
    const control = document.getElementById("control");
    const love = document.getElementById("love");
    card.innerHTML = '';
    let songIndex = -1;
    const indexSong =JSON.parse(localStorage.getItem('indexSong'))
    const savedSongs =JSON.parse(localStorage.getItem('songs'))
    const idSongs =JSON.parse(localStorage.getItem('idSong'))
    console.log("song",savedSongs)
    savedSongs.forEach((item, index) => {
        const songDiv = document.createElement("div");
        songDiv.className = "App__section-grid-item";
        songDiv.innerHTML = `
            <div class=""><img src="${item.album.avatar}" alt=""></div> 
            <div class="song-name" >${item.name}</div>
            <span>${item.singer.name}</span>
        `;
        songDiv.querySelector('.song-name').addEventListener('click', function ()  {
            playSong(indexSong)
            localStorage.setItem('indexSong', JSON.stringify(index));
            localStorage.setItem('idSong',JSON.stringify(`${item.id}`))
        });

        card.appendChild(songDiv);
    });

    function playSong(indexSong) {
        if (indexSong < 0 || indexSong >= savedSongs.length) return;
        songIndex = indexSong;
        const song = savedSongs[indexSong];
        localStorage.setItem('indexSong', indexSong);
        localStorage.setItem('currentTime', audioElement.currentTime);
        toggleAudio(song.src, song.name, song.singer.name, song.album.avatar)
        updateLike(song.likes)
        control.style.display = 'block';
        love.style.display = 'block';
        axios.get(`http://localhost:8080/api/songs/listen/${song.id}`
        ).then(res => {
            console.log(res.data)

        })
    }


    document.getElementById("nextSong").addEventListener("click", function () {
        if (songIndex >= 0 && songIndex < songs.length - 1) {
            playSong(songIndex + 1);

        }
    });
    document.getElementById("prevSong").addEventListener("click", function () {
        if (songIndex > 0) {
            playSong(songIndex - 1);
        }
    });

    love.addEventListener('click', () => {
        axios.get(`http://localhost:8080/api/songs/like/${idSongs}`
        ).then(res => {
            updateLike(res.data.likes)

        })
    });

});


function showSongByAuthorId() {
    loginNav.style.display = "none";
    profileNav.style.display = "flex";
    playingBar.style.background = "#121212"
    forUser.style.display = "none"
    forUser1.style.display = "none"
    newBackground.style.display = "none";
    home.style.opacity = "100%";
    backUser.style.display = "none"
    authorBackground.style.display="block"
    axios.get(`http://localhost:8080/api/songs/${currentId}`).then(resp => {
        console.log(resp.data)
        let data = resp.data
        let str = `<div class="song-item">`
        for (const item of data) {
            str += `<div class="listSong">
                <div class="album-avt"><img src="${item.album.avatar}" alt="avt"/></div>
                <div><h5 style="color: white"> Song Name:${item.name}</h5></div>
                <div><h5 style="color: white"> Singer:${item.singer.name}</h5></div>
                <button onclick="removeSong(${item.id})">Delete</button>
            </div>`
        }
        str += '</div>'
        document.getElementById("author-song-item").innerHTML = str
    })
}
function removeSong(id){
    axios.delete(`http://localhost:8080/api/songs/${id}`).then(() => {
        showSongByAuthorId(currentId)
    })
}
function addSong() {
    document.getElementById("author-song-item").innerHTML =
        `<input type="file" onchange="getImageData(event)"/> ` +
        `<input type="text" id="note"/> ` +
        `<input type="text" id="name"/> ` +
        '<button onclick="addSongs()">Add</button>'
}


