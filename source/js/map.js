
import { getInactiveState, getActiveState } from './page-state.js';
import { createUserCard } from './cards.js';
import { getData } from './api.js';
import { filterData } from './filter.js';
import { debounce } from './util.js';

const map = L.map('map-canvas');
const filters = document.querySelector('.map__filters');
const address = document.querySelector('#address');

const COORDINATES_OF_CENTER = {
  lat: 35.67333,
  lng: 139.75056,
};

const NUMBER_OF_ADS = 10;

const ZOOM = 13;

getInactiveState();

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

const markerGroup = L.layerGroup().addTo(map);

const clearMarkerGroup = () => {
  markerGroup.clearLayers();
};

const showPin = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: pinIcon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(
      createUserCard(ad),
    );
}

const getSimilarAds = (ads) => {
  clearMarkerGroup();
  ads.slice(0, NUMBER_OF_ADS).forEach(showPin);
};

map.on('load', () => {
  getActiveState();
  getData((ads) => {
    filters.addEventListener('change', debounce(
      () => {
        getSimilarAds(filterData(ads))
      },
    ));
    getSimilarAds(ads);
  });
})
  .setView(COORDINATES_OF_CENTER, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainMarker.addTo(map);

address.value = `${mainMarker.getLatLng().lat}, ${mainMarker.getLatLng().lng}`;

mainMarker.on('moveend', () => {
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
});

const resetMap = () => {
  mainMarker.setLatLng(COORDINATES_OF_CENTER);
  address.value = `${COORDINATES_OF_CENTER.lat}, ${COORDINATES_OF_CENTER.lng}`;
  map.setView(COORDINATES_OF_CENTER, ZOOM);
  map.closePopup();
  getData((ads) => {
    getSimilarAds(ads);
  });
  filters.reset();
}

export { resetMap };
