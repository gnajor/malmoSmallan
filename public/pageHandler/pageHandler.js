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
import { progressionState, state } from "../index.js";
import { appFuncs, gameData } from "./gameData.js";
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
        state.setStateStorage("gameData", gameData);
    },

    changeAppData(){
        for(const appUnlocked of this.appsUnlocked){
            const foundApp = gameData.apps.find(app => app.name === appUnlocked); 
            foundApp.locked = false;
        }
    },

    getFilteredMessages(data, addObject){
        const messages = data.filter(message => !message.none);
        if(addObject)messages.push({none: true});
        return messages;
    },

    changeMessageToNoSend(){
        for(const message of gameData.friendMessages){
            if(message.canSend){
                message.canSend = false;
            }
        }
    },

    changeMessageToPerm(data){
        const currentLength = data.length

        for(let i = 0; i < currentLength; i++){
            const message = data[i];

            if(message.none){
                message.none = false;
                if(i === currentLength - 1)data.push({none: true});
                state.setStateStorage("gameData", gameData);
                return;
            }
        }
    },

    changeTransactionData(){
        gameData.transactions.push({
            icon: "money.svg",
            name: "Swosh",
            date: "2025-04-06",
            sum: "+10000,00"
        });

        state.setStateStorage("gameData", gameData);
    },

    setCurrentPage(func){
        this.currentPage = func;
        state.setStateStorage("currentPage", func.name);
    },

    setBeforePage(func){
        this.beforePage = func;
        state.setStateStorage("beforePage", func.name);
    },

    setCurrentExceptionPage(func){
        this.currentExceptionPage = func;
        state.setStateStorage("currentExceptionPage", func.name);
    },



    getAppsData(){
        const apps = gameData.apps.filter(() => true);

        for(const app of apps){
            if(appFuncs[app.name]){
                app.func = appFuncs[app.name];
            }
        }

        return apps;
    }
}

