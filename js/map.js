
import { getInactiveState, getActiveState } from './page-state.js';
import { createCoordinates, createUserCards } from './cards.js';

const map = L.map('map-canvas');
const address = document.querySelector('#address');

const MAP_CENTER = {
  lat: 35.68173,
  lng: 139.75393,
};

const ZOOM = 13;

const coordinates = createCoordinates();

getInactiveState();

map.on('load', () => {
  getActiveState();
})
  .setView(MAP_CENTER, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './leaflet/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  MAP_CENTER,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

coordinates.forEach((coordinate, index) => {
  const marker = L.marker({
    lat: coordinate.lat,
    lng: coordinate.lng,
  },
  {
    icon: pinIcon,
  });

  marker
    .addTo(map)
    .bindPopup(
      createUserCards().childNodes[index],
    );
});



address.value = `${mainMarker.getLatLng().lat}, ${mainMarker.getLatLng().lng}`;

mainMarker.on('moveend', () => {
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
});



// const pinIcon = L.icon({

// });
