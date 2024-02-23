var newBackground = document.getElementById("new-background");
var homeUser = document.getElementById("home")
var signup = document.getElementById("signup-background")
document.getElementById("myButton").addEventListener("click", function() {
    newBackground.style.display="block";
    home.style.opacity="75%";
});
document.getElementById("login-box").addEventListener("click", function() {
    newBackground.style.display="block";
    signup.style.display="none";
    home.style.opacity="75%";
});
document.getElementById("signup-box").addEventListener("click", function() {
    signup.style.display="block";
    newBackground.style.display="none";
    home.style.opacity="75%";
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.querySelector('[name="username"]').value;
    var password = document.querySelector('[name="password"]').value;
    data={
        "username": username,
        "password": password
    }
    axios.post(`http://localhost:8080/login`,data).then(res=>{
        console.log(res)
        newBackground.style.display = "none";
        homeUser.style.display = "block";
    })
        .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 401) {
                alert("Tài Khoản Hoặc Mật Khẩu Sai");
            }
    })
});
document.getElementById("xLogin-btn").addEventListener("click", function() {
    newBackground.style.display="none";
    home.style.opacity="100%";
});
document.getElementById("xSignup-btn").addEventListener("click", function() {
    signup.style.display="none";
    home.style.opacity="100%";
});

document.getElementById("main-view").addEventListener("click", function () {
    newBackground.style.display="none";
    signup.style.display="none";
    home.style.opacity="100%";
});