export const pageHandler = {
    parent: document.querySelector("#wrapper"),
    timeouts: {
        sms: 3000
    },
    
    handleHomePageRender(){ //1
        pageState.setCurrentPage(this.handleHomePageRender.bind(this));

        if(!progressionState.checkStateKey("start-popup", "shown")){
            progressionState.isUnlocked("start-popup", "shown");
            pageState.setBeforePage(this.handleHomePageRender);
            renderHomePage(this.parent, pageState.getAppsData(), true);
        }
        else{
            renderHomePage(this.parent, pageState.getAppsData());
            pageState.setBeforePage(pageState.currentPage);
        }
    },

    handleFriendMessagesPageRender(){ //3
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleFriendMessagesPageRender.bind(this));

        if(progressionState.checkStateKey("receive-first-message-notice", "notified") && !progressionState.checkStateKey("receive-first-message-notice", "pressed")){
            progressionState.isUnlocked("receive-first-message-notice", "pressed");
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.friendMessages),
                gameData.friendMessages[1].sender
            );
        }
        else{
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.friendMessages, true),
                gameData.friendMessages[1].sender
            );
        }
    },

    handleDealerMessagesPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleDealerMessagesPageRender.bind(this));

        const filteredDealerMessages = pageState.getFilteredMessages(gameData.dealer, true);

        if(progressionState.checkStateKey("receive-position-dealer-notice", "notified") && !progressionState.checkStateKey("receive-position-dealer-notice", "pressed")){
            progressionState.isUnlocked("receive-position-dealer-notice", "pressed");
            pageState.changeMessageToPerm(gameData.dealer);
            
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.dealer, true),
                gameData.dealer[0].sender
            );
        }

        else if(progressionState.checkStateKey("receive-change-position-dealer-notice", "notified") && !progressionState.checkStateKey("receive-change-position-dealer-notice", "pressed")){ 
            progressionState.isUnlocked("receive-change-position-dealer-notice", "pressed");
            pageState.setAppUnlocked("Anteckningar");
            progressionState.isUnlocked("notes-minigame", "notesAppUnlocked"); 
            renderMessagesPage(this.parent, filteredDealerMessages, gameData.dealer[0].sender);
        } 
    },

    handleSpecificNotesPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleSpecificNotesPageRender.bind(this));

        if(progressionState.checkStateKey("notes-minigame", "notesMinigameCompleted")){
            renderSpecifikNotesPage(this.parent, gameData.notesMinigame, true);
        }
        else{
            renderSpecifikNotesPage(this.parent, gameData.notesMinigame, false);
        }   
    },

    handleCallPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentExceptionPage(this.handleCallPageRender.bind(this));

        renderCallPage(this.parent, gameData.phoneCallers.nameLess);
        progressionState.isUnlocked("call", "popup");
        
    },

    handleBankPageRender(){ //2
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleBankPageRender.bind(this));

        if(progressionState.checkStateKey("receive-payment-notice", "notified") && !progressionState.checkStateKey("receive-payment-notice", "pressed")){
            pageState.changeTransactionData();
            renderBankPage(this.parent, gameData.transactions);
            progressionState.isUnlocked("receive-payment-notice", "pressed");

            setTimeout(() => {
                pageState.changeDrugDealerMessageToPerm(); 
                console.log(gameData.dealer)
                renderNotification(
                    this.parent,
                    "sms",
                    "Knarklangare",
                    "Ge mig mina pengar. Mitt nummer är Möllevångstorgets staty, bussen och Indian express.",
                    () => {
                        this.handleDealerMessagesPageRender();
                    }
                );
            }, 3000);
        }
        
        else if(progressionState.checkStateKey("start-popup", "shown") && !progressionState.checkStateKey("receive-first-message-notice", "notified")){
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

        else{
            renderBankPage(this.parent, gameData.transactions);
        }
    },

    handleMessageContactPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleMessageContactPageRender.bind(this));
        const filteredFriendMessages = pageState.getFilteredMessages(gameData.friendMessages);
        const filteredDealerMessages = pageState.getFilteredMessages(gameData.dealer);

        if(progressionState.checkStateKey("receive-first-message-notice", "notified") && !progressionState.checkStateKey("receive-first-message-notice", "pressed")){
            renderMessagesContactPage(
                this.parent, 
                [
                    filteredFriendMessages[filteredFriendMessages.length - 2],
                    filteredDealerMessages[filteredDealerMessages.length - 1]
                ]
            );
        }

        else{
            renderMessagesContactPage(
                this.parent, 
                [
                    filteredFriendMessages[filteredFriendMessages.length - 1],
                    filteredDealerMessages[filteredDealerMessages.length - 1]
                ]
            );
        }
    },

    handleNewsPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleNewsPageRender.bind(this));

        if(progressionState.checkStateKey("article-notification", "popup") && !progressionState.checkStateKey("call", "popup")){
            renderNewsPage(this.parent, gameData.news);
            progressionState.isUnlocked("article-notification", "pressed");
            setTimeout(() => {
                this.handleCallPageRender();
            }, this.timeouts.sms);
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

        if(progressionState.checkStateKey("call", "listened") && !progressionState.checkStateKey("call", "decryptedCall")){
            renderPhonePage(this.parent, gameData.voicemessages);
        }
    },

    handleNotesPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleNotesPageRender.bind(this));

        renderNotesPage(this.parent, gameData.notes);
    },
    
    handleFindBagRender(){
        pageState.setBeforePage(pageState.currentPage); //messages
        pageState.setCurrentPage(this.handleFindBagRender.bind(this)); //findBag        

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
        progressionState.isUnlocked("receive-payment-notice", "notified");
    },

    handleDealerNotificationRender(){
        if(progressionState.checkStateKey("decryptCall", "phoneAppUnlocked")){
            renderNotification(
                this.parent, 
                "sms", 
                "Knarklangare", 
                "Triangeltorget 1, 211 43 Malmö.", 
                () => {
                    this.handleDealerMessagesPageRender();
                }
            );  
            progressionState.isUnlocked("receive-position-dealer-notice", "notified");
        }
    },

    handleBeforePageRender(){
        pageState.beforePage();
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(pageState.beforePage); 

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
            this.handleDealerNotificationRender();
        }
    }
}