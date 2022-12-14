
// const MAX_PRICE = 100000;
const MIN_PRICE = {
  bungalow: 'от 0',
  flat: 'от 1000',
  hotel: 'от 3000',
  house: 'от 5000',
  palace: 'от 10000',
};

const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const rooms = form.querySelector('#room_number');
const guests = form.querySelector('#capacity');

/**
 * Функция для каждого типа жилья прописывает минимальную стоимость в плейсхолдере и устанавливает значение min для инпута.
 * @return {void}
 */
const onCheckPrice = () => {
  price.placeholder = MIN_PRICE[type.value];
  price.min = MIN_PRICE[type.value];
}

type.addEventListener('change', onCheckPrice);

/**
 * Функция сопоставляет время въезда и выезда
 * @param {evt} evt
 * @return {void}
 */
const onCheckTime = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
}

time.addEventListener('change', onCheckTime);

/**
 * Функция проверяет соответствие количества комнат количеству гостей, которые в ней будут проживать
 * @return {void}
 */
const onCheckGuestsNumber = () => {
  if (rooms.value == 100 && guests.value != 0) {
    guests.setCustomValidity('Вам доступен вариант "Не для гостей"');
  } else if (guests.value == 0 && rooms.value != 100) {
    guests.setCustomValidity('Укажите количество гостей');
  } else if (rooms.value < guests.value) {
    guests.setCustomValidity('Количество гостей не должно превышать количество комнат');
  } else {
    guests.setCustomValidity('');
  }
};

rooms.addEventListener('change', onCheckGuestsNumber);
guests.addEventListener('change', onCheckGuestsNumber);
