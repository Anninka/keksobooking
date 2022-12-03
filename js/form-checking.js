
// const MAX_PRICE = 100000;
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

/**
 * Функция для каждого типа жилья прописывает минимальную стоимость в плейсхолдере и устанавливает значение min для инпута.
 * @return {void}
 */
const checkPrice = () => {
  price.placeholder = MIN_PRICE[type.value];
  price.min = MIN_PRICE[type.value];
}

type.addEventListener('change', checkPrice);

/**
 * Функция сопоставляет время въезда и выезда
 * @param {evt} evt
 */
const checkTime = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
}

time.addEventListener('change', checkTime);
