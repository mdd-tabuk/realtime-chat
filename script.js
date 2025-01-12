const socket = io("https://realtime-chat-backend-49ll.onrender.com"); // Ensure this is correct

// Send message
function sendMessage() {
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;

    console.log("Sending message:", username, message); // Debugging log

    if (username && message) {
        socket.emit("chatMessage", { user: username, text: message });
        document.getElementById("message").value = ""; // Clear input
    }
}

// Receive messages
socket.on("message", (msg) => {
    console.log("Received message:", msg); // Debugging log
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});


