// Function to check authentication state and handle redirects
function checkAuthState() {
    const signedInCookie = document.cookie.includes("signed_in=true");
    if (!signedInCookie) {
        // User is not signed in, redirect to the sign-in page.
        window.location.href = "signin.html";
    }
}

// Call the checkAuthState function when the page loads.
document.addEventListener("DOMContentLoaded", function() {
    checkAuthState();
});
