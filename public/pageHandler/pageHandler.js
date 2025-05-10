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
    currentExceptionPage: null,
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

    changeMessageToPerm(){
        for(const message of gameData.friendMessages){
            if(message.canSend){
                message.canSend = false;
            }

            if(message.none){
                return;
            }
        }

        gameData.friendMessages.push({none: true});
    },

    setCurrentPage(func){
        this.currentPage = func;
    },

    setBeforePage(func){
        this.beforePage = func;
    },

    setCurrentExceptionPage(func){
        this.beforeExceptionPage = func;
    }
}

export const pageHandler = {
    parent: document.querySelector("#wrapper"),
    timeouts: {
        sms: 3000
    },
    
    handleHomePageRender(){ //1
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleHomePageRender.bind(this));

        if(!progressionState.checkStateKey("start-popup", "shown")){
            progressionState.isUnlocked("start-popup", "shown");
            pageState.setBeforePage(this.handleHomePageRender);
            renderHomePage(this.parent, gameData.apps, true);
        }
        else{
            renderHomePage(this.parent, gameData.apps);
        }
    },

    handleFriendMessagesPageRender(){ //3
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleFriendMessagesPageRender.bind(this));
        
        if(progressionState.checkStateKey("receive-first-message-notice", "userSentMessage")){
            if(progressionState.checkStateKey("park-gps", "gpsReached"))  {
                pageState.changeMessageToPerm();
            }  
            renderMessagesPage(this.parent, gameData.friendMessages, gameData.friendMessages[1].sender);
        }

        else if(progressionState.checkStateKey("receive-first-message-notice", "notified")){
            progressionState.isUnlocked("receive-first-message-notice", "pressed");
            renderMessagesPage(this.parent, gameData.friendMessages, gameData.friendMessages[1].sender);
        }
    },

    handleDealerMessagesPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleDealerMessagesPageRender.bind(this));
        
        if(progressionState.checkStateKey("receive-change-position-dealer-notice", "notified") && !progressionState.checkStateKey("receive-change-position-dealer-notice", "pressed")){
            progressionState.isUnlocked("receive-change-position-dealer-notice", "pressed");
            pageState.setAppUnlocked("Anteckningar");
            progressionState.isUnlocked("notes-minigame", "notesAppUnlocked");
        }

        renderMessagesPage(this.parent, gameData.dealer, gameData.dealer[0].sender);
    },

    handleSpecificNotesPageRender(completed){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleSpecificNotesPageRender.bind(this));
        renderSpecifikNotesPage(this.parent, gameData.notesMinigame, completed);
    },

    handleCallPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentExceptionPage(this.handleCallPageRender.bind(this));

        if(progressionState.checkStateKey("article-notification", "pressed")){
            setTimeout(() => {
                renderCallPage(this.parent, gameData.phoneCallers.nameLess);
                progressionState.isUnlocked("call", "popup");
            }, this.timeouts.sms);
        }
        else{
            renderCallPage(this.parent, gameData.phoneCallers.nameLess);
        }
    },

    handleBankPageRender(){ //2
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleBankPageRender.bind(this));

        if(progressionState.checkStateKey("start-popup", "shown")){
            renderBankPage(this.parent, gameData.transactions);
            setTimeout(() => {
                renderNotification(
                    this.parent, 
                    "sms", 
                    "Alex",
                    "Vad fan hände med dig igår?", 
                    pageHandler.handleFriendMessagesPageRender.bind(this)
                );
                progressionState.isUnlocked("receive-first-message-notice", "notified");
                pageState.setAppUnlocked("Meddelanden");
                progressionState.isUnlocked("receive-first-message-notice", "messageAppUnlocked");
            }, this.timeouts.sms);
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
                        pageHandler.handleFriendMessagesPageRender();
                    }
                );
            }, 3000);
        }
        else{
            renderBankPage(this.parent, gameData.transactions);
        } */

    },

    handleMessageContactPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleMessageContactPageRender.bind(this));

        if(progressionState.checkStateKey("receive-first-dealer-notice", "notified")){
            renderMessagesContactPage(
                this.parent, 
                [
                    gameData.friendMessages[gameData.friendMessages.length - 2],
                    gameData.dealer[gameData.dealer.length - 2]
                ]
            );
        }

        else if(progressionState.checkStateKey("receive-first-message-notice", "userSentMessage")){
            renderMessagesContactPage(
                this.parent, 
                [gameData.friendMessages[gameData.friendMessages.length - 2]]
            );
        }

        else if(progressionState.checkStateKey("receive-first-message-notice", "notified")){
            renderMessagesContactPage(
                this.parent, 
                [gameData.friendMessages[gameData.friendMessages.length - 1]]
            );
        }
    },

    handleNewsPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleNewsPageRender.bind(this));

        if(progressionState.checkStateKey("article-notification", "popup") && !progressionState.checkStateKey("call", "popup")){
            renderNewsPage(this.parent, gameData.news);
            progressionState.isUnlocked("article-notification", "pressed");
            this.handleCallPageRender();
        }
        else{
            renderNewsPage(this.parent, gameData.news);
        }
    },

    handleMapPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleMapPageRender.bind(this));
        
        renderMapPage(this.parent, gameData.mapCords[progressionState.currentStage].coords);
        progressionState.makeGpsProgress();
    },

    handlePhonePageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handlePhonePageRender);
        console.log(progressionState.steps)

        if(progressionState.checkStateKey("call", "listened") && progressionState.checkStateKey("call", "decryptedCall")){
            renderPhonePage(this.parent, gameData.voicemessages);
        }
    },

    handleNotesPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleNotesPageRender.bind(this));

        if(progressionState.checkStateKey("notes-minigame", "notesAppUnlocked") && !progressionState.checkStateKey("notes-minigame", "notesMinigameCompleted")){
            renderNotesPage(
                this.parent,
                gameData.notes
            );
        }

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
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleFindBagRender.bind(this));        

        this.parent.innerHTML = "";
        renderIphonePopUp(this.parent, "findBag");
    },

    handleDecryptCallRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleDecryptCallRender.bind(this));  

        renderIphonePopUp(this.parent, "phoneCall");
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

    handleDealerNotificationRender(){
        renderNotification(
            this.parent, 
            "sms", 
            "Knarklangare", 
            "Det är för mycket folk. Jag skriver var vi möts istället.", 
            () => {
                this.handleDealerMessagesPageRender();
            }
        );
        progressionState.isUnlocked("receive-change-position-dealer-notice", "notified");
    },

    handleBeforePageRender(){
        pageState.beforePage();
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(pageState.beforePage.bind(this)); 

        if(progressionState.checkStateKey("tiger-find-minigame", "tigerPopup") && !progressionState.checkStateKey("article-notification", "popup")){
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
                progressionState.isUnlocked("article-notification", "popup");
                pageState.setAppUnlocked("Malmöbladet");
                progressionState.isUnlocked("article-notification", "articleAppUnlocked");
            }, this.timeouts.sms);
        }

        
        if(progressionState.checkStateKey("decryptCall", "decryptedCall") && !progressionState.checkStateKey("decryptCall", "phoneAppUnlocked")){
            pageState.setAppUnlocked("Telefon");
            progressionState.isUnlocked("decryptCall", "phoneAppUnlocked");
        }

            /*
        else if(progressionState.currentStageState === "decryptPhoneCallPopUp"){
            pageHandler.handleDecryptCallRender();  
        }

        else{
            this.handleHomePageRender();
        } */
    }
}