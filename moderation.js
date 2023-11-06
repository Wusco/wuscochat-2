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
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
var db = firebase.database();

// Function to load the messages from Firebase
function loadMessages() {
  var messageList = document.getElementById('messageList');

  // Clear the message list
  messageList.innerHTML = '';

  

  // Retrieve the messages from the database and sort them by index
  db.ref('chats').orderByChild('index').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var message = childSnapshot.val();

      // Create message elements
      var messageElement = document.createElement('div');
      messageElement.className = 'message';

      //var nameElement = document.createElement('div');
      //nameElement.textContent = 'Name: ' + message.name;

      var contentElement = document.createElement('div');
      contentElement.className = 'content';
      contentElement.textContent = message.name + ': ' + message.message;

      var actionsElement = document.createElement('div');
      actionsElement.className = 'actions';

      //EDIT
      var editButton = document.createElement('button');
      var editImage = document.createElement('img');
      editImage.src = "https://i.ibb.co/LSctdSw/edit-pencil.png";
      editImage.alt = "Edit";
      editButton.appendChild(editImage);
      editButton.addEventListener('click', function() {
        editMessage(childSnapshot.key, message.message);
      });

      //DELETE
      var deleteButton = document.createElement('button');
      var deleteImage = document.createElement('img');
      deleteImage.src = "https://i.ibb.co/zbBPWvy/trash.png";
      deleteImage.alt = "Delete";
      deleteButton.appendChild(deleteImage);
        deleteButton.addEventListener('click', function() {
        	deleteMessage(childSnapshot.key);
      });


      actionsElement.appendChild(editButton);
      actionsElement.appendChild(reloadButton);

      //messageElement.appendChild(nameElement);
      messageElement.appendChild(contentElement);
      messageElement.appendChild(actionsElement);

      messageList.appendChild(messageElement);
    });
  });
}

// Function to edit a message
function editMessage(key, message) {
  var newMessage = prompt('Enter the new message:', message);
  if (newMessage && newMessage.trim() !== '') {
    db.ref('chats/' + key + '/message').set(newMessage);
    loadMessages();
  }
}

// Function to delete a message
function deleteMessage(key) {
  db.ref('chats/' + key).remove();
  loadMessages();
}

// Load the messages on page load
window.onload = function() {
  loadMessages();
};

document.addEventListener('DOMContentLoaded', function () {
  // Your code here, including the event listener for the 'clearChatButton'
  document.getElementById('clearChatButton').addEventListener('click', clearChat);
  //document.getElementById('reloadChatButton').addEventListener('click', loadmessages);
  // Function to clear the entire chat by deleting each message
function clearChat() {
  if (confirm('Are you sure you want to clear the chat?')) {
    db.ref('chats').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        deleteMessage(key); // Call the deleteMessage function for each message
      });
    });
  }
}
});
