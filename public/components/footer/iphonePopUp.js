import { progressionState } from "../../index.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";

const log = document.querySelector("#log");
let watchPosition = null;


//type = findBag, swosh, phoneCall, startVy
export function renderIphonePopUp(parent, type, title, text, buttonText) {
    const backgroundDarken = document.createElement("div");
    const popUpCon = document.createElement("div");
    popUpCon.className = "popup-con";
    backgroundDarken.className = "background-darken";
    parent.appendChild(backgroundDarken);
    parent.appendChild(popUpCon);

    switch (type) {
        case "findBag":
            findBag(popUpCon);
            break;
        case "swosh":
            swosh(popUpCon);
            break;
        case "phoneCall":
            phoneCall(popUpCon);
            break;
        case "startVy":
            startVy(popUpCon, backgroundDarken);
            break;
        case "other":
            other(popUpCon, backgroundDarken, title, text, buttonText);
            break;
        default:
            break;
    }
}

function findBag(parent) {
    progressionState.isUnlocked("tiger-find-minigame", "popup");

    const bg = document.querySelector(".background-darken");
    const top = document.createElement("div");
    const bottom = document.createElement("button");
    const topHeaderText = document.createElement("p");
    const topText = document.createElement("p");
    const bottomHeaderText = document.createElement("p");
    const bottomText = document.createElement("p");

    top.className = "popup-top";
    bottom.className = "popup-bottom";
    topHeaderText.className = "popup-header-text";
    topText.className = "popup-text";
    bottomHeaderText.className = "popup-headerB-text";
    bottomText.className = "popup-text";
    bottomText.id = "distance";
    bottomHeaderText.classList.add("startGame");
    parent.id = "findBag";
    bg.id = "findBagBg";

    topHeaderText.innerHTML = "Leta efter väska";
    topText.innerHTML = "(väska med pengar, veldigt viktigt)";
    bottomHeaderText.innerHTML = "Börja leta";

    parent.appendChild(top);
    parent.appendChild(bottom);
    top.appendChild(topHeaderText);
    top.appendChild(topText);
    bottom.appendChild(bottomHeaderText);
    bottom.appendChild(bottomText);

    bottom.addEventListener("click", () => {
        getUserLocation();
    }, {once: true});
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Jordens radie i meter
    const toRadians = (degrees) => degrees * Math.PI / 180;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Avstånd i meter
}


function updateDistance(position) {
    const bottomHeaderText = document.querySelector(".popup-headerB-text");
    const bottomText = document.querySelector("#distance");
    bottomHeaderText.classList.remove("startGame");
    bottomHeaderText.innerHTML = "Gå mot Pildammstornet";

    // brevid pildammstornet 55.589879, 12.997736
    const destination = {
        latitude: 55.589879,
        longitude: 12.997736
    }

    const distanceElement = document.getElementById('distance');

    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    const distance = calculateDistance(userLat, userLon, userLat, userLon,/* destination.latitude, destination.longitude */ );

    //meter
    if (distance < 2) {
        navigator.geolocation.clearWatch(watchPosition);

        if (!document.querySelector(".popup-button")) {
            const popupCon = document.querySelector(".popup-con");
            const top = document.querySelector(".popup-top");
            const bottom = document.querySelector(".popup-bottom");

            bottom.remove();

            const distanceText = document.createElement("p");
            const bottomButton = document.createElement("button");

            distanceText.innerHTML = "0m";
            bottomButton.innerHTML = "Plocka upp";

            bottomButton.className = "popup-button popup-pick-up";
            bottomButton.id = "popup-pick-up";
            distanceText.id = "popup-distance-text";

            top.appendChild(distanceText);
            popupCon.appendChild(bottomButton);

            bottomButton.addEventListener("click", () => {
                popupCon.remove();

                const parent = document.querySelector("#wrapper");
                const bg = document.querySelector(".background-darken");
                const tiger = document.createElement("img");
                const light = document.createElement("img");
                const lightBg = document.createElement("div");

                light.setAttribute("src", "./media/find-bag-icons/light4.png");
                tiger.setAttribute("src", "./media/find-bag-icons/tiger2.png");

                light.id = "findBagLight";
                tiger.id = "findBagTiger";
                lightBg.id = "findBagLightBg";

                const audio = new Audio("../../media/audio-files/tigerSound.mp3");
                audio.play();

                parent.appendChild(light);
                parent.appendChild(tiger);
                parent.appendChild(lightBg);

                setTimeout(() => {
                    tiger.classList.add("showTiger");
                    lightBg.classList.add("showLightBg");
                }, 100);

                tiger.addEventListener("click", () => {
                    tiger.classList.add("hideFindBag");
                    lightBg.classList.add("hideFindBag");
                    light.classList.add("hideFindBag");

                    light.addEventListener("transitionend", () => {
                        progressionState.isUnlocked("tiger-find-minigame", "tigerPopup");
                        pageHandler.handleBeforePageRender();
                     /*    pageHandler.handleProgression();
                        pageHandler.handleBeforePageRender(); */
                    });
                });
            });
        }
    } else {
        distanceElement.textContent = `${Math.round(distance)}m`;
    }
}

