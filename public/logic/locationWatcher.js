let backgroundWatchId = null;
const locationListeners = new Set();

export function startBackgroundWatcher(){
    if(backgroundWatchId !== null){
        return;
    }

    backgroundWatchId = navigator.geolocation.watchPosition(
        (position) => {
            const latlong = [position.coords.latitude, position.coords.longitude];
            locationListeners.forEach(listener => listener(latlong))
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