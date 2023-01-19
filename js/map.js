
import { getInactiveState, getActiveState } from './page-state.js';
import { createUserCard } from './cards.js';
import { getData } from './api.js';

const map = L.map('map-canvas');
const address = document.querySelector('#address');

const COORDINATES_OF_CENTER = {
  lat: 35.67333,
  lng: 139.75056,
};

const NUMBER_OF_ADS = 10;

const ZOOM = 13;

getInactiveState();

map.on('load', () => {
  getActiveState();
})
  .setView(COORDINATES_OF_CENTER, ZOOM);

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
  COORDINATES_OF_CENTER,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

const showPins = (adList) => {
  adList.forEach((adItem) => {
    const marker = L.marker(
      {
        lat: adItem.location.lat,
        lng: adItem.location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createUserCard(adItem),
      );
  });
}

getData((ads) => showPins(ads.slice(0, NUMBER_OF_ADS)));

address.value = `${mainMarker.getLatLng().lat}, ${mainMarker.getLatLng().lng}`;

mainMarker.on('moveend', () => {
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
});

const resetMap = () => {
  mainMarker.setLatLng(COORDINATES_OF_CENTER);
  address.value = `${COORDINATES_OF_CENTER.lat}, ${COORDINATES_OF_CENTER.lng}`;
  map.setView(COORDINATES_OF_CENTER, ZOOM);
  map.closePopup();
}

export { resetMap };
