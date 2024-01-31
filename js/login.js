document.getElementById("myButton").addEventListener("click", function() {
    var newBackground = document.getElementById("new-background");
    newBackground.classList.toggle("visible");
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.querySelector('[name="username"]').value;
    var password = document.querySelector('[name="password"]').value;
    console.log('Username:', username);
    console.log('Password:', password);
});