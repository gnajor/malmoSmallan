import { startBackgroundWatcher } from "./logic/locationWatcher.js";
import { pageHandler } from "./pageHandler/pageHandler.js";

export const progressionState = {
    currentStage: "triangle",
    currentStageState: "gps",
    progression: {
        start: {
            state: {
                startPopUp: false,
                //gps: true
                //bankAppUnlocked: true,
                messageNotification: true,
                //messageAppUnlocked: true,
                userMessageSent: true,
            }
        },
        park: {
            state: {
                gps: true,
                //objectPopUp: true,
                foundObject: true,
                tigerPopUp: true,
                articleNotification: true,
                articleRead: true,
                calling: true,
                listenedToPhoneCall: true,
                decryptPhoneCallPopUp: true,
                countingStepsPopUp: true,
                decryptCompletePopUp: true,
                phoneAppDecryptedCall: true,
            }
        },
        triangle: {
            state: {
                gps: false,
                messageNotification: false,
                drugDealerConvo: false,
                notesAppUnlocked: false,
                notesMiniGameDone: false,
            }
        },
        market: {
            state: {
                gps: false,
                paymentNotifaction: false,
                messageNotification: false,
            }
        },

        ending: {
            state: {
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

    makeProgress() {
        const keys = Object.keys(this.progression);
        const currentObject = this.progression[this.currentStage];
        const index = keys.indexOf(this.currentStage);
        const stateKeys = Object.keys(currentObject.state);

        const nextKey = keys[index + 1];
        const nextStage = this.progression[nextKey].state;
        const nextStageKey = Object.keys(nextStage)[0];

        for(let i = 0; i < stateKeys.length; i++){
            const stateKey = stateKeys[i];
            const currentValue = currentObject.state[stateKey];

            if (i === stateKeys.length - 1) {
                this.currentStage = keys[index + 1];
            }

            if (currentValue === true) {
                continue;
            }

            else{
                if(!stateKeys[i + 1]){
                    this.currentStageState = nextStageKey;
                }
                else{
                    this.currentStageState = stateKeys[i + 1];
                }
                currentObject.state[stateKey] = true;
                return;
            }
        }
    },

    makeGpsProgress() {
        this.progression[this.currentStage].state.gps = true;
    }
}

export const state = {
    startApp() {
        pageHandler.handleHomePageRender();
        startBackgroundWatcher();
    },

    setCurrentPage(renderFunc) {
        this.currentPage = renderFunc;
    },

    setBeforePage(renderFunc) {
        this.beforePage = renderFunc;
    }
}

state.startApp();

/* pageHandler.handleNotesPageRender(); */



// renderIphonePopUp(document.querySelector("#wrapper"), 'other', 'Fel', 'Felmeddelande', 'Stäng');
// renderNotification(document.querySelector("#wrapper"), 'sms', 'Alex', 'Vad fan hände med dig igår?');
/* pageHandler.handleNotesPageRender(); */
/* pageHandler.handleHomePageRender(); */

/* renderNewsPage(document.querySelector("#wrapper"), [
    "Man efterlyst för grov narkotikahandel - Sågs senast vid Möllevångstorget",
    "Malmöbo vägrade lämna cykelbanan - bott där i tre veckor",
    "Man sålde olagliga svampar - utgav sig för att vara torghandlare"
]); */

