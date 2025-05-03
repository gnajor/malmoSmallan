import { pageHandler } from "./pageHandler/pageHandler.js";
import { renderMapPage } from "./pages/mapPage/mapPage.js";
import { renderNewsPage } from "./pages/newsPage/newsPage.js";


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

/* state.startApp(); */

renderMapPage(document.querySelector("#wrapper"));
// renderIphonePopUp(document.querySelector("#wrapper"), 'other', 'Fel', 'Felmeddelande', 'Stäng');
// renderNotification(document.querySelector("#wrapper"), 'sms', 'Alex', 'Vad fan hände med dig igår?');
/* pageHandler.handleNotesPageRender(); */
/* pageHandler.handleHomePageRender(); */

/* renderNewsPage(document.querySelector("#wrapper"), [
    "Man efterlyst för grov narkotikahandel - Sågs senast vid Möllevångstorget",
    "Malmöbo vägrade lämna cykelbanan - bott där i tre veckor",
    "Man sålde olagliga svampar - utgav sig för att vara torghandlare"
]); */

