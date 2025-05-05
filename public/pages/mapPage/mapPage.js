import { renderFooter } from "../../components/footer/footer.js";
import { addLocationListener } from "../../logic/locationWatcher.js";

let map;
let routeControl;
let userMarker = null;

export function renderMapPage(parent, cords){
    parent.innerHTML = `<div id="map-page">
                            <div id="map"></div>
                            <footer></footer>
                        </div>`;

    renderFooter(parent.querySelector("footer"));
    
    map = L.map('map').setView([55.48, 13.49], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);


    function updateMapLocation(userCords){
        const userPosition = L.latLng(userCords[0], userCords[1]);
        const destination = L.latLng(cords[0], cords[1]);
    
        if (!userMarker) {
            userMarker = L.circleMarker(userPosition, {
                radius: 8,
                fillColor: "#3388ff",
                color: "#ffffff",
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).addTo(map);
        } else {
            userMarker.setLatLng(userPosition); 
        }
    
        if (routeControl) {
            routeControl.setWaypoints([userPosition, destination]);
        }
        else{
            routeControl = L.Routing.control({
                waypoints: [userPosition, destination],
                createMarker: (i, wp, n) => {
                    if (i === 0) return null; 
                    return L.marker(wp.latLng);
                },
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                show: false,
                lineOptions: {
                    addWaypoints: false,
                    styles: [{ color: '#3388ff', weight: 5 }]
                }
            }).addTo(map);
        }
        /*     routeControl.on('routingstart', showLoading);
        routeControl.on('routesfound', hideLoading);
        routeControl.on('routingerror', hideLoading); */
    }
    addLocationListener(updateMapLocation);
}