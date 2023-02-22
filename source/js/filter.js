
const DEFAULT_TYPE = 'any';

const PriceRange = {
  LOW_PRICE: 10000,
  MIDDLE_PRICE: 50000,
};

const PriceTypes = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const mapFilters = document.querySelector('.map__filters');
const type = mapFilters.querySelector('#housing-type');
const price = mapFilters.querySelector('#housing-price');
const rooms = mapFilters.querySelector('#housing-rooms');
const guests = mapFilters.querySelector('#housing-guests');
const features = mapFilters.querySelector('#housing-features');

const filterType = (ad) => type.value === ad.offer.type || type.value === DEFAULT_TYPE;

const filterRooms = (ad) => +rooms.value === ad.offer.rooms || rooms.value === DEFAULT_TYPE;

const filterGuests = (ad) => +guests.value === ad.offer.rooms || guests.value === DEFAULT_TYPE;

const filterPrice = (ad) => {
  switch (price.value) {
    case PriceTypes.LOW:
      return ad.offer.price < PriceRange.LOW_PRICE;
    case PriceTypes.MIDDLE:
      return ad.offer.price >= PriceRange.LOW_PRICE && ad.offer.price <= PriceRange.MIDDLE_PRICE;
    case PriceTypes.HIGH:
      return ad.offer.price > PriceRange.MIDDLE_PRICE;

    default : return true;
  }
};

const filterData = (data) => {
  const checkedFeatures = features.querySelectorAll('.map__checkbox:checked');

  const filterFeatures = (ad) => {
    if (ad.offer.features) {
      return [ ... checkedFeatures].every((feature) => ad.offer.features.includes(feature.value));
    }
    return false;
  };

  return data.filter((ad) => filterType(ad)
    && filterRooms(ad)
    && filterGuests(ad)
    && filterPrice(ad)
    && filterFeatures(ad),
  )
};

export {filterData};