function getUserLocation(){
    if (navigator.geolocation) {
        watchPosition = navigator.geolocation.watchPosition(updateDistance, showError, {
            enableHighAccuracy: true
        });
    } else {
        log.innerHTML = "Geolocation stöds inte av din webbläsare.";
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            log.innerHTML = "Användaren nekade begäran om geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            log.innerHTML = "Positionen är inte tillgänglig.";
            break;
        case error.TIMEOUT:
            log.innerHTML = "Tidsgränsen för begäran överskreds.";
            break;
        case error.UNKNOWN_ERROR:
            log.innerHTML = "Ett okänt fel inträffade.";
            break;
    }
}

// swosh
function swosh(parent) {
    const top = document.createElement("div");
    const bottom = document.createElement("div");
    const topHeader = document.createElement("p");
    const topDate = document.createElement("p");
    const topFirstCon = document.createElement("div");
    const topSecCon = document.createElement("div");
    const topNumber = document.createElement("p");
    const topMoney = document.createElement("p");
    const bottomButton = document.createElement("p");

    top.className = "popup-top";
    bottom.className = "popup-bottom";
    topHeader.className = "popup-header-text";
    topFirstCon.className = "popup-topF-con";
    topSecCon.className = "popup-topS-con";
    topDate.className = "popup-date";
    topNumber.className = "popup-number";
    topMoney.className = "popup-money";
    bottomButton.className = "popup-button";
    parent.id = "swosh";

    const now = new Date();
    const months = [
        "januari", "februari", "mars", "april", "maj", "juni",
        "juli", "augusti", "september", "oktober", "november", "december"
    ];
    const day = now.getDate().toString().padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${day} ${month} ${year}. Kl ${hours}:${minutes}`;


    topHeader.innerHTML = "Din betalning är skickad";
    topDate.innerHTML = formattedTime;
    topNumber.innerHTML = "+46 19 303 42";
    topMoney.innerHTML = "10 000kr";
    bottomButton.innerHTML = "Stäng";


    parent.appendChild(top);
    parent.appendChild(bottom);
    top.appendChild(topFirstCon);
    top.appendChild(topSecCon);
    topFirstCon.appendChild(topHeader);
    topFirstCon.appendChild(topDate);
    topSecCon.appendChild(topNumber);
    topSecCon.appendChild(topMoney);
    bottom.appendChild(bottomButton);

    bottom.addEventListener("click", () => {
        document.querySelector(".background-darken").remove();
        parent.remove();
    });
}

// phoneCall
let stepsRemaining = 0; //15
let stepThreshold = 0; //12
let stepCooldown = false;

function updateCounter() {
    const fill = document.querySelector(".progress-fill");
    if (fill) {
        const totalSteps = 15;
        const stepsTaken = totalSteps - stepsRemaining;
        const percentage = (stepsTaken / totalSteps) * 100;
        fill.style.width = `${percentage}%`;
        showCompletionPopup();
    }
}

const handleMotion = (event) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);

    if (magnitude > stepThreshold && !stepCooldown) {
        stepsRemaining = Math.max(0, stepsRemaining - 1);
        updateCounter();

        stepCooldown = true;
        setTimeout(() => {
            stepCooldown = false;
        }, 400);
    }

    if (stepsRemaining === 0) {
        window.removeEventListener("devicemotion", handleMotion);
       /*  showCompletionPopup();
        pageHandler.handleProgression();      */
    }
}

function showCompletionPopup() {
    const top = document.querySelector(".popup-top");
    const bottom = document.querySelector(".popup-bottom");
    const topHeader = document.querySelector(".popup-header-text");
    const topText = document.querySelector(".popup-text");
    const bottomButton = document.querySelector(".popup-button");
    const progressWrapper = document.querySelector(".progress-wrapper");
    const progressFill = document.querySelector(".progress-fill");

    topText.style.display = "block";
    bottom.style.display = "flex";
    progressWrapper.style.display = "none";
    progressFill.style.display = "none";
    top.style.borderBottom = "1px solid #E7E7E7";

    topHeader.innerHTML = "Avkryptering lyckades";
    topText.innerHTML = "Samtalet finns nu bland röstmeddelanden.";
    bottomButton.innerHTML = "Stäng";

    bottom.addEventListener("click", () => {        
        progressionState.isUnlocked("decryptCall", "decryptedCall");
        pageHandler.handleBeforePageRender();
    });
}

function phoneCall(parent) {
    const audio = new Audio("../../media/audio-files/errorSound.mp3");
    audio.play();
    const top = document.createElement("div");
    const bottom = document.createElement("div");
    const topHeader = document.createElement("p");
    const topText = document.createElement("p");
    const bottomButton = document.createElement("button");

    top.className = "popup-top";
    bottom.className = "popup-bottom";
    topHeader.className = "popup-header-text";
    topText.className = "popup-text";
    bottomButton.className = "popup-button";
    parent.id = "phoneCall";

    topHeader.innerHTML = "Samtals fel";
    topText.innerHTML = "Avkryptera meddelandet genom att gå 10 steg och skaka mobilen.";
    bottomButton.innerHTML = "Acceptera";

    parent.appendChild(top);
    parent.appendChild(bottom);
    top.appendChild(topHeader);
    top.appendChild(topText);
    bottom.appendChild(bottomButton);

    bottom.addEventListener("click", () => {
        topText.style.display = "none";
        bottom.style.display = "none";
        top.style.borderBottom = "none";

        const progressWrapper = document.createElement("div");
        const progressFill = document.createElement("div");

        progressWrapper.className = "progress-wrapper";
        progressFill.className = "progress-fill";

        top.appendChild(progressWrapper);
        progressWrapper.appendChild(progressFill);

        topHeader.innerHTML = "Räknar steg";

        if (typeof DeviceMotionEvent?.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission().then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("devicemotion", handleMotion);
                }
            });
        } else {
            window.addEventListener("devicemotion", handleMotion);
        }
        updateCounter();
    });
}

// startVy

function startVy(parent, bg) {
    const top = document.createElement("div");
    const bottom = document.createElement("div");
    const topHeader = document.createElement("p");
    const topText = document.createElement("p");
    const bottomButton = document.createElement("button");

    top.className = "popup-top";
    bottom.className = "popup-bottom";
    topHeader.className = "popup-header-text";
    topText.className = "popup-text";
    bottomButton.className = "popup-button";
    parent.id = "phoneCall";
    bg.id = "startVyBg";

    topHeader.innerHTML = "Malmösmällan";
    topText.innerHTML = `
    En kall, tidig sommarmorgon sveper över Malmö, du vaknar plötsligt upp mitt på Möllevångstorget. Utan några minnesbilder från gårdagen. Allt du har på dig är din telefon, det enda verktyget som kan hjälpa dig ta reda på vad som egentligen hände den föregående natten.
    <br/><br/><span class="bold">Glöm inte att tillåta platsinformation och slå på ljudet på din telefon för den allra bästa spelupplevelsen.</span>
    <br/><br/>Lycka till!
    `;
    bottomButton.innerHTML = "Börja spelet";

    parent.appendChild(top);
    parent.appendChild(bottom);
    top.appendChild(topHeader);
    top.appendChild(topText);
    bottom.appendChild(bottomButton);

    bottom.addEventListener("click", () => {
        parent.remove();
        bg.remove();
    });
}

// Other
function other(parent, bg, title, text, buttonText) {
    const top = document.createElement("div");
    const bottom = document.createElement("div");
    const topHeader = document.createElement("p");
    const topText = document.createElement("p");
    const bottomButton = document.createElement("button");

    top.className = "popup-top";
    bottom.className = "popup-bottom";
    topHeader.className = "popup-header-text";
    topText.className = "popup-text";
    bottomButton.className = "popup-button";
    parent.id = "other";

    topHeader.innerHTML = title;
    topText.innerHTML = text;
    bottomButton.innerHTML = buttonText;

    parent.appendChild(top);
    parent.appendChild(bottom);
    top.appendChild(topHeader);
    top.appendChild(topText);
    bottom.appendChild(bottomButton);

    bottom.addEventListener("click", () => {
        parent.remove();
        bg.remove();
    });
}