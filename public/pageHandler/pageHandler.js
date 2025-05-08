import { renderBankPage } from "../pages/bankPage/bankPage.js";
import { renderCallPage } from "../pages/callPage/callPage.js";
import { renderHomePage } from "../pages/homePage/homePage.js"
import { renderMapPage } from "../pages/mapPage/mapPage.js";
import { renderMessagesContactPage } from "../pages/messagesContact/messagesContact.js";
import { renderMessagesPage } from "../pages/messagesPage/messages.js";
import { renderNewsPage } from "../pages/newsPage/newsPage.js";
import { renderNotesPage } from "../pages/notesPage/notesPage.js";
import { renderSpecifikNotesPage } from "../pages/notesPage/specifikNotesPage.js";
import { renderPhonePage } from "../pages/phonePage/phonePage.js";
import { progressionState } from "../index.js";
import { gameData } from "./gameData.js";
import { renderNotification } from "../components/footer/notification.js";
import { renderIphonePopUp } from "../components/footer/iphonePopUp.js";


export const pageState = {
    beforePage: null,
    currentPage: null,
    appsUnlocked: ["DegBanken"],

    setAppUnlocked(appName){
        this.appsUnlocked.push(appName);
        this.changeAppData();
    },

    changeAppData(){
        for(const appUnlocked of this.appsUnlocked){
            const foundApp = gameData.apps.find(app => app.name === appUnlocked); 
            foundApp.locked = false;
        }
    },

    setCurrentPage(func){
        this.currentPage = func;
    }
}

export const pageHandler = {
    parent: document.querySelector("#wrapper"),
    
    handleHomePageRender(){
        if(progressionState.checkStateKey("start-popup", "shown")){
            renderHomePage(this.parent, gameData.apps, true);
        }
        else{
            renderHomePage(this.parent, gameData.apps);
        }
    },

    handleMessagesPageRender(){
        pageState.setCurrentPage(renderMessagesPage);
        renderMessagesPage(this.parent, gameData.friendMessages, gameData.friendMessages[1].sender);
    },

    handleSpecificNotesPageRender(completed){
        pageState.setCurrentPage(renderSpecifikNotesPage);
        renderSpecifikNotesPage(this.parent, gameData.notesMinigame, completed);
    },

    handleCallPageRender(){
        pageState.setCurrentPage(renderCallPage);
        renderCallPage(this.parent, gameData.phoneCallers.nameLess);
    },

    handleBankPageRender(){
        pageState.setCurrentPage(renderBankPage);
        if(progressionState.checkStateKey("start-popup", "shown")){
            renderBankPage(this.parent, gameData.transactions);

            setTimeout(() => {
                renderNotification(
                    this.parent, 
                    "sms", 
                    "Alex",
                    "Vad fan hände med dig igår?", 
                    pageHandler.handleMessagesPageRender.bind(this)
                );
                pageState.setAppUnlocked("Meddelanden");
            }, 3000);
        }

/*         if(progressionState.currentStage === "start" && progressionState.currentStageState === "messageNotification"){
            renderBankPage(this.parent, gameData.transactions);
        }

        else if(progressionState.currentStage === "market"  && progressionState.currentStageState === "paymentNotifaction"){
            renderBankPage(this.parent, gameData.transactions);
            setTimeout(() => {
                renderNotification(
                    this.parent,
                    "sms",
                    "Knarklangare",
                    "Jag ångrade mig, ge mig mina pengar nu!! Mitt nummer är Möllevångstorgets staty, bussen och Indian express. ",
                    () => {
                        pageHandler.handleMessagesPageRender();
                    }
                );
            }, 3000);
        }
        else{
            renderBankPage(this.parent, gameData.transactions);
        } */

    },

    handleMessageContactPageRender(){
        pageState.setCurrentPage(renderMessagesContactPage);
        const lastMessage = [gameData.friendMessages[gameData.friendMessages.length - 1]];
        renderMessagesContactPage(this.parent, lastMessage);
    },

    handleNewsPageRender(){
        pageState.setCurrentPage(renderNewsPage);
        renderNewsPage(this.parent, gameData.news);

/*         if(progressionState.currentStageState === "articleNotification"){
            renderNewsPage(this.parent, gameData.news);

            setTimeout(() => {
                this.handleCallPageRender();
                pageState.setAppUnlocked("Telefon");
            }, 20000);
        }
        else{
            renderNewsPage(this.parent, gameData.news);
        } */
    },

    handleMapPageRender(){
        pageState.setCurrentPage(renderMapPage);
        renderMapPage(this.parent, gameData.mapCords[progressionState.currentStage].coords);
        progressionState.makeGpsProgress();
    },

    handlePhonePageRender(){
        pageState.setCurrentPage(renderPhonePage);
        renderPhonePage(this.parent, gameData.voicemessages);
    },

    handleNotesPageRender(){
        pageState.setCurrentPage(renderNotesPage);
/*         
        if(progressionState.currentStageState === "notesAppUnlocked"){
            renderNotesPage(
                this.parent,
                gameData.notes
            );
        }

        else if(progressionState.progression.triangle.state.notesMiniGameDone){
            renderNotesPage(
                this.parent,
                gameData.notes
            );
        } */

        renderNotesPage(
            this.parent,
            gameData.notes
        );
    },
    
    handleFindBagRender(){
        this.parent.innerHTML = "";
        renderIphonePopUp(this.parent, "findBag");
    },

    handleDecryptCallRender(){
        renderIphonePopUp(this.parent, "phoneCall");
    },

    handleDrugDealerSmsNotificationRender(){
        renderNotification(
            this.parent, 
            "sms", 
            "Knarklangare", 
            "Det är för mycket folk. Jag skriver var vi möts istället.", 
            () => {
                this.handleMessagesPageRender();
            }
        );
    },

    handlePaymentNotificationRender(){
        renderNotification(
            this.parent,
            "bank",
            "+10 000kr",
            "Tack så mycket för att du hittade min tiger.",
            () => {
                this.handleBankPageRender();
            }
        );
    },

    handleBeforePageRender(){
        this.handleHomePageRender();
/*         if(progressionState.currentStageState === "articleNotification"){
            pageState.setAppUnlocked("Malmöbladet");
            this.handleHomePageRender();

            setTimeout(() => {
                renderNotification(
                    this.parent, 
                    "news", 
                    "Just Nu", 
                    "Möllantigern stulen - Ägaren erbjuder hittelön",
                    () => {
                        this.handleNewsPageRender();
                    }
                );
            }, 30000);
        }
        else if(progressionState.currentStageState === "decryptPhoneCallPopUp"){
            pageHandler.handleDecryptCallRender();  
        }

        else{
            this.handleHomePageRender();
        } */
    }
}