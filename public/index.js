import { pageHandler } from "./pageHandler/pageHandler.js";
import { renderIphonePopUp } from "./components/footer/iphonePopUp.js";

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
renderIphonePopUp(document.querySelector("#wrapper"), 'findBag');
