import { renderBankPage } from "./pages/bankPage/bankPage.js";
import { renderHomePage } from "./pages/homePage/homePage.js";
import { renderMessagesContactPage } from "./pages/messagesContact/messagesContact.js";
import { renderMessagesPage } from "./pages/messagesPage/messages.js";
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
            sum: "-79,99"
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
            sum: "-243,00"
        },
        {
            icon: "money.svg",
            name: "Bankomat",
            date: "2025-04-06",
            sum: "+10000,00"
        },
        {
            icon: "utensils.svg",
            name: "Gallia",
            date: "2025-04-06",
            sum: "-2000,00"
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
            sum: "-2999,00"
        },
        {
            icon: "shopping.svg",
            name: "Indian Express 2",
            date: "2025-04-06",
            sum: "-180,00"
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
    ],

    friendMessages: [
        { sender: "Spelaren", text: "Vi kör svamppasta, hittade riktigt fina svampar på torget", normal: true },
        { sender: "Kompis", text: "Det blir dunder", normal: true },
        { sender: "Spelaren", text: "Har några öl i kylen, köper du en flaska vin?", normal: true },
        { sender: "Kompis", text: "Jag fixar!", normal: true },
        { sender: "Spelaren", text: "Kom vid 18, ta på dig något fint", normal: true },
        { sender: "Spelaren", text: "Kom till star bar", time: "Igår 21:15" },
        { sender: "Kompis", text: "Jag är hemma nu" },
        { sender: "Spelaren", text: "Kom till mascot", time: "Igår 21:30" },
        { sender: "Spelaren", text: "Kom till Ved", time: "Igår 23:00" },
        { sender: "Kompis", text: "Ska sova nu" },
        { sender: "Spelaren", text: "Kom till Gallia", time: "Idag 00:00" },
        { sender: "Kompis", text: "Vem är du med?" },
        { sender: "Spelaren", text: "Kom till Squareside", time: "Idag 00:30" },
        { sender: "Spelaren", text: "Kom till azalee", time: "Idag 01:00" },
        { sender: "Spelaren", text: "Jag bjuder" },
        { sender: "Spelaren", text: "Det står en limo utanför dig nu", time: "Idag 01:30" },
        { sender: "Kompis", text: "Vad händerrrr???????" },
        { sender: "Spelaren", text: "Svart eller röd?" },
        { sender: "Kompis", text: "Fattar ingenting, vad håller du på med??!!" },
        { sender: "Spelaren", text: "Hallå?" },
        { sender: "Kompis", text: "vad händer" },
        { sender: "Kompis", text: "Jag är på möllan vart är du?", time: "Idag 02:55" },
        { sender: "Kompis", text: "Hallå. Vart är du på väg?", time: "Idag 03:01" },
        { sender: "Spelaren", text: "Måste fixa en sak" },
        { sender: "Spelaren", text: "Kan du swosha mig?" },
        { sender: "Kompis", text: "Vad fan hände med dig igår?", time: "Idag 9:35" },
        { sender: "Spelaren", text: "Minns bara att jag var med er, sen minns jag inget.", canSend: true },
        { sender: "Kompis", text: "Sist jag såg dig sprang du mot Pildammstornet med en svart väska. Du skrek att du behövde gömma pengar eller nåt. Du hade gps framme medan du sprang. (Du kan kolla där.)" },
    ],
    friendMessagesNormal: [
        { sender: "Spelaren", text: "Vi kör svamppasta, hittade riktigt fina svampar på torget" },
        { sender: "Kompis", text: "Det blir dunder" },
        { sender: "Spelaren", text: "Har några öl i kylen, köper du en flaska vin?" },
        { sender: "Kompis", text: "Jag fixar!" },
        { sender: "Spelaren", text: "Kom vid 18, ta på dig något fint" },
        { sender: "Kompis", text: "Vad var det för svampar igår, har mått riktigt konstigt." },
        { sender: "Spelaren", text: "Så sjukt… vaknade precis upp på Möllan,tror jag hallucinerade.", canSend: true },
    ],
    dealer: [
        { sender: "Knarklangare", text: "Du måste hålla pengarna till imorgon, polisen är efter mig.", time: "" },
        { sender: "Knarklangare", text: "Jag tror att jag kommit undan. Möt mig på triangeln imorgon." },
        { sender: "Knarklangare", text: "Ge mig mina pengar. Mitt nummer är Möllevångstorgets staty, bussen och Indian express." },

    ]
}

renderMessagesContactPage(document.querySelector("#wrapper"));

// renderMessagesPage(document.querySelector("#wrapper"), gameData.friendMessages, "Alex");

// renderBankPage(document.querySelector("#wrapper"), gameData.transactions);

/* renderHomePage(document.querySelector("#wrapper"), gameData.apps) */

/* renderNotesPage(document.querySelector("#wrapper")) */