import { startBackgroundWatcher } from "./logic/locationWatcher.js";
import { gameData } from "./pageHandler/gameData.js";
import { pageHandler, pageState } from "./pageHandler/pageHandler.js";

export const progressionState = {
    steps: [
        {
            id: "start-popup",
            state: {
                shown: false,
            }
        },
        {
            id: "receive-first-message-notice",
            state: {
                notified: false,
                messageAppUnlocked: false,
                pressed: false,
                userSentMessage: false,
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
                popup: false,
                tigerPopup: false,
            }
        }, 
        {
            id: "article-notification",
            state: {
                popup: false,
                articleAppUnlocked: false,
                pressed: false,
            }
        },
        {
            id: "call",
            state: {
                popup: false,
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
            id: "receive-position-dealer-notice",
            state: {
                notified: false,
                pressed: false
            }
        },
        {
            id: "triangle-gps",
            state: {
                gpsReached: false
            }
        },
        /* {
            id: "receive-change-position-dealer-notice",
            state: {
                notified: false,
                pressed: false,
            }
        }, */
/*         {
            id: "receive-second-dealer-notice",
            state: {
                notified: false,
                pressed: false,
            }
        }, */
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
            id: "receive-dealer-code-notice",
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
        state.setStateStorage("stepState", this.steps);
    },

    checkStateKey(step, key){
        const currentStep = this.steps.find(s => s.id === step);
        console.log(step, key)

        if(currentStep.state[key]){
            return true;
        }
        else{
            return false;
        }
    }
}

export const state = {
    startApp() {
        startBackgroundWatcher();

        if(!sessionStorage.getItem("stepState")){
            pageHandler.handleHomePageRender();
        }
        else{
            window.onload = () => {
                const beforePage = sessionStorage.getItem("beforePage");
                const currentPage = sessionStorage.getItem("currentPage");
                const currentExceptionPage = sessionStorage.getItem("currentExceptionPage");
                const newGameData = sessionStorage.getItem("gameData");
                const stepState = sessionStorage.getItem("stepState");
                
                if(currentExceptionPage)pageState.setCurrentExceptionPage(pageHandler[JSON.parse(currentExceptionPage)].bind(pageHandler));
                if(beforePage)pageState.setCurrentPage(pageHandler[JSON.parse(beforePage)].bind(pageHandler));
                if(newGameData)Object.assign(gameData, JSON.parse(newGameData));
                if(stepState)progressionState.steps = JSON.parse(stepState);
                
                //beforePage => messages
                //currentPage => findBag

                //beforePage => 

                if(progressionState.checkStateKey("call", "popup") && !progressionState.checkStateKey("call", "listened")){
                    pageState.currentExceptionPage();
                }
                
                else if(currentPage){
                    pageState.setBeforePage(pageHandler[JSON.parse(currentPage)].bind(pageHandler));
                    pageState.beforePage();
                }
            }
        }
    },

    setStateStorage(key, value){
        if(typeof value === "string"){
            if(value.includes("bound")){
                value = value.split(" ")[1];
            }
        }

        sessionStorage.setItem(key, JSON.stringify(value))
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

