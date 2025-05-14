import { renderFooter } from "../../components/footer/footer.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

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
            voiceMessage
        );
    }
}

class Voicemessage{
    constructor(parent, voicemessageData){
        this.parent = parent;
        this.voicemessageData = voicemessageData;
        this.srcWdIcons = "../../media/phone-icons/";
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
                                        <span class="time">00:12</span>     
                                    </div>`;

        const audioMessage = new Audio(this.element, "../../media/audio-files/decryptedCall.mp3", "encryptedMessage");
        const timeElement = this.element.querySelector(".time");

        this.element.addEventListener("click", () => {
            audioMessage.play();

            let counter = 1;
            timeElement.textContent = "00:00";

            const intervalId = setInterval(() => {
                timeElement.textContent = audioMessage.makeIntoMinutes(counter);
                counter++

                const currentTime = audioMessage.getCurrentTime();

                if(currentTime === audioMessage.getDuration()){
                    clearInterval(intervalId);
                }
            }, 1000)
        });

        audioMessage.addOnEndListener(() => {  
            pageHandler.handleDealerNotificationRender();
        });

        const boxLine = document.createElement("div");
        boxLine.className = "line";
        this.parent.appendChild(boxLine);
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
/*         audioElement.setAttribute("controls", true) */

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

    getCurrentTime(){
        return this.audioElement.currentTime;
    }

    getDuration(){
       return this.audioElement.duration; 
    }

    makeIntoMinutes(inputSeconds){
        let seconds = inputSeconds % 60;
        const num = (inputSeconds / 60).toString();
        let minutes = num.substring(0, 1);

        if(num >= 9){
            minutes = num.substring(0, 2);
        }
        else{
            minutes = "0" + minutes;
        }

        if(seconds <= 9){
            seconds = "0" + seconds; 
        }

        return `${minutes}:${seconds}`;
    }
}

