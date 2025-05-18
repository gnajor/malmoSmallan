import { renderFooter } from "../../components/footer/footer.js";
import { progressionState } from "../../index.js";
import { pageHandler, pageState } from "../../pageHandler/pageHandler.js";

export function renderMessagesPage(parent, messages, sender) {
    parent.innerHTML = `<div id="messages-page">
                            <div id="messages-header"></div>
                            <main id="messages-main">
                                <div id="messages-container"></div>
                                <div id="messages-sender"></div>
                            </main>
                            <footer></footer>
                        </div>`;

    const lastMessage = messages[messages.length - 1];

    renderFooter(parent.querySelector("footer"));
    renderMessagesHeader(parent.querySelector("#messages-header"), sender);
    renderMessagesSender(parent.querySelector("#messages-main"), lastMessage);

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

    arrow.addEventListener("click", () => {
        pageHandler.handleMessageContactPageRender();
    });
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
    sendButton.classList.add("sendBtnInactive");
    sendButton.innerHTML = "<img src=\"../../media/messages-icon/sendArrow.svg\">";
    textBox.appendChild(sendButton);


    sendButton.addEventListener("click", () => {
        const audioEndCredits = new Audio("../../media/audio-files/endCreditsSong.mp3");
        if (text.textContent == "Minns bara att jag var med dig, sen minns jag inget." || text.textContent == "Så sjukt… vaknade precis upp på Möllan, tror jag hallucinerade.") {
            progressionState.isUnlocked("receive-first-message-notice", "userSentMessage");
            pageState.changeFriendMessageToNoSend();

            renderMessage(parent, { text: textBox.querySelector("#messages-text").innerHTML, sender: "Spelaren" });
            if (text.textContent == "Så sjukt… vaknade precis upp på Möllan, tror jag hallucinerade.") {
                text.innerHTML = "";
                progressionState.isUnlocked("ending", "userSentMessage");
                pageState.changeNormalMessageToNoSend();

                const messagePage = document.querySelector("#messages-page");
                messagePage.classList.add("ending");
                messagePage.addEventListener("transitionend", () => {
                    audioEndCredits.play();
                    pageHandler.handleEndCredits();
                })
                return;
            }

            text.innerHTML = "";

            const typingBubble = document.createElement("div");
            typingBubble.classList.add("message", "other-message", "typing-bubble");
            parent.querySelector("#messages-container").appendChild(typingBubble);

            for (let i = 0; i < 3; i++) {
                const dot = document.createElement("div");
                dot.classList.add("typingDot");
                typingBubble.appendChild(dot);
            }

            window.scrollTo(0, document.body.scrollHeight);

            const dots = typingBubble.querySelectorAll(".typingDot");
            let activeIndex = 0;
            setInterval(() => {
                dots.forEach(dot => dot.classList.remove("currentDot"));
                dots[activeIndex].classList.add("currentDot");
                activeIndex = (activeIndex + 1) % dots.length;
            }, 250);

            setTimeout(() => {
                typingBubble.remove();

                const reply = { ...lastMessage, canSend: false };
                renderMessage(parent, reply);
                window.scrollTo(0, document.body.scrollHeight);
            }, 5000);
        } else { return; }
    });
}

function renderMessage(parent, message) {
    if (message.time) {
        const time = document.createElement("p");
        time.className = "message-time";
        time.innerHTML = message.time;
        parent.querySelector("#messages-container").appendChild(time);
    }

    if (message.none) {
        return;
    }

    if (message.canSend == true) {
        const textBox = parent.querySelector("#messages-textbox");
        const textElement = parent.querySelector("#messages-text");
        textElement.innerHTML = "Tryck för att svara..";
        textElement.style.color = "#A9A8AD";
        textBox.addEventListener("click", () => {
            typeMessage(message)
        }, { once: true });
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

function typeMessage(message) {
    const textElement = document.querySelector("#messages-text");
    textElement.innerHTML = "";
    document.getElementById("messages-send-button").classList.remove("sendBtnInactive");
    textElement.style.color = "black";
    typeText(message.text, textElement);


    const textBox = document.querySelector("#messages-textbox");
    textBox.removeEventListener("click", typeMessage);
}

function typeText(text, element, delay = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }
    type();
}