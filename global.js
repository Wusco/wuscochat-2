// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADU9mE19sCAgybueA1CjB4pGMa7ALN0-M",
    authDomain: "wuscochat.firebaseapp.com",
    databaseURL: "https://wuscochat-default-rtdb.firebaseio.com",
    projectId: "wuscochat",
    storageBucket: "wuscochat.appspot.com",
    messagingSenderId: "1092324424182",
    appId: "1:1092324424182:web:6c7e02de473063660e2fd7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

// Function to check authentication state and handle redirects
function checkAuthState() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in, you can perform actions here if needed.
        } else {
            // User is not signed in, redirect to the sign-in page.
            window.location.href = "signin.html";
        }
    });
}

// Call the checkAuthState function when the page loads.
document.addEventListener("DOMContentLoaded", function() {
    checkAuthState();
});
