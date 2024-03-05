let background_user = document.getElementById("back-user");
let background_create_playlist = document.getElementById('background-create-playlist')
let url = `http://localhost:8080/api/songs`;

function createPlaylist() {
    background_user.style.display = 'none';
    background_create_playlist.style.display = 'block';
    dataSong(url)
}

function searchSong() {
    let search = document.getElementById('searchSong').value;
    if (search!==null){
        dataSong(`http://localhost:8080/api/songs?name=${search}`)
    }
}

function dataSong(url) {
    axios.get(url).then(res => {
        console.log("data", res.data);
        let str = ` <table class="all-song-tb">
                            <tr class="all-song-thead">
                                <th></th>
                            <th>Name Song</th>
                            <th>Name Singer</th>
                            <th>Album</th>
                            <th></th>
                            </tr>`;
        res.data.forEach((item, index) => {
            str += `<tr class="all-song-tbody">
                                <td><img src="${item.album.avatar}" style="width: 50px;height: 50px;margin-top: 10px;margin-left: 30px"></td>
                                <td>${item.name}</td>
                                <td>${item.singer.name}</td>
                                <td>${item.album.name}</td>
                                <td><button>Add</button></td>
                            </tr>`
        })
        str += `</table>`;
        document.getElementById(`show`).innerHTML = str;
    })
}

document.querySelector('.box_avatar').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});