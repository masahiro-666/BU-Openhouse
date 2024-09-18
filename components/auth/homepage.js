import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzMPR6AUSThhU1C7pzgQb85YaeZvvuYTg",
    authDomain: "bu-open-house-2077.firebaseapp.com",
    projectId: "bu-open-house-2077",
    storageBucket: "bu-open-house-2077.appspot.com",
    messagingSenderId: "811263933785",
    appId: "1:811263933785:web:45fa817e17a164014de048",
    measurementId: "G-TEJYNZMB9W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (user && loggedInUserId) {
        console.log("User logged in:", user);
        const docRef = doc(db, "users", loggedInUserId);
        
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserLName').innerText = userData.lastName;

                loginBtn.style.display = 'none';
                logoutBtn.style.display = 'inline-block';
            } else {
                console.log("No user document found in Firestore");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data from Firestore:", error);
        });
    } else {
        console.log("No user is logged in");
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(() => {
        window.location.href = 'registration_page.html';
    })
    .catch((error) => {
        console.error('Error signing out:', error);
    });
});
