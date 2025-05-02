export function renderPhonePage(parent, voiceMessages){
    const srcWdIcons = "../../media/phone-icons/";

    parent.innerHTML = `<div id="phone-page">
                            <main>
                                <div id="phone-title">
                                    <h1>Röstmeddelanden</h1>
                                </div>
                                <div id="voicemessage-container"></div>
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


    const latestAnchor = parent.querySelector("a#latest"); 
    const contactAnchor = parent.querySelector("a#contact"); 
    const keypadAnchor = parent.querySelector("a#keypad"); 
    const voicemailAnchor = parent.querySelector("a#voicemail"); 

    latestAnchor.addEventListener("click", () => "");
    contactAnchor.addEventListener("click", () => "");
    keypadAnchor.addEventListener("click", () => "");
    voicemailAnchor.addEventListener("click", () => "");


    for(const voiceMessage of voiceMessages){
        renderVoiceMessageBox(
            parent.querySelector("#voicemessage-container"),
            voiceMessage
        );
    }
}


function renderVoiceMessageBox(parent, voiceMessage){
    const voiceMessageBox = document.createElement("div");
    voiceMessageBox.className = "voiceMessage";
    parent.appendChild(voiceMessageBox);

    voiceMessageBox.innerHTML =`<hr>
                                <div class="left">
                                    <span>${voiceMessage.caller}</span>
                                    <div>
                                        <img src="">
                                        <span>Spela upp</span>
                                    </div>
                                </div>
                                <div class="right">
                                    <span id="date">${voiceMessage.date}</span>
                                    <span id="time">${voiceMessage.time}</span>     
                                </div>
                                <hr>`;
}