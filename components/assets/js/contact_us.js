import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {collection, getFirestore, setDoc, doc, addDoc, serverTimestamp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";



// Firebase configuration
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
const db = getFirestore(app);

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      // Save form data to Firestore
      await addDoc(collection(db, 'contacts'), {
        name: name,
        email: email,
        message: message,
        timestamp: serverTimestamp()
      });
      console.log('send');
      contactForm.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  });
});
