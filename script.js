const socket = io("https://your-backend-url.onrender.com"); // Replace with your backend URL

// Send message
function sendMessage() {
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;

    if (username && message) {
        socket.emit("chatMessage", { user: username, text: message });
        document.getElementById("message").value = ""; // Clear input
    }
}

// Display messages in real-time
socket.on("message", (msg) => {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Typing indicator
function showTyping() {
    let username = document.getElementById("username").value;
    socket.emit("typing", username);
}

socket.on("typingStatus", (status) => {
    document.getElementById("typing-status").innerText = status || "";
});

// Save chat as PDF
function saveChatAsPDF() {
    let chatBox = document.getElementById("chat-box").innerHTML;
    let newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write("<h2>Chat History</h2>" + chatBox);
    newWindow.print();
}
