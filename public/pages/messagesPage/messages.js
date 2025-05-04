import { renderFooter } from "../../components/footer/footer.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderMessagesPage(parent, messages, sender) {
    parent.innerHTML = `<div id="messages-page">
                            <div id="messages-header"></div>
                            <main id="messages-main">
                                <div id="messages-container"></div>
                                <div id="messages-sender"></div>
                            </main>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));

    renderMessagesHeader(
        parent.querySelector("#messages-header"), sender
    );

    const lastMessage = messages[messages.length - 1];

    renderMessagesSender(
        parent.querySelector("#messages-main"), lastMessage
    );

    for (let i = 0; i < messages.length - 1; i++) {
        const message = messages[i];
        renderMessage(
            parent.querySelector("#messages-main"),
            message
        );
    }
}

function renderMessagesHeader(parent, sender) {
    const arrow = document.createElement("img");
    arrow.id = "messages-arrow";
    arrow.src = "../../media/messages-icon/arrow.svg";
    parent.appendChild(arrow);

    const name = document.createElement("p");
    name.id = "messages-name";
    name.innerHTML = sender;
    parent.appendChild(name);
}

function renderMessagesSender(parent, lastMessage) {

    const textBox = document.createElement("div");
    textBox.id = "messages-textbox";
    parent.querySelector("#messages-sender").appendChild(textBox);

    const text = document.createElement("p");
    text.id = "messages-text";
    textBox.appendChild(text);

    const sendButton = document.createElement("button");
    sendButton.id = "messages-send-button";
    sendButton.innerHTML = "<img src=\"../../media/messages-icon/sendArrow.svg\">";
    textBox.appendChild(sendButton);

    sendButton.addEventListener("click", () => {
        if (text.innerHTML == "") return;
        renderMessage(parent, { text: textBox.querySelector("#messages-text").innerHTML, normal: true, sender: "Spelaren", canSend: false });
        text.innerHTML = "";
        pageHandler.handleProgression(); //move in the progression state

        setTimeout(() => {
            renderMessage(parent, lastMessage);
            window.scrollTo(0, document.body.scrollHeight);
        }, 5000);
    })
}

function renderMessage(parent, message) {
    if (message.time) {
        const time = document.createElement("p");
        time.className = "message-time";
        time.innerHTML = message.time;
        parent.querySelector("#messages-container").appendChild(time);
    }

    if (message.canSend == true) {
        parent.querySelector("#messages-text").innerHTML = `${message.text}`
        window.scrollTo(0, document.body.scrollHeight);
        return;
    }

    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (message.normal) {
        messageElement.classList.add("normal");
    } else {
        messageElement.classList.add("alt");
    }
    if (message.sender == "Spelaren") {
        messageElement.classList.add("player-message");
    } else {
        messageElement.classList.add("other-message");
    }
    parent.querySelector("#messages-container").appendChild(messageElement);

    messageElement.innerHTML = `<p class="message-text">${message.text}</p>`
}