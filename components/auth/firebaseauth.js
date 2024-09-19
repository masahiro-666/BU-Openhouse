import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDzMPR6AUSThhU1C7pzgQb85YaeZvvuYTg",
    authDomain: "bu-open-house-2077.firebaseapp.com",
    projectId: "bu-open-house-2077",
    storageBucket: "bu-open-house-2077.appspot.com",
    messagingSenderId: "811263933785",
    appId: "1:811263933785:web:45fa817e17a164014de048",
    measurementId: "G-TEJYNZMB9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'registration_page.html';
        })
        .catch((error) => {
            console.error("Error writing document", error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        } else {
            showMessage('Unable to create User', 'signUpMessage');
        }
    });
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        showMessage('Login is successful', 'signInMessage');
        window.location.href = 'homepage.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Incorrect Email or Password', 'signInMessage');
        } else {
            showMessage('Account does not Exist', 'signInMessage');
        }
    });
});

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        localStorage.setItem('loggedInUserId', user.uid);
        const email = document.getElementById('rEmail').value;
        console.log(user);
        window.location.href = "homepage.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});
