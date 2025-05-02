import {renderFooter} from "../../components/footer/footer.js"; 
import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderSpecifikNotesPage(parent, notes, completed = false){
    const srcWdIcon = "../../media/note-icons/"

    parent.innerHTML = `<div id="note-specific-page">
                            <header>
                                <a id="notes-back-button">
                                    <img src="${srcWdIcon}back-icon.svg">
                                    <span>Anteckningar</span>
                                </a>
                                <a id="favourite-button">
                                    <span>Favorit</span>
                                    <img src="${srcWdIcon}star.svg">
                                </a>
                            </header>
                            <main>
                                <h1>veldgt vikigt!!</h1>
                                <div id="notes-minigames-container"></div>
                            </main>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));

 
    const minigames = [];

    for(const note of notes){
        const minigame = new notesMinigame(
            parent.querySelector("#notes-minigames-container"),
            note.rightWord,
            note.scrambledWord,
            checkIfMiniGamesDone
        )

        if(completed){
            minigame.completed();
        }

        minigames.push(minigame);
    }

    parent.querySelector("#notes-back-button").addEventListener("click", (event) => {
        const page = parent.querySelector("#note-specific-page");

        page.classList.add("animationStart");
        page.addEventListener("transitionend", () => {
            pageHandler.handleNotesPageRender();
        }, {once: true});
    });

    function checkIfMiniGamesDone(){
        const inputs = parent.querySelector("#notes-minigames-container").querySelectorAll("input");

        for(let i = 0; i < inputs.length; i++){
            const element = inputs[i];
            
            if(element.classList[1] !== "done"){
                return;
            }
        }

        for(const minigame of minigames){
            minigame.onMiniGameComplete();
        }
    }
}


class notesMinigame{
    constructor(parent, rightWord, scrambledWord, checkIfMiniGamesDone){
        this.parent = parent;
        this.element = null;
        this.container = null;
        this.rightWord = rightWord;
        this.checkIfMiniGamesDone = checkIfMiniGamesDone;
        this.scrambledWord = scrambledWord;
        this.render();
    }

    render(){  
        const notesMinigame = document.createElement("div");
        notesMinigame.className = "notes-mini-game";
        this.container = notesMinigame;
        this.element = notesMinigame;
        this.parent.appendChild(notesMinigame);
    
        notesMinigame.innerHTML = `<h2 class="word-title">${this.scrambledWord}</h2>
                                   <div class="word-input-container"></div>`;
    
        const wordInputContainer = notesMinigame.querySelector(".word-input-container");

        let wordDiv = document.createElement("div");
        wordDiv.className = "word";
        wordInputContainer.appendChild(wordDiv);
    
        let counter = 0;
        for(let i = 0; i < this.rightWord.length; i++){
            const letter = this.rightWord[i];
    
            if(letter === " "){
                wordDiv = document.createElement("div");
                wordDiv.className = "word";
                wordInputContainer.appendChild(wordDiv);
                counter--;
            }
            else{
                this.renderInput(wordDiv, letter, counter);
            }
            counter++;
        }

        this.setHeight(wordInputContainer);
    }

    renderInput(parent, rightLetter, inputIndex){
        const inputDom = document.createElement("input");
        inputDom.setAttribute("minlength", "1");
        inputDom.setAttribute("maxlength", "1");
        inputDom.className = "letter-input";

        parent.appendChild(inputDom);
    
        inputDom.addEventListener("keyup", (event) => {
            if(event.target.value.toLowerCase() === rightLetter.toLowerCase()){
                inputDom.classList.add("done");
                inputDom.classList.remove("wrong");
                this.setNextIndexFocus(parent.parentElement, inputIndex);
            }
            else{
                inputDom.classList.remove("done");
                inputDom.classList.add("wrong");
            }
    
            this.checkIfMiniGamesDone();
        });
    }

    setNextIndexFocus(parent, inputIndex){
        const allInputs = parent.querySelectorAll("input")

        if(allInputs[inputIndex + 1]){
            const nextInput = allInputs[inputIndex + 1];
            nextInput.focus(); 
        } 
    }

    onMiniGameComplete(){
        const wordTitle = this.element.querySelector(".word-title");
        wordTitle.classList.add("move");
        wordTitle.addEventListener("transitionend", () => {
            wordTitle.textContent = this.rightWord;
        }, {once: true});  


        const inputs = this.shuffle(this.element.querySelectorAll("input"));

        const amountSameTime = 7;
        let counter = 0;
        let newAmountSameTime = amountSameTime;

        for(let i = 0; i < inputs.length/amountSameTime; i++){
            const startValue = 120;
            const increase = i * 350;

            if((inputs.length) % amountSameTime === inputs.length - (i * amountSameTime)){
                newAmountSameTime = (inputs.length % amountSameTime);
            }

            for(let y = 0; y < newAmountSameTime; y++){

                const input = inputs[counter];
                input.style.transition = `left 2000ms ease-in-out ${increase}ms`;
                input.style.left = `${startValue - i}vw`;
    
                if((inputs.length) % amountSameTime === newAmountSameTime && y === newAmountSameTime - 1){
                    input.addEventListener("transitionend", (event) => {
                        wordTitle.classList.remove("move");  
                        wordTitle.addEventListener("transitionend", () => {this.containerAnimation();}, {once: true});  
                    }, {once: true});
                }
                counter++;
            }  
        }
    }
    //height animation left
    containerAnimation(){
        this.parent.classList.add("smaller-gap")
        const wordInputContainer = this.element.querySelector(".word-input-container");
        wordInputContainer.style.height = "0px";
        wordInputContainer.addEventListener("transitionend", () => {
            setTimeout(() => {
                wordInputContainer.remove();
            }, 1000);
        }, {once: true});
    }
    
    completed(){
        this.element.querySelector(".word-title").textContent = this.rightWord;
        this.element.querySelector(".word-input-container").remove();
        this.parent.classList.add("smaller-gap-no-animation");
    }

    setHeight(element){
        element.style.height = element.offsetHeight + "px";
    }

    getRandomInt(max){
        return Math.floor(Math.random() * max);
    }

    shuffle(array){
        const newArray = [];
        const result = [];

        array.forEach(element => {
            newArray.push(element);
        });

        for(let i = 0; newArray.length; i++){
            const randomInt = this.getRandomInt(newArray.length);
            result.push(newArray[randomInt]);
            newArray.splice(randomInt, 1);
        }

        return result;
    }    
}

