
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyAwC4pvSSVcf4n46VYAfQHf7nIOKdIKRUg",
  authDomain: "web-app-c5031.firebaseapp.com",
  projectId: "web-app-c5031",
  storageBucket: "web-app-c5031.firebasestorage.app",
  messagingSenderId: "592760671447",
  appId: "1:592760671447:web:23f09512575ee9a316f492",
  measurementId: "G-Y0S67RTSCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

  const db=getFirestore();
  onAuthStateChanged(auth, (user) => {
    if (user) {
        // Store the user ID in localStorage if it's not already stored
        if (!localStorage.getItem('loggedInUserId')) {
            localStorage.setItem('loggedInUserId', user.uid);
            console.log("User ID stored in localStorage:", user.uid);
        }
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        console.log("Logged in User ID from localStorage:", loggedInUserId); // Debug log
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        console.log("User data retrieved:", userData); // Debug log
                        // Populate user data on the page
                        document.getElementById('loggedUserFName').innerText = userData.firstName;
                        document.getElementById('loggedUserEmail').innerText = userData.email;
                        document.getElementById('loggedUserLName').innerText = userData.lastName;
                    } else {
                        console.log("No document found matching ID:", loggedInUserId);
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                });
        }
    } else {
        console.log("User is not logged in");
    }
});
  const logoutButton=document.getElementById('logout');
  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  });



