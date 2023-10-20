const previewDiv = document.querySelector('#my-preview');
const backgroundFileInput = document.querySelector('#background-file');
const backgroundUrlInput = document.querySelector('#background-url');
const submitButton = document.querySelector('#submit-button');
const toggleHistoryButton = document.getElementById('toggleHistory');

backgroundFileInput.addEventListener('change', handleBackgroundFileChange);
backgroundUrlInput.addEventListener('input', handleBackgroundUrlInput);
submitButton.addEventListener('click', handleBackgroundSubmit);

const background = localStorage.getItem('background');
if (background) {
  previewDiv.style.backgroundImage = background;
  document.body.style.backgroundImage = background;
}

function handleBackgroundFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      event.preventDefault();
      previewDiv.style.backgroundImage = `url(${event.target.result})`;
      localStorage.setItem('background', `url(${event.target.result})`);
      console.log('Background saved to local storage:', `url(${event.target.result})`);
      document.body.style.backgroundImage = `url(${event.target.result})`;
    });
    reader.readAsDataURL(file);
  }
}

function handleBackgroundUrlInput(event) {
  const url = event.target.value;
  if (url) {
    previewDiv.style.backgroundImage = `url(${url})`;
    localStorage.setItem('background', `url(${url})`);
    console.log('Background saved to local storage:', `url(${url})`);
    document.body.style.backgroundImage = `url(${url})`;
  }
}

function handleBackgroundSubmit(event) {
  event.preventDefault();
  const background = previewDiv.style.backgroundImage;
  if (background) {
    localStorage.setItem('background', background);
    console.log('Background saved to local storage:', background);
    document.body.style.backgroundImage = background;
  }
}

function bi() {
  window.open("https://www.google.com/search?rlz=1CAJIKU_enUS1058&q=2528x1321+wallpapers&tbm=isch&sa=X&ved=2ahUKEwjHt7SMhK__AhXqk4kEHbQ1CrUQ0pQJegQIChAB&biw=1366&bih=665&dpr=1&safe=active&ssui=on")    
}

function setTitle() {
  var title = document.getElementById("titleInput").value;
  document.title = title;
  localStorage.setItem("pageTitle", title);
}

const faviconInput = document.getElementById('faviconInput');
const saveFaviconButton = document.getElementById('saveFavicon');

saveFaviconButton.addEventListener('click', (event) => {
  event.preventDefault(); // added event parameter
  const faviconFile = faviconInput.files[0]; // get the selected file
  const reader = new FileReader();
  reader.readAsDataURL(faviconFile); // read file as data URL
  reader.onload = () => {
    const faviconDataUrl = reader.result; // get the data URL
    localStorage.setItem('favicon', faviconDataUrl); // save to local storage
    alert('Favicon saved successfully!');
  };
});

const coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

const passwordInput = document.getElementById('passwordInput');
const saveButton = document.getElementById('saveButton');
const activateButton = document.getElementById('activateButton');
const deactivateButton = document.getElementById('deactivateButton');
let password = localStorage.getItem('password') || '';
let passwordActive = localStorage.getItem('passwordActive') === 'true';

passwordInput.value = password;
activateButton.disabled = passwordActive;
deactivateButton.disabled = !passwordActive;

saveButton.addEventListener('click', () => {
  password = passwordInput.value;
  localStorage.setItem('password', password);
  alert('Password saved successfully!');
});

activateButton.addEventListener('click', () => {
  passwordActive = true;
  localStorage.setItem('passwordActive', 'true');
  activateButton.disabled = true;
  deactivateButton.disabled = false;
  alert('Password activated!');
});

deactivateButton.addEventListener('click', () => {
  passwordActive = false;
  localStorage.removeItem('passwordActive');
  activateButton.disabled = false;
  deactivateButton.disabled = true;
  alert('Password deactivated!');
});
