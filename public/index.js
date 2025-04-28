import { pageHandler } from "./pageHandler/pageHandler.js";

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

state.startApp();
