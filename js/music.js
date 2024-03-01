const song = JSON.parse(localStorage.getItem('indexSong'))
const savedSongs = JSON.parse(localStorage.getItem('songs'))
const idSongs = JSON.parse(localStorage.getItem('idSong'))
Songs('http://localhost:8080/api/songs/top')

function ShowList() {
    Songs('http://localhost:8080/api/songs')
}

function Songs(url) {
    axios.get(url).then(res => {
        const card = document.getElementById("card");
        localStorage.setItem('activeSongList', 'savedSongs');
        localStorage.setItem('songs', JSON.stringify(res.data));
        card.innerHTML = '';
        let songCount = 0;
        let songIndex = -1;
        let indexs = -1;
        const songs = res.data

        function playSong(index) {
            if (index < 0 || index >= songs.length) return;
            songIndex = index;
            const song = songs[index];
            toggleAudio(song.src, song.name, song.singer.name, song.album.avatar)
            updateLike(song.likes)
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
        songs.forEach((item, index) => {
            res.data.forEach((item, index) => {
                const songDiv = document.createElement("div");
                songDiv.className = "App__section-grid-item";
                songDiv.innerHTML = `
            <div class=""><img src="${item.album.avatar}" alt=""></div> 
            <div class="song-name">${item.name}</div>
            <span>${item.singer.name}</span>   
        `;
                songDiv.querySelector('.song-name').addEventListener('click', function () {
                    localStorage.setItem('activeSongList', 'savedSongs');
                    localStorage.setItem('idSong', JSON.stringify(`${item.id}`))
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
    })
}


function showSongByAuthorId() {
    loginNav.style.display = "none";
    profileNav.style.display = "flex";
    playingBar.style.background = "#121212"
    forUser.style.display = "none"
    forUser1.style.display = "none"
    newBackground.style.display = "none";
    home.style.opacity = "100%";
    backUser.style.display = "none"
    authorBackground.style.display = "block"
    document.getElementById(`create-song-button`).style.display = `block`
    axios.get(`http://localhost:8080/api/songs/${currentId}`).then(resp => {
        console.log(resp.data)
        let data = resp.data
        let str = `<div class="song-item">`
        for (const item of data) {
            str += `<div class="listSong">
                <div class="album-avt"><img src="${item.album.avatar}" alt="avt"/></div>
                <div><h5>${item.name}</h5></div>
                <div><h5>${item.singer.name}</h5></div>
                <button onclick="removeSong(${item.id})">Delete</button>
                
            </div>`
        }
    });
    document.getElementById("prevSong").addEventListener("click", function () {
        if (indexSong > 0) {
            playSong(indexSong - 1);
        }
    });
}


function showAddSongForm() {
    document.getElementById("author-title").innerHTML = `Create New Song`
    document.getElementById(`create-song-button`).style.display = `none`
    axios.get(`http://localhost:8080/api/albums`).then(albums => {
        axios.get(`http://localhost:8080/api/singers`).then(singers => {
            let str =
                `<div class="column-left">
                <label>Name:<input type="text" name="name" id="song-name"></label>
                <label>Note: <input type="text" name="note" id="song-note"></label>
                <label>Choice Album: <select id="list-album">`
            for (const album of albums.data) {
                str += `<option value="${album.id}">${album.name}</option>`
            }
            str += `</select></label>
                <label>Choice Singer: <select id="list-singer">`
            for (const singer of singers.data) {
                str += `<option value="${singer.id}">${singer.name}</option>`
            }
            str += `</select></label> 
                </div>
                <div class="column-right">
                <label>Song Data:</label>
                <input type="file" onchange="getImageData(event)" id="song-url">
                </div>
                <div style="display: flex">
                <button type="button" onclick="showSongByAuthorId()">Cancel</button>
                <button onclick="addSong()" id="save-song-button" style="display: none">Save</button>
                </div>`
            document.getElementById("author-song-item").innerHTML = str
        })
    })
}

function addSong() {
    let data = {
        name: document.getElementById("song-name").value,
        note: document.getElementById(`song-note`).value,
        src: songURl,
        album: {
            id: document.getElementById(`list-album`).value
        },
        singer: {
            id: document.getElementById(`list-singer`).value
        },
        author: {
            id: currentId
        },
        likes: 0,
        listens: 0,
    }
    axios.post(`http://localhost:8080/api/songs`, data).then(() => {
        showSongByAuthorId()
    })
}






