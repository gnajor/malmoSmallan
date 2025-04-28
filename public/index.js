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
// renderIphonePopUp(document.querySelector("#wrapper"), 'findBag');



const destination = {
    latitude: 55.608937,
    longitude: 12.994438
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRadians = (degrees) => degrees * Math.PI / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function updateDistance(position) {
    const destination = {
        latitude: 55.608937,
        longitude: 12.994438
    }

    const distanceElement = document.getElementById('distance');
    const coordsElement = document.getElementById('coords');

    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    const distance = calculateDistance(userLat, userLon, destination.latitude, destination.longitude);
    coordsElement.textContent = `Lat: ${userLat.toFixed(6)}, Lon: ${userLon.toFixed(6)}`;

    if (distance <= 2) {
        distanceElement.textContent = "Du är framme vid destinationen!";
    } else {
        distanceElement.textContent = `${Math.round(distance)}m kvar!!!!`;
    }
}

function showError(error) {
    const log = document.getElementById('log');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            log.textContent = "Användaren nekade begäran om geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            log.textContent = "Positionen är inte tillgänglig.";
            break;
        case error.TIMEOUT:
            log.textContent = "Tidsgränsen för begäran överskreds.";
            break;
        default:
            log.textContent = "Ett okänt fel inträffade.";
            break;
    }
}

let locationInterval;

document.getElementById('startBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        locationInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(updateDistance, showError, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            });
        }, 5000); // Hämta plats var 5:e sekund
    } else {
        document.getElementById('log').textContent = "Geolocation stöds inte av din webbläsare.";
    }
});
