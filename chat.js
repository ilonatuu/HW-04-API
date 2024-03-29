// Задание 3
const buttonSend = document.querySelector(".button-chat-send")
const buttonClearChat = document.querySelector(".button-clear-chat")
const chatInputForm = document.querySelector(".chat-input-form")
const userInput = document.querySelector(".chat-user-input")
const userOutput = document.getElementById("user-output")
const echoOutput = document.querySelector("#echo-output")
const chatMessages = document.querySelector(".chat-conversation-window")

const wsUrl = "wss://echo-ws-service.herokuapp.com"

const geoStatus = document.querySelector("#geo-status")
const mapLink = document.querySelector("#map-link")
const buttonGeo = document.querySelector(".button-chat-geo")

let socket;


const createChatMessageElement = (message) => `
    <div class="user-output" id="user-output">${message.text}</div>
`
const createEchoMessageElement = (message) => `
    <div class="echo-output" id="echo-output">${message.text}</div>
`

const sendMessage = (e) => {
    e.preventDefault()

    const message = {
        text: userInput.value,
    }

    chatMessages.innerHTML += createChatMessageElement(message)
    chatInputForm.reset()

    socket.send(message.text);
}

buttonSend.addEventListener("click", sendMessage)

buttonClearChat.addEventListener("click", () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})


socket = new WebSocket(wsUrl);

socket.addEventListener('open', function (event) {
});

socket.addEventListener('message', function (event) {
    chatMessages.innerHTML += createEchoMessageElement({ text: event.data });
});

socket.addEventListener('error', function (error) {
    console.error('Ошибка WebSocket соединения:', error);
});

socket.addEventListener('close', function (event) {
});




const error = () => {
    geoStatus.textContent = "Невозможно получить ваше местоположение";
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = "Ваша локация";

    const message = {
        text: `<a href="${mapLink.href}" target="_blank">Геолокация</a>`
    };

    chatMessages.innerHTML += createChatMessageElement(message);

    chatInputForm.reset();
}

buttonGeo.addEventListener("click", (e) => {
    e.preventDefault();

    mapLink.href = "";
    mapLink.textContent = "";

    if (!navigator.geolocation) {
        geoStatus.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
        geoStatus.textContent = "Определение местоположения...";
        navigator.geolocation.getCurrentPosition(success, error);
    }
});







