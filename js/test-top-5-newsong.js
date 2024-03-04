//
// showTop5NewSong('http://localhost:8080/api/songs/top5-new-song')
// function showTop5NewSong(url){
//     axios.get(url).then(res => {
//         console.log(res)
//         const song = document.getElementById("top5-new-song");
//         localStorage.setItem('activeSongList', 'savedSongs');
//         localStorage.setItem('songs', JSON.stringify(res.data));
//         song.innerHTML = '';
//         res.data.forEach((item, index) => {
//             const songDivs = document.createElement("div");
//             songDivs.className = "App__section-grid-item";
//             songDivs.innerHTML = `
//             <div style="height: 136px" class=""><img src="${item.album.avatar}" alt=""></div>
//             <div class="song-name">${item.name}</div>
//             <span>${item.singer.name}</span>
//         `;
//             songDivs.querySelector('.song-name').addEventListener('click', function () {
//                 localStorage.setItem('activeSongList', 'savedSongs');
//                 localStorage.setItem('idSong', JSON.stringify(`${item.id}`))
//                 playSong(index)
//
//             });
//             song.appendChild(songDivs);
//         });
//         love.addEventListener('click', () => {
//             axios.get(`http://localhost:8080/api/songs/like/${idSongs}`
//             ).then(res => {
//                 updateLike(res.data.likes)
//             })
//         });
//     });
// }

// function playSong(indexSongs) {
//     function getCurrentSongList() {
//         const activeSongList = localStorage.getItem('activeSongList');
//         if (activeSongList === 'saveListSongs') {
//             return JSON.parse(localStorage.getItem('listSongs'));
//         } else if (activeSongList === 'savedSongs') {
//             return JSON.parse(localStorage.getItem('songs'));
//         }
//     }
//
//     const currentSongs = getCurrentSongList();
//     console.log("check", currentSongs)
//     if (indexSongs < 0 || indexSongs >= currentSongs.length) return;
//     const song = currentSongs[indexSongs];
//     localStorage.setItem('indexSongs', JSON.stringify(currentSongs[indexSongs]));
//     toggleAudio(song.src, song.name, song.singer.name, song.album.avatar)
//     updateLike(song.likes)
//     if (localStorage.getItem('activeSongList') === 'saveListSongs') {
//         const audioPlayer = document.getElementById('myAudio');
//         audioPlayer.onended = () => {
//             if (indexSongs < currentSongs.length - 1) {
//                 playSong(indexSongs + 1);
//             } else {
//                 console.log('End of playlist');
//                 playSong(0)
//             }
//         };
//     }
//     axios.get(`http://localhost:8080/api/songs/listen/${song.id}`
//     ).then(res => {
//         console.log(res.data)
//
//     })
//     document.getElementById("nextSong").addEventListener("click", function () {
//         if (indexSongs >= 0 && indexSongs < currentSongs.length - 1) {
//             playSong(indexSongs + 1);
//
//         }
//     });
//     document.getElementById("prevSong").addEventListener("click", function () {
//         if (indexSongs > 0) {
//             playSong(indexSongs - 1);
//         }
//     });
// }
//
// function playList() {
//     localStorage.setItem('activeSongList', 'saveListSongs');
//     document.getElementById('displayPlay').style.display = 'none';
//     document.getElementById('pauseMusic').style.display = 'block';
//     playSong(0);
// }


// code tóm tắt lại để test oce
// function updateLocalStorageAndShowSongs(url, targetElementId) {
//     axios.get(url).then(res => {
//         const targetElement = document.getElementById(targetElementId);
//         localStorage.setItem('activeSongList', 'savedSongs');
//         localStorage.setItem('songs', JSON.stringify(res.data));
//         targetElement.innerHTML = '';
//         res.data.forEach((item, index) => {
//             const songDiv = document.createElement("div");
//             songDiv.className = "App__section-grid-item";
//             songDiv.innerHTML = `
//                 <div style="height: 136px" class=""><img src="${item.album.avatar}" alt=""></div>
//                 <div class="song-name">${item.name}</div>
//                 <span>${item.singer.name}</span>
//             `;
//             songDiv.querySelector('.song-name').addEventListener('click', function () {
//                 playSong(index);
//             });
//             targetElement.appendChild(songDiv);
//         });
//     });
// }
// showTop5NewSong();
// showList();
// function showTop5NewSong() {
//     updateLocalStorageAndShowSongs('http://localhost:8080/api/songs/top5-new-song', 'top5-new-song');
// }
//
// function showList() {
//     updateLocalStorageAndShowSongs('http://localhost:8080/api/songs', 'card');
// }