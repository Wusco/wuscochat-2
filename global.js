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

      // Retrieve and apply the saved page title, background image, and favicon
      const savedTitle = localStorage.getItem("pageTitle");
      if (savedTitle) {
        document.title = savedTitle;
      }

      const background = localStorage.getItem('background');
      if (background) {
        document.body.style.backgroundImage = background;
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
        { title: 'Home', url: 'index.html' },
        { title: 'Settings', url: 'settings.html' },
        { title: 'Music', url: 'music.html' },
        { title: 'Notebook', url: 'notebook.html' },
        { title: 'Live Chat', url: 'chat.html' },
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
