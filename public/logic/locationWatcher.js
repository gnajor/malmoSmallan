import { renderNotification } from "../components/footer/notification.js";
import { progressionState } from "../index.js";
import { gameData } from "../pageHandler/gameData.js";
import { pageHandler, pageState } from "../pageHandler/pageHandler.js";

let backgroundWatchId = null;
const locationListeners = new Set();

export function startBackgroundWatcher(){
    if(backgroundWatchId !== null){
        return;
    }

    backgroundWatchId = navigator.geolocation.watchPosition(
        (position) => {
            const latlong = [position.coords.latitude, position.coords.longitude];
            locationListeners.forEach(listener => listener(latlong));
            let currentStageCoords = gameData.mapCords[0];
            let func = null
            let startChecking = false;
            
            if(progressionState.checkStateKey("receive-first-message-notice", "userSentMessage")  && !progressionState.checkStateKey("park-gps", "gpsReached")){
                currentStageCoords = gameData.mapCords[1];
                startChecking = true;
                func = () => {
                    progressionState.isUnlocked("park-gps", "gpsReached");
                    pageHandler.handleFindBagRender();
                }
            }

            else if(progressionState.checkStateKey("receive-position-dealer-notice", "pressed") && !progressionState.checkStateKey("triangle-gps", "gpsReached")){
                currentStageCoords = gameData.mapCords[2];
                startChecking = true;
                func = () => {
                    progressionState.isUnlocked("triangle-gps", "gpsReached");

                    //shouldn't be here
                    pageState.setAppUnlocked("Anteckningar");
                    progressionState.isUnlocked("notes-minigame", "notesAppUnlocked");
                    /* pageHandler.handleDealerNotificationRender(); */
                }
            }

            else if(progressionState.checkStateKey("notes-minigame", "notesMinigameCompleted") && !progressionState.checkStateKey("market-gps", "gpsReached")){
                currentStageCoords = gameData.mapCords[3];
                startChecking = true;
                func = () => {
                    progressionState.isUnlocked("market-gps", "gpsReached");
                    pageHandler.handlePaymentNotificationRender();
                }
            }
        
            const distance = calculateDistance(
                latlong[0], latlong[1],
                latlong[0], latlong[1]
                /* currentStageCoords[0], currentStageCoords[1] */
            );

            if(distance < 100 && startChecking){
                func();
            }

        },
        (error) => {
            console.error("background location error", error);
        },
        {
            enableHighAccuracy: true,
        }
    )
}

export function addLocationListener(func){
    locationListeners.add(func);
}

export function removeLocationListener(func){
    locationListeners.delete(func);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180; // Convert lat1 from degrees to radians
    const φ2 = lat2 * Math.PI / 180; // Convert lat2 from degrees to radians
    const Δφ = (lat2 - lat1) * Math.PI / 180; // Latitude difference in radians
    const Δλ = (lon2 - lon1) * Math.PI / 180; // Longitude difference in radians

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Result in meters
    return distance; // Return distance in meters
}