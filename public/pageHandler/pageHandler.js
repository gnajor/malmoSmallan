import { renderBankPage } from "../pages/bankPage/bankPage.js";
import { renderCallPage } from "../pages/callPage/callPage.js";
import { renderHomePage } from "../pages/homePage/homePage.js"
import { renderMessagesContactPage } from "../pages/messagesContact/messagesContact.js";
import { renderMessagesPage } from "../pages/messagesPage/messages.js";
import { renderNotesPage } from "../pages/notesPage/notesPage.js";
import { renderSpecifikNotesPage } from "../pages/notesPage/specifikNotesPage.js";
import { gameData } from "./gameData.js";

export const pageHandler = {
    parent: document.querySelector("#wrapper"),
    pageData: gameData,

    handleHomePageRender(){
        renderHomePage(this.parent, this.pageData.apps);
    },

    handleMessagesPageRender(){
        renderMessagesPage(this.parent, this.pageData.friendMessages, this.pageData.friendMessages[1].sender);
    },

    handleSpecificNotesPageRender(){
        renderSpecifikNotesPage(this.parent, this.pageData.notesMinigame);
    },

    handleCallPageRender(){
        renderCallPage(this.parent, this.pageData.phoneCallers.nameLess);
    },

    handleBankPageRender(){
        renderBankPage(this.parent, this.pageData.transactions);
    },

    handleMessageContactPageRender(){
        const lastMessage = [this.pageData.friendMessages[this.pageData.friendMessages.length - 1]];
        renderMessagesContactPage(this.parent, lastMessage);
    },

    handleNotesPageRender(){
        renderNotesPage(
            this.parent,
            this.pageData.notes
        );
    }
}