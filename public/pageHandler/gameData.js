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
            locked: true,
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

    mapApp: {
            icon: "maps-app.jpg",
            name: "Kartor",
            locked: false,
        },
    

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
            sum: "+20000,00"
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

    normalTransactions: [
        {
            icon: "shopping.svg",
            name: "Torghandeln",
            date: "2025-04-06",
            sum: "-39,00"
        },
        {
            icon: "shopping.svg",
            name: "ICA Supermarket Värnhem",
            date: "2025-04-05",
            sum: "-537,00"
        },
        {
            icon: "shopping.svg",
            name: "Pressbyrån Malmö C",
            date: "2025-04-05",
            sum: "-76,00"
        },
        {
            icon: "truck.svg",
            name: "Skånetrafiken",
            date: "2025-04-04",
            sum: "-55,00"
        },
        {
            icon: "tv.svg",
            name: "Netflix",
            date: "2025-04-04",
            sum: "-99,00"
        },
        {
            icon: "home.svg",
            name: "EON",
            date: "2025-04-03",
            sum: "-253,00"
        },
        {
            icon: "wine.svg",
            name: "Systembolaget",
            date: "2025-04-03",
            sum: "-326,00"
        },
        {
            icon: "home.svg",
            name: "MKB Fastighets AB",
            date: "2025-04-02",
            sum: "-5823,00"
        },
        {
            icon: "utensils.svg",
            name: "Niagara Café",
            date: "2025-04-02",
            sum: "-62,00"
        },
        {
            icon: "money.svg",
            name: "CSN",
            date: "2025-04-01",
            sum: "+13500,00"
        },
        {
            icon: "utensils.svg",
            name: "7-Eleven",
            date: "2025-03-31",
            sum: "-51,00"
        },
        {
            icon: "utensils.svg",
            name: "Fridhems Falafel",
            date: "2025-03-31",
            sum: "-65,00"
        },
        {
            icon: "shopping.svg",
            name: "Coop",
            date: "2025-03-30",
            sum: "-289,00"
        },
        {
            icon: "utensils.svg",
            name: "Max Burgers",
            date: "2025-03-29",
            sum: "-149,00"
        },
        {
            icon: "shopping.svg",
            name: "Akademibokhandeln",
            date: "2025-03-28",
            sum: "-129,00"
        },
        {
            icon: "shopping.svg",
            name: "IKEA",
            date: "2025-03-27",
            sum: "-845,00"
        },
        {
            icon: "utensils.svg",
            name: "Wolt",
            date: "2025-03-26",
            sum: "-143,00"
        },
        {
            icon: "utensils.svg",
            name: "Subway",
            date: "2025-03-25",
            sum: "-64,00"
        }
    ],

    friendMessages: [
        { sender: "Spelaren", text: "Vi kör svamppasta, hittade riktigt fina svampar på torget", normal: true },
        { sender: "Alex", text: "Det blir dunder", normal: true, time: "Igår 13:37" },
        { sender: "Spelaren", text: "Har några öl i kylen, köper du en flaska vin?", normal: true },
        { sender: "Alex", text: "Jag fixar!", normal: true },
        { sender: "Spelaren", text: "Kom vid 18, ta på dig något fint", normal: true, time: "Igår 14:08" },
        { sender: "Spelaren", text: "Kom till star bar", time: "Igår 21:17" },
        { sender: "Alex", text: "Jag är hemma nu" },
        { sender: "Spelaren", text: "Kom till mascot", time: "Igår 21:33" },
        { sender: "Spelaren", text: "Kom till Ved", time: "Igår 23:06" },
        { sender: "Alex", text: "Ska sova nu" },
        { sender: "Spelaren", text: "Kom till Gallia", time: "Idag 00:11" },
        { sender: "Alex", text: "Vem är du med?" },
        { sender: "Spelaren", text: "Kom till Squareside", time: "Idag 00:34" },
        { sender: "Spelaren", text: "Kom till azalee", time: "Idag 01:23" },
        { sender: "Spelaren", text: "Jag bjuder" },
        { sender: "Spelaren", text: "Det står en limo utanför dig nu", time: "Idag 01:31" },
        { sender: "Alex", text: "Vad händerrrr???????" },
        { sender: "Spelaren", text: "Svart eller röd?" },
        { sender: "Alex", text: "Fattar ingenting, vad håller du på med??!!" },
        { sender: "Spelaren", text: "Hallå?" },
        { sender: "Alex", text: "vad händer" },
        { sender: "Alex", text: "Jag är på möllan vart är du?", time: "Idag 02:57" },
        { sender: "Alex", text: "Hallå. Vart är du på väg?", time: "Idag 03:01" },
        { sender: "Spelaren", text: "Måste fixa en sak" },
        { sender: "Spelaren", text: "Kan du swosha mig?" },
        { sender: "Alex", text: "Vad fan hände med dig igår?", time: "Idag 09:32" },
        { sender: "Spelaren", text: "Minns bara att jag var med dig, sen minns jag inget.", canSend: true },
        { sender: "Alex", text: "Sist jag såg dig sprang du mot Pildammstornet med en svart väska. Du skrek att du behövde gömma pengar eller nåt. Du hade gps framme medan du sprang. (Du kan kolla där.)" },
        { sender: "Alex", text: "Minns du vad som hände sen? Har du kollat anteckningar typ??", none: true },
    ],
    friendMessagesNormal: [
        { sender: "Spelaren", text: "Vi kör svamppasta, hittade riktigt fina svampar på torget", time: "Igår 13:37", normal: true },
        { sender: "Alex", text: "Det blir dunder", normal: true },
        { sender: "Spelaren", text: "Har några öl i kylen, köper du en flaska vin?", normal: true },
        { sender: "Alex", text: "Jag fixar!", normal: true },
        { sender: "Spelaren", text: "Kom vid 18, ta på dig något fint", time: "Igår 14:08", normal: true },
        { sender: "Alex", text: "Vad var det för svampar igår, har mått riktigt konstigt.", normal: true, time: "Idag 9:32" },
        { sender: "Spelaren", text: "Så sjukt… vaknade precis upp på Möllan, tror jag hallucinerade.", canSend: true, normal: true },
    ],
    dealer: [
        { sender: "Okänt nummer", text: "Du behöver hålla pengarna tills imorgon, jag har problem med polisen. Behöver natten för att fixa lite grejer.", time: "Igår 23:07" },
        { sender: "Spelaren", text: "Har ångrat mig, vill inte tvätta några pengar, vad är ditt nummer så kan jag swosha tillbaka", time: "Idag 00:37" },
        { sender: "Spelaren", text: "Hallå??? Är för full för detta", time: "Idag 01:18" },
        { sender: "Okänt nummer", text: "Du måste hålla pengarna till imorgon, polisen är efter mig.", time: "Idag 01:33" },
        { sender: "Spelaren", text: "Tror du råkat förlita dig på fel person, har inte några pengar kvar", time: "Idag 02:35" },
        { sender: "Okänt nummer", text: "Jag ska ha mina 20 000kr imorgon kl 15. Annars blir det konsekvenser.", time: "Idag 03:41" },
        { sender: "Okänt nummer", text: "Triangelkupolen norra ingången", none: true },
        { sender: "Okänt nummer", text: "Det är för mycket folk. Måste dra. Jag skickar mitt nummer sen. Om du inte har fixat fram mina pengar då så kommer det bli stora konsekvenser", none: true },
        { sender: "Okänt nummer", text: "Ge mig mina pengar. Mitt nummer är Möllevångstorgets staty, bussen och Indian express.", none: true },
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

    links: [
        "https://maps.app.goo.gl/KFPM8gd2QauXmBos7",
        "https://maps.app.goo.gl/654HZT5LYKPHNxpV9",
        "https://maps.app.goo.gl/ZrHxUuAvkdChWfNQ8",
        "https://maps.app.goo.gl/cpU12pQSt9nTrdQPA"
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
    ],

    efterTexter: [
        { title: 'Spelproducenter', names: ['Grupp 1'], position: 'left' },
        { title: 'Speldesigners', names: ['Ella Ahlstedt'], position: 'left' },
        { title: 'Programmerare', names: ['Leo Mühl', 'Ella Ahlstedt'], position: 'left' },
        { title: 'Grafiska designers och animatörer', names: ['Petter Hedberg', 'Julia Blomqvist', 'Junia Axelsson Sandberg', 'Ella Ahlstedt', 'Leo Mühl'], position: 'under' },
        { title: 'Ljuddesigner', names: ['Julia Blomqvist'], position: 'left' },
        { title: 'Manusförfattare och berättelse utvecklare', names: ['Petter Hedberg', 'Julia Blomqvist', 'Junia Axelsson Sandberg', 'Ella Ahlstedt', 'Leo Mühl'], position: 'under' },
        { title: 'Crossmedia-samarbeten', names: ['Phillips, T. (Director). (2009). The hangover [Film]. Warner Bros. Pictures.'], position: 'under' },
        { title: 'Testare och QA (Quality Assurance)', names: ['Teamet som utförde tester av spelet och crossmedia-komponenterna'], position: 'under' },
        { title: 'Marknadsföring och PR', names: ['Petter Hedberg', 'Julia Blomqvist', 'Junia Axelsson Sandberg'], position: 'under' },
        {
            title: 'Partners och licensgivare', names: [
                'Figma', 'Github', 'Visual Studio Code', 'Deno Deploy', 'Adobe Creative Cloud',
                'Garageband', 'Canva', 'Suno', 'Elevenlabs.com', 'Freesound.org',
                'Trello.com', 'Slack.com', 'Miro.com', 'Pexels.com (Foto i park av Mehmet Yasin Kabakli)'
            ], position: 'under'
        },
        {
            title: 'Ljudeffekter', names: [
                {
                    sName: "Dirty Noise Groove 1.wav by DiscordantScraps",
                    link: "https://freesound.org/s/502536/",
                    license: "Attribution 4.0"
                },
                {
                    sName: "getting hung up on three beeps.wav by lyd4tuna",
                    link: "https://freesound.org/s/453267/",
                    license: "Creative Commons 0"
                },
                {
                    sName: "Brus_NovationNova.wav by andreas",
                    link: "https://freesound.org/s/28275/",
                    license: "Attribution 4.0"
                },
                {
                    sName: "Busy Street Car Truck Peoples Mastered by szegvari",
                    link: "https://freesound.org/s/518631/",
                    license: "Creative Commons 0"
                },
                {
                    sName: "Bad Radio Noise (processed) by unfa",
                    link: "https://freesound.org/s/219822/",
                    license: "Creative Commons 0"
                },
                {
                    sName: "Error (Disaparaging Chimes) by SilverIllusionist",
                    link: "https://freesound.org/s/664038/",
                    license: "Attribution 4.0"
                },
                {
                    sName: "BANGIN' TECHNO BEAT LOOP 130 BPM.wav by Cyclez",
                    link: "https://freesound.org/s/504993/",
                    license: "Attribution 4.0"
                },
                {
                    sName: "Police Siren by TitanKaempfer",
                    link: "https://freesound.org/s/746302/",
                    license: "Creative Commons 0"
                },
                {
                    sName: "police2.wav by guitarguy1985",
                    link: "https://freesound.org/s/70938/",
                    license: "Creative Commons 0"
                },
                {
                    sName: "MISC Police Siren Various Stationary 001.wav by conleec",
                    link: "https://freesound.org/s/159754/",
                    license: "Creative Commons 0"
                },
                {
                    sName: "Car Driving By at Night by qubodup",
                    link: "https://freesound.org/s/219557/",
                    license: "Attribution 4.0"
                },
                {
                    sName: "Jingle_Win_Synth_00.wav by LittleRobotSoundFactory",
                    link: "https://freesound.org/s/274180/",
                    license: "Attribution 4.0"
                }
            ], position: 'under'
        },
        { title: 'Röster och skådespelare', names: ['AI-genererad röst från Eleven Labs'], position: 'under' },
        { title: 'Finansiärer och stöd', names: ['Malmö Universitet (Materiellt stöd)', 'Johannes Karlsson (Mentalt stöd)'], position: 'under' },
        { title: 'Inspirationskällor och tack', names: ['Tack till Baksmällan-filmerna som inspirerat oss till denna idé. Tack till Möllantigern, utan den hade inte spelet varit där det är idag.'], position: 'under' },
        { title: 'Community och spelare', names: ['Tack till våra klasskompisar som bidragit med feedback eller varit en del av spelets utvecklingsresa.'], position: 'under' }
    ]
}