import { renderFooter } from "../../components/footer/footer.js";
import { addLocationListener, removeLocationListener } from "../../logic/locationWatcher.js";

let map;
let routeControl;
let userMarker = null;

export function renderMapPage(parent, cords, exists = true){
    parent.innerHTML = `<div id="map-page">
                            <div id="map"></div>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"), () => {
        removeLocationListener(updateMapLocation);
    });
    
    map = L.map('map').setView([55.6041, 12.9970], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);


    function updateMapLocation(userCords){
        const userPosition = L.latLng(userCords[0], userCords[1]);
        const destination = L.latLng(cords[0], cords[1]);
    
        if(!userMarker) {
            userMarker = L.circleMarker(userPosition, {
                radius: 8,
                fillColor: "#3388ff",
                color: "#ffffff",
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(map);
        }
        else{
            userMarker.setLatLng(userPosition); 
        }
    
        if(routeControl) {
            map.removeControl(routeControl);
        }

        routeControl = L.Routing.control({
            waypoints: [userPosition, destination],
            createMarker: (i, wp, n) => {
                if (i === 0) return null; 
                return L.marker(wp.latLng);
            },
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            show: false,
            lineOptions: {
                addWaypoints: false,
                styles: [{ color: '#3388ff', weight: 5 }]
            }
        }).addTo(map);
    }

    if(exists){
        addLocationListener(updateMapLocation);
    }
    else{
        parent.querySelector("#map").classList.add("no-work");
    }
}