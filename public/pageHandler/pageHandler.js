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
    pageData: gameData,

    handleHomePageRender(){
        if(progressionState.currentStage === "start" && progressionState.currentStageState === "startPopUp"){
            renderHomePage(this.parent, this.pageData.apps, true);
            this.handleProgression();
            return;
        }
        renderHomePage(this.parent, this.pageData.apps);
    },

    handleMessagesPageRender(){
        pageState.setCurrentApp("Meddelanden");
        pageState.setCurrentPage(renderMessagesPage);
        renderMessagesPage(this.parent, this.pageData.friendMessages, this.pageData.friendMessages[1].sender);
    },

    handleSpecificNotesPageRender(completed){
        pageState.setCurrentPage(renderSpecifikNotesPage);
        renderSpecifikNotesPage(this.parent, this.pageData.notesMinigame, completed);
    },

    handleCallPageRender(){
        pageState.setCurrentPage(renderCallPage);
        renderCallPage(this.parent, this.pageData.phoneCallers.nameLess);
    },

    handleBankPageRender(){
        pageState.setCurrentPage(renderBankPage);
        pageState.setCurrentApp("DegBanken");

        if(progressionState.currentStage === "start" && progressionState.currentStageState === "messageNotification"){
            const messageNeeded = this.pageData.friendMessages.find(obj => obj.text.includes("Vad fan"));

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
            },3000);

        }
        renderBankPage(this.parent, this.pageData.transactions);
    },

    handleMessageContactPageRender(){
        pageState.setCurrentApp("Meddelanden");
        pageState.setCurrentPage(renderMessagesContactPage);
        const lastMessage = [this.pageData.friendMessages[this.pageData.friendMessages.length - 1]];
        renderMessagesContactPage(this.parent, lastMessage);
    },

    handleNewsPageRender(){
        pageState.setCurrentApp("Malmöbladet");
        pageState.setCurrentPage(renderNewsPage);
        renderNewsPage(this.parent, this.pageData.news);
    },

    handleMapPageRender(){
        pageState.setCurrentApp("Kartor");
        pageState.setCurrentPage(renderMapPage);
        renderMapPage(this.parent, this.pageData.mapCords[progressionState.currentStage]);
        progressionState.makeGpsProgress();
    },

    handlePhonePageRender(){
        pageState.setCurrentApp("Telefon");
        pageState.setCurrentPage(renderPhonePage);
        renderPhonePage(this.parent, this.pageData.voicemessages);
    },

    handleNotesPageRender(){
        pageState.setCurrentApp("Anteckningar");
        pageState.setCurrentPage(renderNotesPage);
        renderNotesPage(
            this.parent,
            this.pageData.notes
        );
    },

    handleProgression(){
        progressionState.makeProgress();
    }
}