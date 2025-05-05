import { renderFooter } from "../../components/footer/footer.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderCallPage(parent, caller){
    const srcWdIcons = "../../media/call-icons/";
    const srcWdAudio = "../../media/audio-files/";

    parent.innerHTML = `<div id="call-page">
                            <main>
                                <div id="caller-box">
                                    <h2>${caller}</h2>
                                    <span>Inkommande Samtal</span>
                                    <div id="timer-container"></div>
                                </div>
                                <div id="answer-decline-box">
                                    <button id="answer-call">
                                        <img src="${srcWdIcons}answer-call.svg" alt="answer call button">
                                        <span>Svara</span>
                                    </button>
                                    <button id="decline-call">
                                        <img src="${srcWdIcons}decline-call.svg" alt="decline call button">
                                        <span>Lägg på</span>
                                    </button>
                                </div>
                            </main>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));

    const answerButton = parent.querySelector("#answer-call");
    const declineButton = parent.querySelector("#decline-call");
    const answerDeclineBox = parent.querySelector("#answer-decline-box");
    const main = document.querySelector("main");
    const secTitle = parent.querySelector("#caller-box span");
    const animationTimeString = window.getComputedStyle(main).transitionDuration;
    const halfAnimationTime = Number(animationTimeString.substring(0, animationTimeString.length - 1)) * 1000 / 2;

    const timer = new Timer(parent.querySelector("#timer-container"));
    const ringtone = new Audio(main, srcWdAudio + "ringtone.mp3", "ringtone");
    ringtone.play();
    ringtone.addOnEndListener((event) => {
        pageHandler.handleBeforePageRender();

        setTimeout(() => {
            renderCallPage(parent, caller);
        }, 5000);
    });

    const cryptedCall = new Audio(main, srcWdAudio + "cryptedCall.mp3", "crypted-call");
    cryptedCall.addOnEndListener((event) => {
        timer.stop();
        main.classList.add("rotate-again");

        setTimeout(() => {
            declineButton.remove();
            secTitle.classList.remove("gone");
            timer.remove();
            secTitle.textContent = "call ended";

            setTimeout(() => {
                pageHandler.handleBeforePageRender();
                pageHandler.handleProgression();
            }, 1000);

        }, halfAnimationTime);
    });

    answerButton.addEventListener("click", () => {
        main.className = "rotate";
        answerDeclineBox.className = "answered";

        timer.start();
        cryptedCall.play();
        ringtone.pause();

        setTimeout(() => {
            secTitle.classList.add("gone");
            timer.changeTime("00:00");
        }, halfAnimationTime);
    });

    declineButton.addEventListener("click", () => {
        timer.stop();
        cryptedCall.pause();

        pageHandler.handleBeforePageRender();

        setTimeout(() => {
            renderCallPage(parent, caller);
        }, 5000);
    });
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

class Timer{
    constructor(parent){
        this.parent = parent;
        this.counter = 0;
        this.time = undefined;
        this.timerId = undefined;
        this.element = null;
        this.render();
    }

    render(){
        const timer = document.createElement("div");
        this.element = timer;
        timer.className = "timer";
        this.parent.appendChild(timer);
    }

    start(){
        this.timerId = setInterval(() => {
            this.counter++;
            this.time = this.makeIntoMinutes(this.counter);
            this.changeTime();
        }, 1000);
    }

    stop(){
        clearInterval(this.timerId);
        return this.time;
    }

    makeIntoMinutes(counter){
        let seconds = counter % 60;
        const num = (counter / 60).toString();
        let minutes = num.substring(0, 1);

        if(num > 9){
            minutes = num.substring(0, 2);
        }
        else{
            minutes = "0" + minutes;
        }

        if(seconds < 9){
            seconds = "0" + seconds; 
        }

        return `${minutes}:${seconds}`;
    }

    changeTime(time = 0){
        if(time){
            this.element.textContent = time;
        }
        else{
            this.element.textContent = this.time;
        }
    }

    remove(){
        this.element.remove();
    }
}