// Check if first-party and third-party cookies are enabled
if (navigator.cookieEnabled) {
    console.log('First-party cookies are enabled');

    // Check if third-party cookies are enabled
    const testCookieName = 'testThirdPartyCookie';
    const testCookieValue = 'test';
    document.cookie = `${testCookieName}=${testCookieValue}; samesite=none; secure;`;
    const thirdPartyCookiesEnabled = document.cookie.includes(testCookieValue);

    if (thirdPartyCookiesEnabled) {
        console.log('Third-party cookies are enabled');
    } else {
        console.log('Third-party cookies are not enabled');
        displayCookieEnablePopup();
    }
} else {
    console.log('First-party cookies are not enabled');
    displayCookieEnablePopup();
}

function displayCookieEnablePopup() {
    // Customize the popup to instruct the user to enable cookies
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popup.style.color = '#fff';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.innerHTML = `
        <p>Cookies are required to use this website. Please enable cookies in your browser settings.</p>
    `;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Check if both first-party and third-party cookies are enabled
    const testCookieName = 'testCookie';
    const testCookieValue = 'test';
    document.cookie = `${testCookieName}=${testCookieValue}`;
    if (document.cookie.includes(testCookieValue)) {
        console.log('Both first-party and third-party cookies are enabled');
        // Both first-party and third-party cookies are enabled, remove the popup
        document.body.removeChild(popup);
    } else {
        console.log('First-party or third-party cookies are still not enabled');
    }
}

// Check if they have the signed-in cookie, and if they do, it will not do anything.
// If they do not have it, it will redirect them to the sign-in page.
function checkAuthState() {
    const signedInCookie = document.cookie.includes("signed_in=true");
    if (!signedInCookie) {
        console.log('User is not signed in. Redirecting to sign-in page.');
        // User is not signed in, redirect to the sign-in page.
        window.location.href = "signin.html";
    }
}

// Call the checkAuthState function when the page loads.
document.addEventListener("DOMContentLoaded", function() {
    checkAuthState();
});

// Create the loading logo image
const img = document.createElement("img");
img.src = "watermark.png";
img.style.width = "100px";
img.style.height = "100px";
img.style.position = "absolute";
img.style.top = "50%";
img.style.left = "50%";
img.style.transform = "translate(-50%, -50%)";
img.style.borderRadius = "50%";
img.classList.add("rotate"); // Add the rotate class

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(img);

    // Wait for the page to fully load
    window.addEventListener('load', () => {
        // Add an artificial delay of .4 seconds to run this code below
        setTimeout(() => {
            document.body.removeChild(img);

            // Retrieve and apply the saved page title and background image
            const savedTitle = localStorage.getItem("pageTitle");
            if (savedTitle) {
                console.log('Retrieved saved title:', savedTitle);
                document.title = savedTitle;
            } else {
                // If no saved title is found, set a preset title
                const presetTitle = "WuscoChat"; // Replace with your preset title
                console.log('Using preset title:', presetTitle);
                document.title = presetTitle;
            }

            const background = localStorage.getItem('background');
            if (background) {
                console.log('Retrieved saved background:', background);
                document.body.style.backgroundImage = background;
            } else {
                // If no saved background is found, set a preset background
                const presetBackground = 'url("preset-background.jpg")'; // Replace with your preset background
                console.log('Using preset background:', presetBackground);
                document.body.style.backgroundImage = presetBackground;
            }

            // Retrieve the preset favicon and apply it
            const presetFavicon = 'favicon.ico'; // Replace with your actual preset favicon path
            const currentFavicon = document.querySelector('link[rel="shortcut icon"]');

            if (!currentFavicon || currentFavicon.getAttribute('href') !== presetFavicon) {
                const newFavicon = document.createElement('link');
                newFavicon.rel = 'shortcut icon';
                newFavicon.href = presetFavicon;
                newFavicon.type = 'image/x-icon';

                if (currentFavicon) {
                    // Replace the existing favicon with the preset one
                    document.head.removeChild(currentFavicon);
                }

                document.head.appendChild(newFavicon);

                console.log('Set favicon to:', presetFavicon);
            } else {
                console.log('Favicon is already set to:', presetFavicon);
            }

            // Load hamburger menu
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            const hamburgerMenuIcon = document.querySelector('.hamburger-menu__icon');
            const hamburgerMenuLinks = document.querySelector('.hamburger-menu__links');
            const menuLinks = [
                { title: 'Settings', url: 'settings.html' },
                { title: 'Live Chat', url: 'chat.html' }
            ];

            const generateMenuLinks = () => {
                const menuLinksHTML = menuLinks.map(link => `<a href="${link.url}" class="menu-link">${link.title}</a>`).join('');
                hamburgerMenuLinks.innerHTML = menuLinksHTML;
            };

            hamburgerMenuIcon.addEventListener('click', () => {
                hamburgerMenu.classList.toggle('active');
                hamburgerMenuLinks.style.height = hamburgerMenu.classList.contains('active') ? 'auto' : '0';
            });

            generateMenuLinks();

            menuLinks.forEach(link => {
                const anchor = hamburgerMenuLinks.querySelector(`[href="${link.url}"]`);
                anchor.addEventListener('click', () => {
                    const href = anchor.getAttribute('href');
                    window.location.href = href;
                });
            });

            // Check for password protection and prompt the user if necessary
            const password = localStorage.getItem('password') || '';
            const passwordActive = localStorage.getItem('passwordActive') === 'true';

            if (password && passwordActive) {
                const input = prompt('Enter password:');
                if (input !== password) {
                    alert('Incorrect password!');
                    window.location.href = 'https://www.youtube.com/watch?v=o-YBDTqX_ZU';
                }
            }
        }, 400); // Wait for .4 seconds (400 milliseconds) before executing this code above
    });
});
