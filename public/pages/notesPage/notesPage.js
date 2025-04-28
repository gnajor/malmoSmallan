import {renderFooter} from "../../components/footer/footer.js"; 

export function renderNotesPage(parent, notes){
    const srcWdIcon = "../../media/note-icons/"

    parent.innerHTML = `<div id="notes-page">
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
                                <h1>VELDGT VIKIGT</h1>
                                <div id="notes-minigames-container"></div>
                            </main>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));

    for(const note of notes){
        new notesMinigame(
            parent.querySelector("#notes-minigames-container"),
            note.rightWord,
            note.scrambledWord
        );
    }
}


class notesMinigame{
    constructor(parent, rightWord, scrambledWord){
        this.parent = parent;
        this.rightWord = rightWord;
        this.scrambledWord = scrambledWord;
        this.render();
    }

    render(){  
        const notesMinigame = document.createElement("div");
        notesMinigame.className = "notes-mini-game";
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
    
            this.checkIfMiniGameDone();
        });
    }

    setNextIndexFocus(parent, inputIndex){
        const allInputs = parent.querySelectorAll("input")

        if(allInputs[inputIndex + 1]){
            const nextInput = allInputs[inputIndex + 1];
            nextInput.focus(); 
        } 
    }

    checkIfMiniGameDone(){
        const inputs = this.parent.querySelectorAll("input");

        for(let i = 0; i < inputs.length; i++){
            const element = inputs[i];
            
            if(element.classList[1] !== "done"){
                return false;
            }
        }

        this.onMiniGameComplete()
    }

    onMiniGameComplete(){
        const inputs = this.shuffle(this.parent.querySelectorAll("input"));
        const amountSameTime = 7;
        let counter = 0;
        let newAmountSameTime = amountSameTime;

        for(let i = 0; i < inputs.length/amountSameTime; i++){
            const startValue = 120;
            const increase = i * 200;

            if((inputs.length) % amountSameTime === inputs.length - (i * amountSameTime)){
                newAmountSameTime = (inputs.length % amountSameTime);
            }

            for(let y = 0; y < newAmountSameTime; y++){

                const input = inputs[counter];
                input.style.transition = `left 2000ms ease-in-out ${increase}ms`;
                input.style.left = `${startValue - i}vw`;
    
                if((inputs.length) % amountSameTime === inputs.length - (i * amountSameTime)){
                    input.addEventListener("transitionend", (event) => {
                        this.containerAnimation();
                        

                    }, {once: true});
                }
                counter++;
            }  
        }
    }

    containerAnimation(){
        const wordInputContainer = this.parent.querySelectorAll(".word-input-container");

        wordInputContainer.forEach(element => {
            element.classList.add("no-height");
            element.addEventListener("transitionend", () => {
                setTimeout(() => {
                    element.remove();
                }, 1000);
            }, {once: true});
        });
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

