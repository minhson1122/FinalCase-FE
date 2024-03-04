let background_user=document.getElementById("back-user");
let background_create_playlist=document.getElementById('background-create-playlist')
function createPlaylist() {
    background_user.style.display='none';
    background_create_playlist.style.display='block';
    dataSong()
}
function dataSong() {
    axios.get(`http://localhost:8080/api/songs`).then(res=>{
        console.log("data",res.data);
        let str=` <table>
                            <tr>
                                <th></th>
                            <th>Name Song</th>
                            <th>Name Singer</th>
                            <th>Album</th>
                            <th></th>
                            </tr>`;
        res.data.forEach((item,index)=>{
            str+=`<tr>
                                <td><img src="${item.album.avatar}" style="width: 50px;height: 50px;margin-top: 10px;margin-left: 30px"></td>
                                <td>${item.name}</td>
                                <td>Pha Mạnh Quỳnh</td>
                                <td>NHạc Hay</td>
                                <td><button>Add</button></td>
                            </tr>`
        })
        str += `</table>`;
        document.getElementById(`show`).innerHTML = str;
    })
}

document.querySelector('.box_avatar').addEventListener('click', function() {
    document.getElementById('fileInput').click();
})