import { pageHandler } from "./pageHandler/pageHandler.js";
import { renderCallPage } from "./pages/callPage/callPage.js";

const state = {
    beforePage: null,
    currentPage: null,

    startApp(){
        pageHandler.handleHomePageRender();
    },

    setCurrentPage(renderFunc){
        this.currentPage = renderFunc;
    },

    setBeforePage(renderFunc){
        this.beforePage = renderFunc;
    }
}

pageHandler.handleNotesPageRender();

