import { pageHandler } from "./pageHandler/pageHandler.js";

export const progressionState = {
    currentStage: "start",
    currentStageState: "startPopUp",
    progression: {
        start: {
            state: {
                startPopUp: false,
                //bankAppUnlocked: false,
                messageNotification: false,
                //messageAppUnlocked: false,
                userMessageSent: false,
            }
        },
        park: {  
            state: {
                findObject: false,
                foundObject: false,
                tigerPopUp: false,
                articleNotification: false,
                articleRead: false,
                calling: false,
                phoneAppUnlocked: false,
                decryptPhoneCallPopUp: false,
                countingStepsPopUp: false,
                decryptCompletePopUp: false,
                phoneAppDecryptedCall: false,
            }
        },
        triangle: {
            state: {
                gps: false,
                messageNotification: false,
                drugDealerConvo: false,
                notesAppUnlocked: false,
                notesMiniGameDone:false,
            }
        },
        market: {
            state: {
                gps: false,
                swishNotifaction: false,
                bankAppSwished: false,
                messageNotification: false,
            }
        },

        ending: {
            state: {
                messageNotification: false,
                findNumberMinigame: false,
                bankAppCorrectNumber: false,
                blueAndRedAnimation: false,
            }
        },

        afterEnding: {
            state: {
                messagesNormal: false,
                credits: false
            }
        }
    },

    makeProgress(){
        const keys = Object.keys(this.progression);
        const currentObject = this.progression[this.currentStage];
        const index = keys.indexOf(this.currentStage);
        const stateKeys = Object.keys(currentObject.state);

        for(let i = 0; i < stateKeys.length; i++){
            const stateKey = stateKeys[i];
            const currentValue = currentObject.state[stateKey];

            if(i === stateKeys.length - 1){
                this.currentStage = keys[index + 1];
            }

            if(currentValue === true){
                continue;
            }

            else{
                this.currentStageState = stateKeys[i + 1];
                currentObject.state[stateKey] = true;
                return;
            }
        } 
    },

    makeGpsProgress(){
        this.progression[this.currentStage].state.gps = true;
    }
}

export const state = {
    startApp() {
        pageHandler.handleHomePageRender();
    },

    setCurrentPage(renderFunc) {
        this.currentPage = renderFunc;
    },

    setBeforePage(renderFunc) {
        this.beforePage = renderFunc;
    }
}

state.startApp();

// renderIphonePopUp(document.querySelector("#wrapper"), 'other', 'Fel', 'Felmeddelande', 'Stäng');
// renderNotification(document.querySelector("#wrapper"), 'sms', 'Alex', 'Vad fan hände med dig igår?');
/* pageHandler.handleNotesPageRender(); */
/* pageHandler.handleHomePageRender(); */

/* renderNewsPage(document.querySelector("#wrapper"), [
    "Man efterlyst för grov narkotikahandel - Sågs senast vid Möllevångstorget",
    "Malmöbo vägrade lämna cykelbanan - bott där i tre veckor",
    "Man sålde olagliga svampar - utgav sig för att vara torghandlare"
]); */

