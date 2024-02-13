// Check if first-party and third-party cookies are enabled
if (navigator.cookieEnabled) {
    // First-party cookies are enabled

    // Check if third-party cookies are enabled
    const testCookieName = 'testThirdPartyCookie';
    const testCookieValue = 'test';
    document.cookie = `${testCookieName}=${testCookieValue}; samesite=none; secure;`;
    const thirdPartyCookiesEnabled = document.cookie.includes(testCookieValue);

    if (!thirdPartyCookiesEnabled) {
        // Third-party cookies are not enabled, display a popup
        displayCookieEnablePopup();
    }
} else {
    // First-party cookies are not enabled, display a popup
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
        <h1>Hey!</h1>
        <p>Cookies are required to use this website. Please enable cookies in your browser settings.</p>
    `;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Check if both first-party and third-party cookies are enabled
    const testCookieName = 'testCookie';
    const testCookieValue = 'test';
    document.cookie = `${testCookieName}=${testCookieValue}`;
    if (document.cookie.includes(testCookieValue)) {
        // Both first-party and third-party cookies are enabled, remove the popup
        document.body.removeChild(popup);
    }
}
// check if they have the signed in cookie and if they do then it will not do anything if they do not have it it will redirect them to the signin screen
function checkAuthState() {
    const signedInCookie = document.cookie.includes("signed_in=true");
    if (!signedInCookie) {
        // User is not signed in, redirect to the sign-in page.
        window.location.replace("/signin.html");
    }
}

// Call the checkAuthState function when the page loads.
document.addEventListener("DOMContentLoaded", function() {
    checkAuthState();
});

// Function to request permission to show notifications
function requestNotificationPermission() {
    // Check if the browser supports notifications
    if ('Notification' in window) {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                alert('Notification permission granted.');
            } else if (permission === 'denied') {
                alert('Notification permission denied. You may not receive notifications for new messages.');
            } else {
                alert('Notification permission has not been requested yet.');
            }
        });
    } else {
        alert('This browser does not support notifications.');
    }
}

// Call the function to request permission for notifications
requestNotificationPermission();

// Create the loading logo image
const img = document.createElement("img");
img.src = "../watermark.png";
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

      const savedTitle = localStorage.getItem("pageTitle");
      if (savedTitle) {
        document.title = savedTitle;
      }
     if (!savedTitle) {
        document.title = "WuscoChat";
      }
      const background = localStorage.getItem('background');
      if (background) {
        document.body.style.backgroundImage = background;
      } else {
       const presetBackground = 'url("your-background-image.jpg")';
       document.body.style.backgroundImage = presetBackground;
       }

      const urlf = localStorage.getItem("favicon");
      const favicon = document.querySelector('link[rel="shortcut icon"]') || document.createElement('link');
      favicon.type = 'image/x-icon';
      favicon.rel = 'shortcut icon';
      favicon.href = urlf;
      document.head.appendChild(favicon);

      // Load hamburger menu
      const hamburgerMenu = document.querySelector('.hamburger-menu');
      const hamburgerMenuIcon = document.querySelector('.hamburger-menu__icon');
      const hamburgerMenuLinks = document.querySelector('.hamburger-menu__links');
      const menuLinks = [
        { title: 'Settings', url: '../settings.html' },
        { title: 'Live Chat', url: '../chat/index.html' }
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
