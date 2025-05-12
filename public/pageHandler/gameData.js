import { pageHandler } from "./pageHandler.js";


export const appFuncs = {
    Meddelanden: () => {
        pageHandler.handleMessageContactPageRender();
    },

    Kartor: () => {
        pageHandler.handleMapPageRender();
    },

    Anteckningar: () => {
        pageHandler.handleNotesPageRender();
    },

    Telefon: () => {
        pageHandler.handlePhonePageRender();
    },
    
    DegBanken: () => {
        pageHandler.handleBankPageRender();
    },

    Malmöbladet: () => {
        pageHandler.handleNewsPageRender();
    }
}

export const gameData = {
    apps: [
        {
            icon: "bank-app.jpg",
            name: "DegBanken",
            locked: false, 
        },
        {
            icon: "maps-app.jpg",
            name: "Kartor",
            locked: false, 
        },
        {
            icon: "sms-app.jpg",
            name: "Meddelanden",
            locked: true, 
        },
        {
            icon: "news-app.jpg",
            name: "Malmöbladet",
            locked: true, 
        },
        {
            icon: "phone-app.png",
            name: "Telefon",
            locked: true, 
        },
        {
            icon: "notes-app.jpg",
            name: "Anteckningar",
            locked: true, 
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
        { sender: "Alex", text: "Det blir dunder", normal: true },
        { sender: "Spelaren", text: "Har några öl i kylen, köper du en flaska vin?", normal: true },
        { sender: "Alex", text: "Jag fixar!", normal: true },
        { sender: "Spelaren", text: "Kom vid 18, ta på dig något fint", normal: true },
        { sender: "Spelaren", text: "Kom till star bar", time: "Igår 21:15" },
        { sender: "Alex", text: "Jag är hemma nu" },
        { sender: "Spelaren", text: "Kom till mascot", time: "Igår 21:30" },
        { sender: "Spelaren", text: "Kom till Ved", time: "Igår 23:00" },
        { sender: "Alex", text: "Ska sova nu" },
        { sender: "Spelaren", text: "Kom till Gallia", time: "Idag 00:00" },
        { sender: "Alex", text: "Vem är du med?" },
        { sender: "Spelaren", text: "Kom till Squareside", time: "Idag 00:30" },
        { sender: "Spelaren", text: "Kom till azalee", time: "Idag 01:00" },
        { sender: "Spelaren", text: "Jag bjuder" },
        { sender: "Spelaren", text: "Det står en limo utanför dig nu", time: "Idag 01:30" },
        { sender: "Alex", text: "Vad händerrrr???????" },
        { sender: "Spelaren", text: "Svart eller röd?" },
        { sender: "Alex", text: "Fattar ingenting, vad håller du på med??!!" },
        { sender: "Spelaren", text: "Hallå?" },
        { sender: "Alex", text: "vad händer" },
        { sender: "Alex", text: "Jag är på möllan vart är du?", time: "Idag 02:55" },
        { sender: "Alex", text: "Hallå. Vart är du på väg?", time: "Idag 03:01" },
        { sender: "Spelaren", text: "Måste fixa en sak" },
        { sender: "Spelaren", text: "Kan du swosha mig?" },
        { sender: "Alex", text: "Vad fan hände med dig igår?", time: "Idag 9:35" },
        { sender: "Spelaren", text: "Minns bara att jag var med er, sen minns jag inget.", canSend: true },
        { sender: "Alex", text: "Sist jag såg dig sprang du mot Pildammstornet med en svart väska. Du skrek att du behövde gömma pengar eller nåt. Du hade gps framme medan du sprang. (Du kan kolla där.)" },
        { sender: "Alex", text: "Minns du vad som hände sen?", none: true },
        { sender: "Alex", text: "Har du kollat anteckningar typ??", none: true },
    ],
    friendMessagesNormal: [
        { sender: "Spelaren", text: "Vi kör svamppasta, hittade riktigt fina svampar på torget" },
        { sender: "Alex", text: "Det blir dunder" },
        { sender: "Spelaren", text: "Har några öl i kylen, köper du en flaska vin?" },
        { sender: "Alex", text: "Jag fixar!" },
        { sender: "Spelaren", text: "Kom vid 18, ta på dig något fint" },
        { sender: "Alex", text: "Vad var det för svampar igår, har mått riktigt konstigt." },
        { sender: "Spelaren", text: "Så sjukt… vaknade precis upp på Möllan, tror jag hallucinerade.", canSend: true },
    ],
    dealer: [
        { sender: "Okänt nummer", text: "Du behöver hålla pengarna tills imorgon, jag har problem med polisen. Behöver natten för att fixa lite grejer.", time: "Igår 23:07" },
        { sender: "Spelaren", text: "Har ångrat mig, vill inte tvätta några pengar, vad är ditt nummer så kan jag swosha tillbaka", time: "Idag 00:37"},
        { sender: "Spelaren", text: "Hallå??? Är för full för detta", time: "Idag 01:18"},
        { sender: "Okänt nummer", text: "Du måste hålla pengarna till imorgon, polisen är efter mig.", time: "Idag 01:33" },
        { sender: "Spelaren", text: "Tror du råkat förlita dig på fel person, har inte några pengar kvar", time: "Idag 02:35"},
        { sender: "Okänt nummer", text: "Jag ska ha mina 20 000kr imorgon kl 15. Annars blir det konsekvenser.", time: "Idag 03:41"},
        { sender: "Okänt nummer", text: "Triangeltorget 1, 211 43 Malmö. (länk till kartapp)", none: true},
        { sender: "Okänt nummer", text: "Det är för mycket folk. Jag skriver var vi möts istället.", none: true},
        { sender: "Okänt nummer", text: "Ge mig mina pengar. Mitt nummer är Möllevångstorgets staty, bussen och Indian express.", none: true},
    ],

    notesMinigame: [
        {
            rightWord: "Ta möllan tigern och sälj den",
            scrambledWord: "aT nlmöla nitrge coh äsjl nde"
        },
        {
            rightWord: "Möllan tigern finns vid Malmö Market",
            scrambledWord: "nölanMl gertign sinfn div ömlaMa takreM"
        },
    ],

    phoneCallers: {
        nameLess: "Okänt Nummer"
    }, 

    notes: {
        favorite: [
            {
                title: "veldgt vikigt!!",
                text: "At NLMÖLA NITRGE COH ÄSJL NDE",
                date: "4/9/2025"
            },
            {
                title: "Träning",
                text: "- PB i marklyft 40kg <br> - PB i benpress 50kg <br> - PB i pull ups 1",
                date: "4/9/2025"
            }
        ],
        latest: [
            {
                title: "Att göra",
                text: "- Sök jobb <br> - Skriv klart uppsats <br> - Duscha <br> - Gå till biblioteket <br> - Städa",
                date: "4/9/2025"
            },
            {
                title: "Inköpslista",
                text: "- Toalettpapper <br> - Fryspizza <br> - Chips <br>",
                date: "4/9/2025"
            },
            {
                title: "Skyldig",
                text: "- Swosha mamma 500kr",
                date: "4/9/2025"
            },
            {
                title: "Träning",
                text: "- PB i marklyft 40kg <br> - PB i benpress 50kg <br> - PB i pull ups 1",
                date: "4/9/2025"
            },
            {
                title: "Livsplan",
                text: "Gör en livsplan. Planera frö de kommande tio åren. Lite resor och sådant",
                date: "4/9/2025"
            }
        ],
        yesterday: [
            {
                title: "veldgt vikigt!!",
                text: "At NLMÖLA NITRGE COH ÄSJL NDE",
                date: "4/9/2025"
            }
        ]
    },

    voicemessages: [
        {
            caller: "Okänt nummer",
            date: "Idag",
        }
    ],

    news: [
        "Man efterlyst för grov narkotikahandel - Sågs senast vid Möllevångstorget",
        "Malmöbo vägrade lämna cykelbanan - bott där i tre veckor",
        "Man sålde olagliga svampar - utgav sig för att vara torghandlare"
    ],

    mapCords: [
        [55.591563, 13.007938], 
        [55.590122, 12.998134],
        [55.594437, 13.000438],
        [55.590688, 13.008563],
    ]
}