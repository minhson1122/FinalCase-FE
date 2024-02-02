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
                });
        }
    );
};


axios.get('http://localhost:8080/api/songs').then(res => {
    const card = document.getElementById("card");
    card.innerHTML = '';
    let songCount = 0;
    for (const item of res.data) {
        const songDiv = document.createElement("div");
        songDiv.className = "App__section-grid-item";
        songDiv.innerHTML = `
            <div class="featured-image"></div> 
            <div class="song-name" onclick="toggleAudio('${item.src}')">${item.name}</div>
            <span>NPR</span>
        `;
        card.appendChild(songDiv);
        songCount++;
    }
});