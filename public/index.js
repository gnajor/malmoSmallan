import { startBackgroundWatcher } from "./logic/locationWatcher.js";
import { pageHandler } from "./pageHandler/pageHandler.js";

export const progressionState = {
    steps: [
        {
            id: "start-popup",
            state: {
                shown: true,
            }
        },
        {
            id: "receive-first-message-notice",
            state: {
                notified: false,
                messageAppUnlocked: false,
                pressed: false,
                messageSentBack: false,
            }
        },
        {
            id: "park-gps",
            state: {
                gpsReached: false,
            }
        },
        {
            id: "tiger-find-minigame",
            state: {
                popUp: false,
                tigerPopUp: false,
            }
        }, 
        {
            id: "article-notification",
            state: {
                popUp: false,
                articleAppUnlocked: false,
                pressed: false,
            }
        },
        {
            id: "call",
            state: {
                listened: false,
            }
        },
        {
            id: "decryptCall",
            state: {
                decryptedCall: false,
                phoneAppUnlocked: false,
            }
        },
        {
            id: "receive-first-dealer-notice",
            state: {
                notified: false,
                pressed: false,
            }
        },
        {
            id: "traingle-gps",
            state: {
                gpsReached: false
            }
        },
        {
            id: "receive-second-dealer-notice",
            state: {
                notified: false,
                pressed: false,
            }
        },
        {   
            id: "notes-minigame",
            state: {
                notesAppUnlocked: false,
                notesMinigameCompleted: false,
            }
        },
        {
            id: "market-gps",
            state: {
                gpsReached: false,
            }
        },
        {
            id: "receive-payment-notice",
            state: {
                notified: false,
                pressed: false,
            }
        },
        {
            id: "receive-third-dealer-notice",
            state: {
                notified: false,
                pressed: false,
            }
        },
        {
            id: "bank-app-ending",
            state: {
                notified: false,
                pressed: false,
            }
        },
        {
            id: "ending",
            state: {
                messagesNormal: false,
            }
        },
        {
            id: "end-credits",
            state: {
                start: false,
            }
        }
    ],
    
    isUnlocked(step, key){
        const currentStep = this.steps.find(s => s.id === step);
        currentStep.state[key] = true;
    },

    checkStateKey(step, key){
        const currentStep = this.steps.find(s => s.id === step).state;

        if(currentStep[key]){
            return true
        }
        return false
    }
}

export const state = {
    startApp() {
        pageHandler.handleHomePageRender();
        /* startBackgroundWatcher(); */
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

