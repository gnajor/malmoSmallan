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
    currentApp: null,
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

    setCurrentApp(appName){
        this.currentApp = appName;
    },

    setCurrentPage(func){
        this.currentPage = func;
    }
}

export const pageHandler = {
    parent: document.querySelector("#wrapper"),
    

    handleHomePageRender(){
        if(progressionState.currentStage === "start" && progressionState.currentStageState === "startPopUp"){
            renderHomePage(this.parent, gameData.apps, true);
            this.handleProgression();
            return;
        }
        renderHomePage(this.parent, gameData.apps);
    },

    handleMessagesPageRender(){
        pageState.setCurrentApp("Meddelanden");
        pageState.setCurrentPage(renderMessagesPage);

        if(progressionState.currentStage === "start" && progressionState.currentStageState === "userMessageSent"){
            renderMessagesPage(this.parent, gameData.friendMessages, gameData.friendMessages[1].sender);
        }

        else if(progressionState.currentStage === "triangle" && progressionState.currentStageState === "drugDealerConvo"){
            renderMessagesPage(this.parent, gameData.dealer, gameData.dealer[0].sender);
            pageHandler.handleProgression();
            pageState.setAppUnlocked("Anteckningar");
        }

        else if(progressionState.currentStage === "market" && progressionState.currentStageState === "messageNotification"){
            renderMessagesPage(this.parent, gameData.dealer, gameData.dealer[0].sender);
            pageHandler.handleProgression();
        }
    },

    handleSpecificNotesPageRender(completed){
        pageState.setCurrentPage(renderSpecifikNotesPage);
        renderSpecifikNotesPage(this.parent, gameData.notesMinigame, completed);
    },

    handleCallPageRender(){
        pageState.setCurrentPage(renderCallPage);
        this.handleProgression();
        renderCallPage(this.parent, gameData.phoneCallers.nameLess);
    },

    handleBankPageRender(){
        pageState.setCurrentPage(renderBankPage);
        pageState.setCurrentApp("DegBanken");

        if(progressionState.currentStage === "start" && progressionState.currentStageState === "messageNotification"){
            renderBankPage(this.parent, gameData.transactions);
            const messageNeeded = gameData.friendMessages.find(obj => obj.text.includes("Vad fan"));

            setTimeout(() => {
                renderNotification(
                    this.parent, 
                    "sms", 
                    messageNeeded.sender, 
                    messageNeeded.text, 
                    pageHandler.handleMessagesPageRender.bind(this)
                );
                this.handleProgression();
                pageState.setAppUnlocked("Meddelanden");
            }, 3000);

        }

        else if(progressionState.currentStage === "market"  && progressionState.currentStageState === "paymentNotifaction"){
            renderBankPage(this.parent, gameData.transactions);
            this.handleProgression();
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
        }

    },

    handleMessageContactPageRender(){
        pageState.setCurrentApp("Meddelanden");
        pageState.setCurrentPage(renderMessagesContactPage);
        const lastMessage = [gameData.friendMessages[gameData.friendMessages.length - 1]];
        renderMessagesContactPage(this.parent, lastMessage);
    },

    handleNewsPageRender(){
        pageState.setCurrentApp("Malmöbladet");
        pageState.setCurrentPage(renderNewsPage);

        if(progressionState.currentStageState === "articleNotification"){
            renderNewsPage(this.parent, gameData.news);
            this.handleProgression();

            setTimeout(() => {
                this.handleProgression();
                this.handleCallPageRender();
                pageState.setAppUnlocked("Telefon");
            }, 5000);
        }
        else{
            renderNewsPage(this.parent, gameData.news);
        }
    },

    handleMapPageRender(){
        pageState.setCurrentApp("Kartor");
        pageState.setCurrentPage(renderMapPage);
        renderMapPage(this.parent, gameData.mapCords[progressionState.currentStage].coords);
        progressionState.makeGpsProgress();
    },

    handlePhonePageRender(){
        pageState.setCurrentApp("Telefon");
        pageState.setCurrentPage(renderPhonePage);
        renderPhonePage(this.parent, gameData.voicemessages);
    },

    handleNotesPageRender(){
        pageState.setCurrentApp("Anteckningar");
        pageState.setCurrentPage(renderNotesPage);
        
        if(progressionState.currentStageState === "notesAppUnlocked"){
            pageHandler.handleProgression();
            renderNotesPage(
                this.parent,
                gameData.notes
            );
        }

        else if(progressionState.progression.triangle.state.notesMiniGameDone){
            pageHandler.handleProgression();
            renderNotesPage(
                this.parent,
                gameData.notes
            );
        }

        renderNotesPage(
            this.parent,
            gameData.notes
        );
    },

    handleProgression(){
        progressionState.makeProgress();
    },
    
    handleFindBagRender(){
        this.parent.innerHTML = "";
        renderIphonePopUp(this.parent, "findBag");
    },

    handleDecryptCallRender(){
        renderIphonePopUp(this.parent, "phoneCall");
    },

    handleDrugDealerSmsNotificationRender(){
        setTimeout(() => {

            renderNotification(
                this.parent, 
                "sms", 
                "Knarklangare", 
                "Det är för mycket folk. Jag skriver var vi möts istället.", 
                () => {
                    this.handleMessagesPageRender();
                }
            );
            const testing = document.createElement("p");
            testing.textContent = "fuck you";
            document.querySelector("main").appendChild(testing);

        }, 5000);
        this.handleProgression();
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
        if(progressionState.currentStageState === "articleNotification"){
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
            }, 5000);
        }
        else if(progressionState.currentStageState === "decryptPhoneCallPopUp"){
            pageHandler.handleDecryptCallRender();  
            pageHandler.handleProgression();
        }

        else{
            this.handleHomePageRender();
        }
    }
}