const socket = io()

let user;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.msg-area')

do {
    user = prompt('Please enter your name:')
} while (!user);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: user,
        message: message.trim()
    }
    //messgae append
    appendMessage(msg, 'outgoing')
    // clear textarea
    textarea.value = ''
    scrollToBottom()

    // send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)

}

// receive message

socket.on('message', (msg) => {
    // console.log(msg);
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}