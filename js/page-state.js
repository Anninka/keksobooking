
const adForm = document.querySelector('.ad-form');
const adFormFieldset = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldset = mapFilters.querySelectorAll('.map__filter, .map__features');

/**
 * Функция реализует неактивное состояние страницы до инициализации карты
 * @return {void}
 */
const getInactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  adFormFieldset.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  })

  mapFiltersFieldset.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  })
};

/**
 * Функция реализует активное состояние страницы, после инициализации карты
 * @return {void}
 */
const getActiveState = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  adFormFieldset.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  })

  mapFiltersFieldset.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  })
};

export {getInactiveState, getActiveState};
