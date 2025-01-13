const socket = io("https://0b25920f-86cc-4369-8081-2fbd39c5d217-00-wj8qqoyp4zwr.pike.replit.dev/"); // Replace with your actual Render backend URL

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded and DOM ready.");

    // Attach event listeners to buttons
    document.getElementById("send-btn").addEventListener("click", sendMessage);
    document.getElementById("pdf-btn").addEventListener("click", saveChatAsPDF);
});

// Send Message Function
function sendMessage() {
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;

    console.log("Sending message:", username, message);

    if (username && message) {
        socket.emit("chatMessage", { user: username, text: message });

        let chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `<p><strong>${username}:</strong> ${message}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        document.getElementById("message").value = ""; // Clear input
    }
}

// Receive Messages in Real-Time
socket.on("message", (msg) => {
    console.log("Received message:", msg);
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Save Chat as PDF
function saveChatAsPDF() {
    let chatBox = document.getElementById("chat-box").innerHTML;
    let newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write("<h2>Chat History</h2>" + chatBox);
    newWindow.print();
}
