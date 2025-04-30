const log = document.querySelector("#log");


//type = findBag, swosh, phoneCall
export function renderIphonePopUp(parent, type, texts, sound) {
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
        default:
            break;
    }
}

function findBag(parent) {
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
    bottomHeaderText.classList.add("startGame")
    parent.id = "findBag";

    topHeaderText.innerHTML = "Leta efter väska";
    topText.innerHTML = "(väska med pengar, veldigt viktigt)";
    bottomHeaderText.innerHTML = "Börja leta";
    // bottomText.innerHTML = "50m";

    parent.appendChild(top);
    parent.appendChild(bottom);
    top.appendChild(topHeaderText);
    top.appendChild(topText);
    bottom.appendChild(bottomHeaderText);
    bottom.appendChild(bottomText);

    bottom.addEventListener("click", getUserLocation)


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
    bottomHeaderText.classList.add("searching");
    bottomText.classList.add("searching");
    bottomHeaderText.innerHTML = "Gå mot Pildammstornet";


    // brevid pildammstornet 55.589879, 12.997736
    const destination = {
        latitude: 55.608937,
        longitude: 12.994438
    }

    const distanceElement = document.getElementById('distance');

    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    const distance = calculateDistance(userLat, userLon, destination.latitude, destination.longitude);

    //meter
    if (distance <= 2) {
        //
    } else {
        distanceElement.textContent = `${Math.round(distance)}m`;
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(updateDistance, showError, {
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
function phoneCall(parent) {
    const top = document.createElement("div");
    const bottom = document.createElement("div");
    const topHeader = document.createElement("p");
    const topText = document.createElement("p");
    const bottomButton = document.createElement("button");

    top.className = "popup-top";
    bottom.className = "popup-bottom";
    topHeader.className = "popup-header-text";
    topText.className = "popup-header-text";
    bottomButton.className = "popup-button";
    parent.id = "phoneCall";

    topHeader.innerHTML = "Samtals fel";
    topText.innerHTML = "Detta samtal är krypterat, för att avkryptera behöver du genomgå en 100 stegsverifiering. ";
    bottomButton.innerHTML = "Acceptera";

    parent.appendChild(top);
    parent.appendChild(bottom);
    top.appendChild(topHeader);
    top.appendChild(topText);
    bottom.appendChild(bottomButton);

    bottom.addEventListener("click", () => {
        topText.remove();

        topHeader.innerHTML = "PEDOmeter";
        bottomButton.innerHTML = "100";
        bottomButton.className = "pedometer-text";
        bottom.className = "pedometer-bottom";
        top.className = "pedometer-top";

        if (typeof DeviceMotionEvent.requestPermission === 'function') {
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

let stepsRemaining = 100;
let stepThreshold = 25; // justera tröskel vid behov
let stepCooldown = false;


function updateCounter() {
    const counter = document.querySelector(".pedometer-text");
    counter.innerHTML = `${stepsRemaining}`;
}

function handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);

    if (magnitude > stepThreshold && !stepCooldown) {
        stepsRemaining = Math.max(0, stepsRemaining - 1);
        updateCounter();

        stepCooldown = true;
        setTimeout(() => {
            stepCooldown = false;
        }, 400); // förhindra dubbelräkning, justera vid behov
    }

    if (stepsRemaining === 0) {
        window.removeEventListener("devicemotion", handleMotion);
        alert("Du har gått 100 steg!");
    }
}