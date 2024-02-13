document.addEventListener('DOMContentLoaded', function () {
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADU9mE19sCAgybueA1CjB4pGMa7ALN0-M",
    authDomain: "wuscochat.firebaseapp.com",
    projectId: "wuscochat",
    storageBucket: "wuscochat.appspot.com",
    messagingSenderId: "1092324424182",
    appId: "1:1092324424182:web:6c7e02de473063660e2fd7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// This is very IMPORTANT!! We're going to use "db" a lot.
var db = firebase.database();

// We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
class MEME_CHAT {
    // Home() is used to create the home page
    home() {
        // First clear the body before adding in
        // a title and the join form
        document.body.innerHTML = '';
        this.create_title();
        this.create_join_form();
    }

    // chat() is used to create the chat page
    chat() {
        this.create_title();
        this.create_chat();
        this.create_left_sidebar();
        this.create_right_sidebar();
    }

    // create_title() is used to create the title
    create_title() {
        // This is the title creator. 🎉
        var title_container = document.createElement('div');
        title_container.setAttribute('id', 'title_container');
        var title_inner_container = document.createElement('div');
        title_inner_container.setAttribute('id', 'title_inner_container');

        var title = document.createElement('h1');
        title.setAttribute('id', 'title');
        title.innerHTML = 'WuscoChat <img src="../logo.png" alt="Logo" class="logo">';

        title_inner_container.append(title);
        title_container.append(title_inner_container);
        document.body.append(title_container);
    }

    // create_join_form() creates the join form
    create_join_form() {
        // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!😂
        var parent = this;

        var join_container = document.createElement('div');
        join_container.setAttribute('id', 'join_container');
        var join_inner_container = document.createElement('div');
        join_inner_container.setAttribute('id', 'join_inner_container');

        var join_button_container = document.createElement('div');
        join_button_container.setAttribute('id', 'join_button_container');

        var join_button = document.createElement('button');
        join_button.setAttribute('id', 'join_button');
        join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>';

        var join_input_container = document.createElement('div');
        join_input_container.setAttribute('id', 'join_input_container');

        var join_input = document.createElement('input');
        join_input.setAttribute('id', 'join_input');
        join_input.setAttribute('maxlength', 25);
        join_input.placeholder = 'User';
        // Every time we type into the join_input
        join_input.onkeyup = function () {
            // If the input we have is longer that 0 letters
            if (join_input.value.length > 2) {
                // Make the button light up
                join_button.classList.add('enabled');
                // Allow the user to click the button
                join_button.onclick = function () {
                    // Save the name to local storage. Passing in
                    // the join_input.value
                    parent.save_name(join_input.value);
                    // Remove the join_container. So the site doesn't look weird.
                    join_container.remove();
                    // parent = this. But it is not the join_button
                    // It is (MEME_CHAT = this).
                    parent.create_chat();
                    location.reload();
                };
            } else {
                // If the join_input is empty then turn off the
                // join button
                join_button.classList.remove('enabled');
            }
        };

        // Append everything to the body
        join_button_container.append(join_button);
        join_input_container.append(join_input);
        join_inner_container.append(join_input_container, join_button_container);
        join_container.append(join_inner_container);
        document.body.append(join_container);
    }

    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id) {
        // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
        var parent = this;

        // This is a loading function. Something cool to have.
        var container = document.getElementById(container_id);
        container.innerHTML = '';

        var loader_container = document.createElement('div');
        loader_container.setAttribute('class', 'loader_container');

        var loader = document.createElement('div');
        loader.setAttribute('class', 'loader');

        loader_container.append(loader);
        container.append(loader_container);
    }

    create_left_sidebar() {
        var leftSidebar = document.createElement('div');
        leftSidebar.setAttribute('id', 'left-sidebar');
        leftSidebar.setAttribute('class', 'meme-container');
        // add what you want here enzo
        leftSidebar.innerHTML = '<iframe src="https://wuscoadvertisement-485877.netlify.app/" style="width: 200px; padding: 0px; height: calc(100% - 10px); overflow:hidden; position: fixed;"></iframe>';
        leftSidebar.classList.add('left-sidebar');
        document.body.append(leftSidebar);
    }

    create_right_sidebar() {
        var rightSidebar = document.createElement('div');
        rightSidebar.setAttribute('id', 'right-sidebar');
        rightSidebar.innerHTML = 'WuscoChat Rules:';
        rightSidebar.classList.add('right-sidebar');

        var rules = document.createElement('ul');
        // add your rules here
        rules.innerHTML = `
      <br>
      <li>Rule 1: No spamming or flooding the chat.</li>
      <li>Rule 2: No text art</li>
      <button class="panic" onclick="location.href='https://classroom.google.com'">
        Panic Button
      </button>

          `;

        rightSidebar.append(rules);

        document.body.append(rightSidebar);
    }

    // create_chat() creates the chat container and stuff
    create_chat() {
        // Again! You need to have (parent = this)
        var parent = this;
        // GET THAT MEMECHAT HEADER OUTTA HERE
        var title_container = document.getElementById('title_container');
        var title = document.getElementById('title');
        title_container.classList.add('chat_title_container');
        // Make the title smaller by making it 'chat_title'
        title.classList.add('chat_title');

        var chat_container = document.createElement('div');
        chat_container.setAttribute('id', 'chat_container');

        var chat_inner_container = document.createElement('div');
        chat_inner_container.setAttribute('id', 'chat_inner_container');

        var chat_content_container = document.createElement('div');
        chat_content_container.setAttribute('id', 'chat_content_container');

        var chat_input_container = document.createElement('div');
        chat_input_container.setAttribute('id', 'chat_input_container');

        var chat_input_send = document.createElement('button');
        chat_input_send.setAttribute('id', 'chat_input_send');
        chat_input_send.setAttribute('disabled', true);
        chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`;

        var chat_input = document.createElement('input');
        chat_input.setAttribute('id', 'chat_input');
        // Only a max message length of 500
        chat_input.setAttribute('maxlength', 10000);
        // Get the name of the user
        chat_input.placeholder = `${parent.get_name()} - Say something...`;
        chat_input.onkeyup = function () {
            if (chat_input.value.length > 0) {
                chat_input_send.removeAttribute('disabled');
                chat_input_send.classList.add('enabled');
                chat_input_send.onclick = function () {
                    chat_input_send.setAttribute('disabled', true);
                    chat_input_send.classList.remove('enabled');
                    if (chat_input.value.length <= 0) {
                        return;
                    }
                    // Enable the loading circle in the 'chat_content_container'
                    parent.create_load('chat_content_container');
                    // Send the message. Pass in the chat_input.value
                    parent.send_message(chat_input.value);
                    // Clear the chat input box
                    chat_input.value = '';
                    // Focus on the input just after
                    chat_input.focus();
                };
            } else {
                chat_input_send.classList.remove('enabled');
            }
        };
        var chat_logout_container = document.createElement('div');
        chat_logout_container.setAttribute('id', 'chat_logout_container');

        var chat_logout = document.createElement('button');
        chat_logout.setAttribute('id', 'chat_logout');
        chat_logout.textContent = `${parent.get_name()} • logout`;
        // "Logout" is really just deleting the name from the localStorage
        chat_logout.onclick = function () {
            localStorage.removeItem("name");
            // Go back to home page
            parent.home();
        };

        chat_logout_container.append(chat_logout);
        chat_input_container.append(chat_input, chat_input_send);
        chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container);
        chat_container.append(chat_inner_container);
        document.body.append(chat_container);
        // After creating the chat. We immediately create a loading circle in the 'chat_content_container'
        parent.create_load('chat_content_container');
        // then we "refresh" and get the chat data from Firebase
        parent.refresh_chat();
    }

    // Save name. It literally saves the name to localStorage
    save_name(name) {
        // Save name to localStorage
        localStorage.setItem('name', name);
    }

   // Sends message/saves the message to firebase database
send_message(message) {
    var parent = this;

    // if the local storage name is null and there is no message
    // then return/don't send the message. The user is somehow hacking
    // to send messages. Or they just deleted the
    // localstorage themselves. But hacking sounds cooler!!
    if (parent.get_name() == null && message == null) {
        return;
    }

    // Get the sender's name
    var senderName = parent.get_name();

    // Get the firebase database value
    db.ref('chats/').once('value', function (message_object) {
        // This index is important. It will help organize the chat in order
        var index = parseFloat(message_object.numChildren()) + 1;
        db.ref('chats/' + `message_${index}`).set({
            name: senderName,
            message: message,
            index: index
        }).then(function () {
            // After we send the chat refresh to get the new messages
            parent.refresh_chat();

            // Check if the user is active on the page
            if (senderName !== localStorage.getItem("name")) {
                // Send push notification to the user for the new message
                sendPushNotification(message, senderName);
            }
        });
    });

    // Check if the chat is open
    //handleNotificationClick();
}

    // Get name. Gets the username from localStorage
    get_name() {
        // Get the name from localstorage
        if (localStorage.getItem('name') != null) {
            return localStorage.getItem('name');
        } else {
            this.home();
            return null;
        }
    }

    // Refresh chat gets the message/chat data from firebase
    refresh_chat() {
        var chat_content_container = document.getElementById('chat_content_container');

        // Get the chats from firebase
        db.ref('chats/').on('value', function (messages_object) {
            // When we get the data clear chat_content_container
            chat_content_container.innerHTML = '';
            // if there are no messages in the chat. Return. Don't load anything
            if (messages_object.numChildren() == 0) {
                return;
            }

            // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
            // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!

            // convert the message object values to an array.
            var messages = Object.values(messages_object.val());
            var guide = []; // this will be our guide to organizing the messages
            var unordered = []; // unordered messages
            var ordered = []; // we're going to order these messages

            for (var i, i = 0; i < messages.length; i++) {
                // The guide is simply an array from 0 to the messages.length
                guide.push(i + 1);
                // unordered is the [message, index_of_the_message]
                unordered.push([messages[i], messages[i].index]);
            }

            // Now this is straight up from stack overflow 🤣
            // Sort the unordered messages by the guide
            guide.forEach(function (key) {
                var found = false;
                unordered = unordered.filter(function (item) {
                    if (!found && item[1] == key) {
                        // Now push the ordered messages to ordered array
                        ordered.push(item[0]);
                        found = true;
                        return false;
                    } else {
                        return true;
                    }
                });
            });

            // Now we're done. Simply display the ordered messages
            ordered.forEach(function (data) {
                var name = data.name;
                var message = data.message;

                var message_container = document.createElement('div');
                message_container.setAttribute('class', 'message_container');

                var message_inner_container = document.createElement('div');
                message_inner_container.setAttribute('class', 'message_inner_container');

                var message_user_container = document.createElement('div');
                message_user_container.setAttribute('class', 'message_user_container');

                var message_user = document.createElement('div');
                message_user.setAttribute('class', 'message_user');
                message_user.textContent = name;

                var message_message = document.createElement('div');
                message_message.setAttribute('class', 'message_message');
                message_message.textContent = message;

                message_user_container.append(message_user);
                message_inner_container.append(message_user_container, message_message);
                message_container.append(message_inner_container);
                chat_content_container.append(message_container);
            });

            // Here we are getting the messages in a timely manner
            chat_content_container.scrollTop = chat_content_container.scrollHeight;
        });
    }
}

// Firebase has this push notification on its site
function sendPushNotification(message, senderName) {
    // Check for notification support
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return;
    }

    // Initialize a variable to keep track of the last click timestamp
    var lastClickTimestamp = 0;

    // Check if the user has granted permission for notifications
    //if (Notification.permission === "granted") {
        // Create the notification
        var notification = new Notification("New message on Wuscochat!", {
            body: `${senderName}: \n${message}`,
            icon: "watermark.png"
        });

        // Listen for the notification click event
        notification.onclick = function (event) {
            var currentTime = new Date().getTime();

            // Check if the time difference between the current click and the last click is less than 300 milliseconds
            if (currentTime - lastClickTimestamp < 300) {
                // Redirect the user to the chat page URL
                var chatWindow = window.open('https://wuscochat.netlify.app/chat/', '_blank');
                // If the chat window is already open, focus on it
                if (chatWindow) {
                    chatWindow.focus();
                }
            }

            // Update the last click timestamp to the current time
            lastClickTimestamp = currentTime;

            // Close the notification if needed
            notification.close();
        };

        console.log("Notification sent:", `${senderName}: \n${message}`);
    } else if (Notification.permission !== 'denied') {
        // Ask the user for permission to send notifications
        Notification.requestPermission(function (permission) {
            // If the user accepts, send the notification 
            if (permission === "granted") {
                var notification = new Notification("New message on Wuscochat!!!", {
                    body: `${senderName}: \n${message}`,
                    icon: "watermark.png"
                });

                // Listen for the notification click event
                notification.onclick = function (event) {
                    var currentTime = new Date().getTime();

                    // Check if the time difference between the current click and the last click is less than 300 milliseconds
                    if (currentTime - lastClickTimestamp < 300) {
                        // Redirect the user to the chat page URL
                        var chatWindow = window.open('https://wuscochat.netlify.app/chat/', '_blank');
                        // If the chat window is already open, focus on it
                        if (chatWindow) {
                            chatWindow.focus();
                        }
                    }

                    // Update the last click timestamp to the current time
                    lastClickTimestamp = currentTime;

                    // Close the notification if needed
                    notification.close();
                };

                console.log("Notification sent:", `${senderName}: \n${message}`);
            }
        });
    }
}

// The variable MEME_CHAT is our entire application.
var meme_chat = new MEME_CHAT();

// If there is no name. Go to home
if (localStorage.getItem('name') == null) {
    meme_chat.home();
} else {
    meme_chat.chat();
}
});
