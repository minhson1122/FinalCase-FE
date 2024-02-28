let newBackground = document.getElementById("new-background");
let homeUser = document.getElementById("home")
let signup = document.getElementById("signup-background")
let forUser = document.getElementById("for-user")
let forUser1 = document.getElementById("for-user1")
let loginNav = document.getElementById("login-nav")
let profileNav = document.getElementById("profile-nav")
let playlist = document.getElementById("playlist-nav-bar")
let adminBox = document.getElementById("admin-background")
let backUser = document.getElementById("back-user")
let playingBar = document.getElementById("playing-bar")
let functionBar = document.getElementById("function")
let currentPage = 1; // Trang hiện tại, mặc định là trang đầu tiên
let totalPages = 0;
const itemsPerPage = 10; // Số lượng mục trên mỗi trang
let token = localStorage.getItem('userToken');
let role = localStorage.getItem('role');
let choicePlaylist1 = document.getElementById("choice-playlist1")
let choicePlaylist2 = document.getElementById("choice-playlist2")
let choicePlaylist3 = document.getElementById("choice-playlist3")
let playlistSelected = document.getElementById("playlist-selected")
let homeBtn= document.getElementById("home-btn")
let authorBackground = document.getElementById("author-background")
let itemDiv=""
window.onload = function () {
    let greetingElement = document.getElementById('good-something');
    let currentTime = new Date().getHours();

    if (currentTime < 12) {
        greetingElement.textContent = 'Good morning!';
    } else if (currentTime < 18) {
        greetingElement.textContent = 'Good afternoon!';
    } else {
        greetingElement.textContent = 'Good evening!';
    }
    loginUser()
    console.log("load 1",currentId)

}
document.getElementById("myButton").addEventListener("click", function () {
    newBackground.style.display = "block";
    home.style.opacity = "75%";
});
document.getElementById("login-box").addEventListener("click", function () {
    newBackground.style.display = "block";
    signup.style.display = "none";
    home.style.opacity = "75%";
});
document.getElementById("signup-box").addEventListener("click", function () {
    signup.style.display = "block";
    newBackground.style.display = "none";
    home.style.opacity = "75%";
});
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let username = document.querySelector('[name="username"]').value;
    let password = document.querySelector('[name="password"]').value;
    let dataLogin = {
        "username": username,
        "password": password
    }
    axios.post(`http://localhost:8080/login`, dataLogin).then(res => {
        localStorage.setItem('userToken', res.data.accessToken);
        localStorage.setItem('role', res.data.roles[0].authority);
        localStorage.setItem('currentId', res.data.id);
        console.log(res.data)
        console.log(res.data.accessToken)
        console.log(res.data.roles[0].authority)
        if (res.data.roles[0].authority === 'ROLE_USER') {
            loginUser()
        } else if (res.data.roles[0].authority === 'ROLE_ADMIN') {
            alert("tk admin")
            showListUser();
        }
        else {
            alert("tk author")
            console.log("id hiện tại",currentId)
            showSongByAuthorId()
            role = res.data.roles[0].authority
        }

    })
        .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 401) {
                alert("Tài Khoản Hoặc Mật Khẩu Sai");
            }
        })
});

function loginUser() {
    const nameItem = document.getElementById("name-item")
    const imgItem = document.getElementById("img-item")
    const playList = document.getElementById("playlist-list")
    currentId = localStorage.getItem("currentId")
    dataProfile(currentId)
    if (token !== null && role === 'ROLE_USER') {
        axios.get('http://localhost:8080/api/playLists', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(currentId)

            const playlistList = document.getElementById("playlist-list");
            playlistList.innerHTML = '';
            res.data.forEach((item) => {
                itemDiv = document.createElement("div");
                itemDiv.setAttribute("data-id", item.id);
                const img = document.createElement("img");
                img.setAttribute("src", item.avatar);
                img.setAttribute("alt", "Playlist image");
                const name = document.createElement("p");
                name.classList.add("name-item");
                name.textContent = item.name;
                itemDiv.appendChild(img);
                itemDiv.appendChild(name);
                playlistList.appendChild(itemDiv);

                itemDiv.addEventListener('click', function () {
                    const playlistId = this.getAttribute("data-id");
                    console.log(playlistId);
                    itemDiv.id=`play-list${playlistId}`;
                    console.log(itemDiv)
                    axios.get(`http://localhost:8080/api/song-playlist/${playlistId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(res => {
                        console.log("playList",res.data)

                        choicePlaylist1.style.display = "none";
                        choicePlaylist2.style.display = "none";
                        choicePlaylist3.style.display = "none";
                        playlistSelected.style.display = "block"
                        // if(document.getElementById(`playlist${playlistId}`))
                        let str = `<div id="playlist-selected-tiem">
<div class="top-top">
<div class="top">
<img src="${res.data[0].playList.avatar}" alt="">
<h2>${res.data[0].playList.name}</h2>
</div>
<div class="play-playlist-btn">
<i class="fa-regular fa-circle-play pause" id="displayPlay"></i>
<i class="fa-regular fa-circle-pause pause" style="display: none" id="pauseMusic"></i>
</div>
</div>
<hr>
<div class="bot">
<table id="playlist-selected-table">
<tr>
<th>Song name</th>
<th>Album</th>
<th>Likes</th>
<th>Listens</th>
</tr>
`

                        res.data.forEach((item) => {
                            console.log("test", item.song)
                            str += `
<tr>
<td>${item.song.name}</td>
<td>${item.song.album.name}</td>
<td>${item.song.likes}</td>
<td>${item.song.listens}</td>
</tr>
`
                        })
                        str += `</table></div></div>`
                        playlistSelected.innerHTML = str

                    })
                });
            });
            newBackground.style.display = "none";
            homeUser.style.display = "block";
            forUser.style.display = "flex"
            forUser1.style.display = "block"
            home.style.opacity = "100%";
            loginNav.style.display = "none";
            profileNav.style.display = "flex";
            playlist.style.display = "flex"
            playList.addEventListener('click', function () {
                const playlistId = this.getAttribute("data-id");
                axios.get(`http://localhost:8080/api/song-playlist/${playlistId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    console.log("play", res.data)
                });

            })
            })
    } else if (token !== null && role === 'ROLE_ADMIN') {
        showListUser();
    }
    else if (token !== null && role === `ROLE_AUTHOR`) {
        showSongByAuthorId()
    }
}

