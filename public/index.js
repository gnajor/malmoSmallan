import { renderBankPage } from "./pages/bankPage/bankPage.js";
import { renderCallPage } from "./pages/callPage/callPage.js";
import { renderHomePage } from "./pages/homePage/homePage.js";
import { renderNotesPage } from "./pages/notesPage/notesPage.js";

const state = {
    progression: undefined,

}

const gameData = {
    apps: [
        {
            icon: "sms-app.jpg",
            name: "Meddelanden",
            func: () => {

            }
        },
        {
            icon: "maps-app.jpg",
            name: "Kartor",
            func: () => {
                
            }
        },
        {
            icon: "notes-app.jpg",
            name: "Anteckningar",
            func: () => {
                
            }
        },
        {
            icon: "phone-app.png",
            name: "Telefon",
            func: () => {
                
            }
        },
        {
            icon: "bank-app.jpg",
            name: "DegBanken",
            func: () => {
                
            }
        },
        {
            icon: "news-app.jpg",
            name: "Malmöbladet",
            func: () => {
                
            }
        }
    ],

    transactions: [
        {
            icon: "truck.svg",
            name: "Limousine",
            date: "2025-04-06",
            sum: "-5500,00"
        },  
        {
            icon: "wine.svg",
            name: "Azalee-casino",
            date: "2025-04-06",
            sum: "-3000,00"
        },  
        {
            icon: "wine.svg",
            name: "Azalee",
            date: "2025-04-06",
            sum: "-3775,00"
        },  
        {
            icon: "wine.svg",
            name: "Square Side",
            date: "2025-04-06",
            sum: "-180,00"
        },  
        {
            icon: "utensils.svg",
            name: "Gallia",
            date: "2025-04-06",
            sum: "-2999,00"
        },   
        {
            icon: "utensils.svg",
            name: "Sibylla",
            date: "2025-04-06",
            sum: "-693,00"
        },
        {
            icon: "utensils.svg",
            name: "V.E.D",
            date: "2025-04-06",
            sum: "-1999,00"
        },
        {
            icon: "money.svg",
            name: "Bankomat",
            date: "2025-04-06",
            sum: "+10000,00"
        }, 
        {
            icon: "shopping.svg",
            name: "Indian Express 2",
            date: "2025-04-06",
            sum: "-243,00"
        },
        {
            icon: "wine.svg",
            name: "Mascot",
            date: "2025-04-06",
            sum: "-975,00"
        },
        {
            icon: "wine.svg",
            name: "Star bar",
            date: "2025-04-06",
            sum: "-79,99"
        }, 
        {
            icon: "wine.svg",
            name: "Ölcaféet",
            date: "2025-04-06",
            sum: "-414,40"
        },  
    ]
}

/* renderCallPage(document.querySelector("#wrapper"), "Okänt Nummer"); */

/* renderBankPage(document.querySelector("#wrapper"), gameData.transactions); */

/* renderHomePage(document.querySelector("#wrapper"), gameData.apps) */

renderNotesPage(document.querySelector("#wrapper"));