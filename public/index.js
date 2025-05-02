import { pageHandler } from "./pageHandler/pageHandler.js";
import { renderIphonePopUp } from "./components/footer/iphonePopUp.js";
import { renderNotification } from "./components/footer/notification.js";

const state = {
    beforePage: null,
    currentPage: null,

    startApp() {
        pageHandler.handleHomePageRender();
    },

    setCurrentPage(renderFunc) {
        this.currentPage = renderFunc;
    },

    setBeforePage(renderFunc) {
        this.beforePage = renderFunc;
    }
}

// state.startApp();
// renderIphonePopUp(document.querySelector("#wrapper"), 'startVy');
// renderNotification(document.querySelector("#wrapper"), 'sms', 'Alex', 'Vad fan hände med dig igår?');