document.getElementById("xLogin-btn").addEventListener("click", function () {
    newBackground.style.display = "none";
    home.style.opacity = "100%";
});
document.getElementById("xSignup-btn").addEventListener("click", function () {
    signup.style.display = "none";
    home.style.opacity = "100%";
});

document.getElementById("main-view").addEventListener("click", function () {
    newBackground.style.display = "none";
    document.getElementById("formEdit").style.display="none";
    signup.style.display = "none";
    home.style.opacity = "100%";
});
document.getElementById("home-btn").addEventListener("click", function () {
    choicePlaylist1.style.display = "block";
    choicePlaylist2.style.display = "block";
    choicePlaylist3.style.display = "block";
    playlistSelected.style.display = "none"
    itemDiv.classList.remove("App__category-item--selected")
    homeBtn.classList.add("App__category-item--selected")
});
document.getElementById("logout").addEventListener("click", function () {
    localStorage.setItem('userToken', null);
    localStorage.setItem('role', null);
    localStorage.setItem('currentId', null);
    console.log(localStorage.getItem('userToken'))
    forUser.style.display = "none"
    forUser1.style.display = "none"
    newBackground.style.display = "none";
    home.style.opacity = "100%";
    loginNav.style.display = "block";
    profileNav.style.display = "none";
    playlist.style.display = "none"
    adminBox.style.display = "none"
    backUser.style.display = "block"
    playingBar.style.display = "block"
    playingBar.style.background = "#1B1B1B"
    itemDiv.classList.remove("App__category-item--selected")
    homeBtn.classList.add("App__category-item--selected")
    choicePlaylist1.style.display = "block";
    choicePlaylist2.style.display = "block";
    choicePlaylist3.style.display = "block";
    playlistSelected.style.display = "none"
    document.getElementById("formEdit").style.display="none";
    authorBackground.style.display="none"
    currentId = null;
})

function showListUser() {
    adminBox.style.display = "block";
    forUser.style.display = "none"
    forUser1.style.display = "none"
    newBackground.style.display = "none";
    home.style.opacity = "100%";
    loginNav.style.display = "none";
    profileNav.style.display = "flex";
    playlist.style.display = "none"
    backUser.style.display = "none"
    playingBar.style.background = "#121212"
    functionBar.style.display = "none"
    axios.get(`http://localhost:8080/admin`).then(response => {
        let data = response.data;
        totalPages = Math.ceil(data.length / itemsPerPage);
        // Tính toán chỉ số bắt đầu và kết thúc của mục trên trang hiện tại
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, data.length);

        let str = `<table id="user-table-1">
                        <tr>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Enabled</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th></th>
                        </tr>`;

        for (let i = startIndex; i < endIndex; i++) {
            let user = data[i];
            let enabledStatus = user.enabled ? `Active` : `Inactive`;
            let roleStatus = user.roles[0].name === "ROLE_USER" ? `User` : `Author`;

            str += `<tr>
                        <td id="avt-${user.id}"><img src="${user.avt}" alt="User Avatar"></td>
                        <td id="username-${user.id}">${user.username}</td>
                        <td id="name-${user.id}">${user.name}</td>
                        <td id="enabled-${user.id}">${enabledStatus}</td>
                        <td id="phone-${user.id}">${user.phone}</td>
                        <td id="roles-${user.id}">${roleStatus}</td>
                        <td><button onclick="changeEnabled(${user.id})" class="btn btn-success">Change</button></td>
                    </tr>`;
        }
        str += `</table>`;
        if (totalPages > 1) {
            str += `<button onclick="previousPage()" class="btn btn-success">Previous</button>
                    <button onclick="nextPage()" class="btn btn-success">Next</button>`;
        }

        document.getElementById(`user-table`).innerHTML = str;
    }).catch(error => {
        console.error('Error fetching user data:', error);
    });
}

function changeEnabled(id) {
    let data = {
        avt: document.getElementById(`avt-${id}`).getAttribute('src'),
        username: document.getElementById(`username-${id}`).value,
        name: document.getElementById(`name-${id}`).value,
        enabled: document.getElementById(`enabled-${id}`).value,
        phone: document.getElementById(`phone-${id}`).value,
        roles: document.getElementById(`roles-${id}`).value,
    };

    axios.put(`http://localhost:8080/admin/${id}`, data).then(() => {
        showListUser();
    })
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showListUser();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showListUser();
    }
}
