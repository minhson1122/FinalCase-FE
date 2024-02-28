


axios.get('http://localhost:8080/api/songs').then(res => {
    const card = document.getElementById("card");
    const control = document.getElementById("control");
    const love = document.getElementById("love");
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
        const songDiv = document.createElement("div");
        songDiv.className = "App__section-grid-item";
        songDiv.innerHTML = `
            <div class=""><img src="${item.album.avatar}" alt=""></div> 
            <div class="song-name">${item.name}</div>
            <span>${item.singer.name}</span>
        `;
        songDiv.querySelector('.song-name').addEventListener('click', () => {
            playSong(index)
            control.style.display = 'block';
            love.style.display = 'block';
            indexs = `${item.id}`;
        });
        card.appendChild(songDiv);
        songCount++;

    });
    love.addEventListener('click', () => {
        axios.get(`http://localhost:8080/api/songs/like/${indexs}`
        ).then(res => {
            updateLike(res.data.likes)

        })
    });

});


function showSongByAuthorId(id) {
    axios.get(`http://localhost:8080/api/songs/${id}`).then(resp => {
        console.log(resp.data)
        let data = resp.data
        let str = `<div class="song-item">`
        for (const item of data) {
            str += `<div class="listSong" style="background: #242424 ; width: calc(16.666% - 20px); width: 225px ;margin: 10px; padding: 20px" >
                <div class="album-avt"><img src="${item.album.avatar}" alt="avt"/></div>
                <div><h5 style="color: white"> Song Name:${item.name}</h5></div>
                <div><h5 style="color: white"> Singer:${item.singer.name}</h5></div>
            </div>`
        }
        str += '</div>'
        document.getElementById("back-user").style.display = "none";
        document.getElementById("admin-background").style.display = "none";
        document.getElementById("author-song-item").innerHTML = str
    })
}

function addSong() {
    document.getElementById("author-song-item").innerHTML =
        `<input type="file" onchange="getImageData(event)"/> ` +
        `<input type="text" id="note"/> ` +
        `<input type="text" id="name"/> ` +
        '<button onclick="addSongs()">Add</button>'
}
function addSongs(){
    let data ={
        src:imageURL,
        name:document.getElementById("name").value,
        note:document.getElementById("note").value,
    }
axios.post("http://localhost:8080/api/songs",data).then(()=>{
    showSongByAuthorId();
})
}

