import { renderFooter } from "../../components/footer/footer.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderPhonePage(parent, voiceMessages) {
    const srcWdIcons = "../../media/phone-icons/";

    parent.innerHTML = `<div id="phone-page">
                            <main>
                                <div id="phone-title">
                                    <h1>Röstmeddelanden</h1>
                                </div>
                                <div id="voicemessage-container">
                                    <div class="line"></div>
                                </div>
                            </main>
                            <nav>
                                <a id="latest">
                                    <img src="${srcWdIcons}clock.svg">
                                    <span>Senaste</span>
                                </a>
                                <a id="contact">
                                    <img src="${srcWdIcons}user.svg">
                                    <span>Kontakter</span>
                                </a>
                                <a id="keypad">
                                    <img src="${srcWdIcons}keypad.svg">
                                    <span>Knappsats</span>
                                </a>
                                <a id="voicemail">
                                    <img src="${srcWdIcons}voicemail.svg">
                                    <span>Röstbrevlåda</span>
                                </a>
                            </nav>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));

    const latestAnchor = parent.querySelector("a#latest");
    const contactAnchor = parent.querySelector("a#contact");
    const keypadAnchor = parent.querySelector("a#keypad");
    const voicemailAnchor = parent.querySelector("a#voicemail");

    latestAnchor.addEventListener("click", () => "");
    contactAnchor.addEventListener("click", () => "");
    keypadAnchor.addEventListener("click", () => "");
    voicemailAnchor.addEventListener("click", () => "");

    if (voiceMessages.length === 0) {
        return;
    }

    for (const voiceMessage of voiceMessages) {
        new Voicemessage(
            parent.querySelector("#voicemessage-container"),
            voiceMessage
        );
    }
}

let intervalId;
class Voicemessage {
    constructor(parent, voicemessageData) {
        this.parent = parent;
        this.voicemessageData = voicemessageData;
        this.srcWdIcons = "../../media/phone-icons/";
        this.element = null;
        this.audioElement = null;
        this.render();
    }

    render() {
        const voiceMessageBox = document.createElement("div");
        this.element = voiceMessageBox;
        voiceMessageBox.className = "voicemessage";
        this.parent.appendChild(voiceMessageBox);

        voiceMessageBox.innerHTML = `<div class="left">
                                        <span>${this.voicemessageData.caller}</span>
                                        <div class="play">
                                            <img src="${this.srcWdIcons}play.svg">
                                            <span>Spela upp</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <span class="date">${this.voicemessageData.date}</span>
                                        <span class="time">00:12</span>     
                                    </div>`;

        const audioMessage = new Audio("../../media/audio-files/decryptedCall.mp3");
        const timeElement = this.element.querySelector(".time");

        const playDiv = this.element.querySelector(".play");
        const playImg = playDiv.querySelector("img");
        const playText = playDiv.querySelector("span");

        let isPlaying = false;

        this.element.addEventListener("click", () => {
            if (!isPlaying) {
                audioMessage.play();
                playImg.src = `${this.srcWdIcons}pause.svg`;
                playText.textContent = "Pausa";
                isPlaying = true;

                intervalId = setInterval(() => {
                    const seconds = Math.floor(audioMessage.currentTime);
                    const minutes = Math.floor(seconds / 60);
                    const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
                    const formattedMinutes = minutes.toString().padStart(2, "0");
                    timeElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
                }, 1000);
            } else {
                audioMessage.pause();
                playImg.src = `${this.srcWdIcons}play.svg`;
                playText.textContent = "Spela upp";
                isPlaying = false;

                clearInterval(intervalId);
            }
        });

        audioMessage.addEventListener("ended", () => {
            const playDiv = document.querySelector(".play");
            const playImg = playDiv.querySelector("img");
            const playText = playDiv.querySelector("span");

            playImg.src = `../../media/phone-icons/play.svg`;
            playText.textContent = "Spela upp";
            isPlaying = false;
            clearInterval(intervalId);
            pageHandler.handleDealerNotificationRender();
        })

        const boxLine = document.createElement("div");
        boxLine.className = "line";
        this.parent.appendChild(boxLine);
    }
}