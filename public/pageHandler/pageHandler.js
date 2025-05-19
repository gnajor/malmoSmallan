import { renderBankPage } from "../pages/bankPage/bankPage.js";
import { renderCallPage } from "../pages/callPage/callPage.js";
import { renderHomePage } from "../pages/homePage/homePage.js"
import { renderMapApp} from "../pages/mapApp/mapApp.js";
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
import { renderPoliceLights } from "../pages/policeLights/policeLights.js";
import { renderStartVy } from "../pages/startVy/startVy.js";
import { renderEndScene } from "../pages/endScene/endScene.js";


export const pageState = {
    beforePage: null,
    currentPage: null,
    currentExceptionPage: null,
    appsUnlocked: [],

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

    changeFriendMessageToNoSend(){
        for(const message of gameData.friendMessages){
            if(message.canSend){
                message.canSend = false;
                state.setStateStorage("gameData", gameData)
            }
        }
    },

    changeNormalMessageToNoSend(){
        for(const message of gameData.friendMessagesNormal){
            if(message.canSend){
                message.canSend = false;
                state.setStateStorage("gameData", gameData);
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

    changeNotesData(){
        const notes = gameData.notes;
        delete notes.yesterday;

        for(let i = 0; i < notes.favorite.length; i++){
            const note = notes.favorite[i];

            if(note.title === "veldgt vikigt!!"){
                notes.favorite.splice(i, 1);
            }
        }
        state.setStateStorage("gameData", gameData);
    },

    changeTransactionData(){
        gameData.transactions.push({
            icon: "money.svg",
            name: "Swosh",
            date: "2025-04-06",
            sum: "+20000,00"
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

    setNewsPaperToLocked(){
        gameData.apps[2].locked = true;
        gameData.mapApp.locked = true;
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
        news: 3000,
        friendSentHelpMessage: 5000, 
        dealerCode: 4000,
        firstMessage: 10000, 
        call: 40000, 
    },

    handleStartPageRender(){
        pageState.setCurrentPage(this.handleStartPageRender.bind(this));
        renderStartVy(this.parent);
        progressionState.isUnlocked("start-popup", "shown");
    },
    
    handleHomePageRender(){
        pageState.setCurrentPage(this.handleHomePageRender.bind(this));

        if(progressionState.checkStateKey("police-ending", "done")){
            progressionState.isUnlocked("ending", "messagesNormal");
            pageState.setNewsPaperToLocked();
            renderHomePage(this.parent, pageState.getAppsData(), true);
        }

        else{
            renderHomePage(this.parent, pageState.getAppsData());
            pageState.setBeforePage(pageState.currentPage);
        }
    },

    handleMapAppRender(){
        const parent = this.parent.querySelector("#app-container");

        if(progressionState.checkStateKey("notes-minigame", "notesMinigameCompleted")){
            renderMapApp(
                parent, 
                gameData.mapApp,
                gameData.links[3]
            );
        }

        else if(progressionState.checkStateKey("receive-position-dealer-notice", "notified")){
            renderMapApp(
                parent, 
                gameData.mapApp,
                gameData.links[2]
            );
        }

        else if(progressionState.checkStateKey("receive-first-message-notice", "userSentMessage")){
            renderMapApp(
                parent, 
                gameData.mapApp,
                gameData.links[1]
            );
        }

        else if(progressionState.checkStateKey("start-popup", "shown")){
            renderMapApp(
                parent, 
                gameData.mapApp,
                gameData.links[0]
            );
        }

        else{
            console.warn("this is not supposed to happen")
        }
    },

    handleFriendMessagesPageRender(){ //3
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleFriendMessagesPageRender.bind(this));      

        if(progressionState.checkStateKey("ending", "userSentMessage")){
            gameData.friendMessagesNormal.push({none: true});
            renderMessagesPage(
                this.parent, 
                gameData.friendMessagesNormal,
                gameData.friendMessagesNormal[1].sender
            );
        }

        else if(progressionState.checkStateKey("ending", "messagesNormal")){
            gameData.friendMessagesNormal.push({none: true});
            renderMessagesPage(
                this.parent, 
                gameData.friendMessagesNormal,
                gameData.friendMessagesNormal[1].sender
            );
        }

        else if(progressionState.checkStateKey("receive-friend-help-notice", "notified") && !progressionState.checkStateKey("receive-friend-help-notice", "pressed")){
            progressionState.isUnlocked("receive-friend-help-notice", "pressed");
            pageState.changeMessageToPerm(gameData.friendMessages);
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.friendMessages, true),
                gameData.friendMessages[1].sender
            );

            pageState.setAppUnlocked("Anteckningar");
            progressionState.isUnlocked("notes-minigame", "notesAppUnlocked"); 
        }

        else if(progressionState.checkStateKey("receive-first-message-notice", "notified") && !progressionState.checkStateKey("receive-first-message-notice", "pressed")){
            progressionState.isUnlocked("receive-first-message-notice", "pressed");
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.friendMessages),
                gameData.friendMessages[1].sender
            );
            pageState.changeFriendMessageToNoSend();
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

        if(progressionState.checkStateKey("receive-dealer-code-notice", "notified")){
            progressionState.isUnlocked("receive-dealer-code-notice", "pressed");
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.dealer, true),
                gameData.dealer[0].sender
            );
        }

        
        else if(progressionState.checkStateKey("receive-avoid-position-dealer-notice", "notified") && !progressionState.checkStateKey("receive-avoid-position-dealer-notice", "pressed")){
            progressionState.isUnlocked("receive-avoid-position-dealer-notice", "pressed");
            pageState.changeMessageToPerm(gameData.dealer);
            
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.dealer, true),
                gameData.dealer[0].sender
            );

            setTimeout(() => {
                this.handleFriendHelpNoticeRender();
            }, this.timeouts.friendSentHelpMessage);
        }
        

        else if(progressionState.checkStateKey("receive-position-dealer-notice", "notified") && !progressionState.checkStateKey("receive-position-dealer-notice", "pressed")){
            progressionState.isUnlocked("receive-position-dealer-notice", "pressed");
            pageState.changeMessageToPerm(gameData.dealer);
            
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.dealer, true),
                gameData.dealer[0].sender
            );
        }

        else{
            renderMessagesPage(
                this.parent, 
                pageState.getFilteredMessages(gameData.dealer, true),
                gameData.dealer[0].sender
            );
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

        if(progressionState.checkStateKey("ending", "messagesNormal")){
            renderBankPage(this.parent, gameData.normalTransactions, false);
        }

        else if(progressionState.checkStateKey("receive-payment-notice", "notified") && !progressionState.checkStateKey("receive-payment-notice", "pressed")){
            pageState.changeTransactionData();
            renderBankPage(this.parent, gameData.transactions);
            progressionState.isUnlocked("receive-payment-notice", "pressed");
            pageState.changeMessageToPerm(gameData.dealer); 

            setTimeout(() => {
                this.handleDealerNotificationRender();
            }, this.timeouts.dealerCode);
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
            }, this.timeouts.firstMessage);
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
        const filteredNormalMessage = pageState.getFilteredMessages(gameData.friendMessagesNormal);

        if(progressionState.checkStateKey("police-ending", "done")){
            renderMessagesContactPage(
                this.parent,
                [filteredNormalMessage[filteredNormalMessage.length - 1]],
                true
            );
        }

        else if(progressionState.checkStateKey("receive-first-message-notice", "userSentMessage")){
            renderMessagesContactPage(
                this.parent, 
                [
                    filteredFriendMessages[filteredFriendMessages.length - 1],
                    filteredDealerMessages[filteredDealerMessages.length - 1]
                ]
            );
        }

        else if(progressionState.checkStateKey("receive-first-message-notice", "notified")){
            renderMessagesContactPage(
                this.parent, 
                [
                    filteredFriendMessages[filteredFriendMessages.length - 3],
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
            }, this.timeouts.call);
        }
        else{
            renderNewsPage(this.parent, gameData.news);
        }
    },

    handlePhonePageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handlePhonePageRender);

        if(progressionState.checkStateKey("ending", "messagesNormal")){
            renderPhonePage(this.parent, []);
        }

        else if(progressionState.checkStateKey("call", "listened") && !progressionState.checkStateKey("call", "decryptedCall")){
            renderPhonePage(this.parent, gameData.voicemessages);
        }
    },

    handleNotesPageRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleNotesPageRender.bind(this));

        if(progressionState.checkStateKey("ending", "messagesNormal")){
            pageState.changeNotesData();
            renderNotesPage(this.parent, gameData.notes);
        }

        else if(progressionState.checkStateKey("notes-minigame", "notesMinigameCompleted")){
            renderNotesPage(this.parent, gameData.notes, false);
        }

        else{
            renderNotesPage(this.parent, gameData.notes);
        }
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

    handleFriendHelpNoticeRender(){
        renderNotification(
            this.parent,
            "sms",
            "Alex",
            "Minns du vad som hände sen? Har du kollat anteckningar typ??",
            () => {
                this.handleFriendMessagesPageRender();
            }
        );
        progressionState.isUnlocked("receive-friend-help-notice", "notified");
    },

    handlePaymentNotificationRender(){
        renderNotification(
            this.parent,
            "bank",
            "+20 000kr",
            "Tack för att återfann tigern!",
            () => {
                this.handleBankPageRender();
            }
        );
        progressionState.isUnlocked("receive-payment-notice", "notified");
    },

    handleDealerNotificationRender(){
        if(progressionState.checkStateKey("receive-payment-notice", "pressed")){
            renderNotification(
                this.parent,
                "sms",
                "Okänt nummer",
                "Ge mig mina pengar. Mitt nummer är Möllevångstorgets staty, bussen och Indian express.",
                () => {
                    this.handleDealerMessagesPageRender();
                }
            );
            progressionState.isUnlocked("receive-dealer-code-notice", "notified");
        }

        else if(progressionState.checkStateKey("triangle-gps", "gpsReached")){
            renderNotification(
                this.parent,
                "sms",
                "Okänt nummer",
                "Det är för mycket folk. Måste dra. Jag skickar mitt nummer sen. Om du inte har fixat fram mina pengar då så kommer det bli stora konsekvenser",
                () => {
                    this.handleDealerMessagesPageRender();
                }
            );
            progressionState.isUnlocked("receive-avoid-position-dealer-notice", "notified");
        }

        else if(progressionState.checkStateKey("decryptCall", "phoneAppUnlocked") && !progressionState.checkStateKey("receive-position-dealer-notice", "notified")){
            renderNotification(
                this.parent, 
                "sms", 
                "Okänt nummer", 
                "Triangelkupolen norra ingången", 
                () => {
                    this.handleDealerMessagesPageRender();
                }
            );  
            progressionState.isUnlocked("receive-position-dealer-notice", "notified");
        }
    },

    handlePoliceLightsRender(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handlePoliceLightsRender.bind(this)); 
        renderPoliceLights(this.parent);
    },

    handleEndCredits(){
        pageState.setBeforePage(pageState.currentPage);
        pageState.setCurrentPage(this.handleEndCredits.bind(this)); 
        renderEndScene(this.parent, gameData.efterTexter);
    },

    handleCurrentPageRender(){
        pageState.currentPage();  
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
            }, this.timeouts.news);
        }

        
        if(progressionState.checkStateKey("decryptCall", "decryptedCall") && !progressionState.checkStateKey("decryptCall", "phoneAppUnlocked")){
            pageState.setAppUnlocked("Telefon");
            progressionState.isUnlocked("decryptCall", "phoneAppUnlocked");
        }
    }
}