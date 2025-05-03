import { renderFooter } from "../../components/footer/footer.js";

export function renderPhonePage(parent, voiceMessages){
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


    for(const voiceMessage of voiceMessages){
        new Voicemessage(
            parent.querySelector("#voicemessage-container"),
            voiceMessage,
            true
        );
        
        console.log(voiceMessage)
    }
}

class Voicemessage{
    constructor(parent, voicemessageData, decrypted){
        this.parent = parent;
        this.voicemessageData = voicemessageData;
        this.srcWdIcons = "../../media/phone-icons/";
        this.decrypted = decrypted;
        this.element = null;
        this.audioElement = null;
        this.render();
    }

    render(){
        const voiceMessageBox = document.createElement("div");
        this.element = voiceMessageBox;
        voiceMessageBox.className = "voicemessage";
        this.parent.appendChild(voiceMessageBox);

        voiceMessageBox.innerHTML =`<div class="left">
                                        <span>${this.voicemessageData.caller}</span>
                                        <div class="play">
                                            <img src="${this.srcWdIcons}play.svg">
                                            <span>Spela upp</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <span class="date">${this.voicemessageData.date}</span>
                                        <span class="time">${this.voicemessageData.time}</span>     
                                    </div>`;

        const boxLine = document.createElement("div");
        boxLine.className = "line";
        this.parent.appendChild(boxLine);
        let audioMessage = new Audio(this.element, "../../media/audio-files/cryptedCall.mp3", "encryptedMessage");


        if(!this.decrypted){
            audioMessage = new Audio(this.element, "../../media/audio-files/cryptedCall.mp3", "encryptedMessage");
        }

        this.element.addEventListener("click", () => {
            audioMessage.play();
        });
    } 
}

class Audio{
    constructor(parent, src, id){
        this.src = src;
        this.parent = parent;
        this.id = id;
        this.audioElement = null;
        this.render();
    }

    render(){
        const audioElement = document.createElement("audio");
        this.audioElement = audioElement;
        audioElement.id = this.id;
        this.parent.appendChild(audioElement);

        audioElement.innerHTML = `<source src="${this.src}" type="audio/mpeg">
                                "Your browser does not support the audio element"`; 
    }

    addOnEndListener(func){
        this.audioElement.addEventListener("ended", func);
    }
    
    pause(){
        this.audioElement.pause();
    }

    play(){
        this.audioElement.play();
    }
}