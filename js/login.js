let newBackground = document.getElementById("new-background");
let homeUser = document.getElementById("home")
let signup = document.getElementById("signup-background")
let forUser = document.getElementById("for-user")
let forUser1 = document.getElementById("for-user1")
let loginNav = document.getElementById("login-nav")
let profileNav = document.getElementById("profile-nav")

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
    var username = document.querySelector('[name="username"]').value;
    var password = document.querySelector('[name="password"]').value;
    data = {
        "username": username,
        "password": password
    }
    axios.post(`http://localhost:8080/login`, data).then(res => {
        localStorage.setItem('userToken', res.data.accessToken);
        console.log(res.data)
        console.log(res.data.accessToken)
        console.log(res.data.roles[0].authority)
        if (res.data.roles[0].authority === 'ROLE_USER') {
            loginUser()

        } else if (res.data.roles[0].authority === 'ROLE_ADMIN') {
            alert("tk admin")
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
    const token = localStorage.getItem('userToken');
    const nameItem = document.getElementById("name-item")
    const imgItem = document.getElementById("img-item")
    const playList = document.getElementById("playlist-list")
    if (token !== null) {
        axios.get('http://localhost:8080/api/playLists', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            const playlistList = document.getElementById("playlist-list");
            playlistList.innerHTML = '';
            res.data.forEach((item) => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("item-list");
                const img = document.createElement("img");
                img.setAttribute("src", item.avatar);
                img.setAttribute("alt", "Playlist image");
                const name = document.createElement("p");
                name.classList.add("name-item");
                name.textContent = item.name;
                itemDiv.appendChild(img);
                itemDiv.appendChild(name);
                playlistList.appendChild(itemDiv);
            })

            newBackground.style.display = "none";
            homeUser.style.display = "block";
            forUser.style.display = "flex"
            forUser1.style.display = "block"
            home.style.opacity = "100%";
            loginNav.style.display = "none";
            profileNav.style.display = "flex";
        })

        playList.addEventListener('click',function (){
            axios.get('http://localhost:8080/api/song-playlist', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log("play",res.data)
                console.log("song",res.data)
            });

        })
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
    signup.style.display = "none";
    home.style.opacity = "100%";
});
document.getElementById("logout").addEventListener("click", function () {
    localStorage.setItem('userToken', null);
    console.log(localStorage.getItem('userToken'))
    forUser1.style.display = "none"
    newBackground.style.display = "none";
    home.style.opacity = "100%";
    loginNav.style.display = "block";
    profileNav.style.display = "none";
})
