const firebaseConfig = {
    apiKey: "AIzaSyBdDYDur5mbq0klC3RNQRpLKUkoN7hT-Nc",
    authDomain: "test-91e51.firebaseapp.com",
    projectId: "test-91e51",
    storageBucket: "test-91e51.appspot.com",
    messagingSenderId: "477003899691",
    appId: "1:477003899691:web:9385956cfd07fcb8475b6e",
    measurementId: "G-34JPQ74YJ9"
};

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
let file;
let fileName;
let uploadedFileName;
let imageURL;
const getImageData = (e) => {
    file = e.target.files[0];
    fileName = Math.round(Math.random() * 9999) + file.name;
    const storageRef = storage.ref().child("music");
    const folderRef = storageRef.child(fileName);
    const uploadtask = folderRef.put(file);
    uploadtask.on(
        "state_changed",
        (snapshot) => {
            uploadedFileName = snapshot.ref.name;
        },
        (error) => {
            console.log(error);
        },
        () => {
            storage
                .ref("music")
                .child(uploadedFileName)
                .getDownloadURL()
                .then((url) => {
                    console.log(url)
                    imageURL = url;
                    document.getElementById("profilePic").src=url;
                    document.getElementById("profilePic").style.display='block';
                });
        }
    );
};
document.getElementById('editProfile').addEventListener('click',function () {
    var newBackground = document.getElementById("formEdit");
    newBackground.style.display="block";
    document.getElementById("profiles").style.display="none";

})


 function profile() {
     var newBackground = document.getElementById("profiles");
     newBackground.style.display = "block";

 }
function dataProfile(id){
    axios.get(`http://localhost:8080/users/`+id).then(res=>{
        console.log(res.data)
        document.getElementById('nameU').value=res.data.name
        document.getElementById('email').value=res.data.username
        document.getElementById('phoneu').value=res.data.phone
        document.getElementById('profilePics').src=res.data.avatar

    })
}
function edit(id) {
    document.getElementById('form').addEventListener('submit',function (event){
        event.preventDefault();
        var usernames = document.querySelector('[name="usernames"]').value;
        var passwords = document.querySelector('[name="passwords"]').value;
        var confirmPassword = document.querySelector('[name="confirmPasswords"]').value;
        var name = document.querySelector('[name="name"]').value;
        var phone = document.querySelector('[name="phone"]').value;
        var img = imageURL;
        let data = {
            id: id,
            username: usernames,
            password: passwords,
            confirmPassword: confirmPassword,
            enabled: true,
            name: name,
            avatar: img,
            phone: phone
        }
        axios.put(`http://localhost:8080/users/`+id,data).then(()=>{
            alert("edit done")
        })
    })
}
 function backHome(){
    document.getElementById("profiles").style.display="none";
    document.getElementById("originnal-backround").style.display="block";

 }
 function backProfile(){
     document.getElementById("formEdit").style.display="none";
     document.getElementById("profiles").style.display="block";
 }

