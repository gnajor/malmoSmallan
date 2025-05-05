import { progressionState } from "../index.js";
import { gameData } from "../pageHandler/gameData.js";
import { pageHandler } from "../pageHandler/pageHandler.js";

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
            const currentStageCoords = gameData.mapCords[progressionState.currentStage].coords;
            
            const distance = calculateDistance(
                latlong[0], latlong[1]
                ,latlong[0], latlong[1]
            );



       /*      const distance = calculateDistance(
                latlong[0], latlong[1]
                ,currentStageCoords[0], currentStageCoords[1]
            ); */

            if(distance < 50){
                console.log(progressionState.currentStageState)

                if(progressionState.currentStageState === "gps"){

                    switch(progressionState.currentStage){
                        case "start":
                            break;
                        case "park":
                            pageHandler.handleFindBagRender();
                            pageHandler.handleProgression();
                    }
                }
            }
        },
        (error) => {
            console.error("background location error", error);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 10000
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