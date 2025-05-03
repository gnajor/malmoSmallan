import * as L from 'https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js';

export function renderMapPage(parent){
    parent.innerHTML = `<div id="map"></div>`

    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap & CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);
      
      // Add a marker
      L.marker([51.505, -0.09]).addTo(map)
        .bindPopup('Waypoint')
        .openPopup();
   /*  parent.innerHTML = `<div id="map"></div>`; */

/*     var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map); */
}