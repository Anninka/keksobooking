
import { sendData } from './api.js';
import { resetMap } from './map.js';
import { isEscEvent } from './util.js';

const MIN_PRICE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const body = document.querySelector('body');
const form = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const time = form.querySelector('.ad-form__element--time');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const rooms = form.querySelector('#room_number');
const guests = form.querySelector('#capacity');
const resetButton = form.querySelector('.ad-form__reset');

/**
 * Функция возвращает форму в изначальное состояние
 * @return {void}
 */
const resetForm = () => {
  form.reset();
  resetMap();
  filter.reset();
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

/**
 * Функция для каждого типа жилья прописывает минимальную стоимость в плейсхолдере и устанавливает значение min для инпута.
 * @return {void}
 */
const onCheckPrice = () => {
  price.placeholder = `от ${MIN_PRICE[type.value]}`;
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

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
}


const successTemplate = document.querySelector('#success').content;
const newMessage = successTemplate.querySelector('.success');
const successMessage = newMessage.cloneNode(true);

/**
 * Функция показывает сообщение об успешной отправке формы
 */
const showSuccessMessage = () => {
  body.appendChild(successMessage);
  resetForm();
  document.addEventListener('keydown', onEscKeydownSucces);
}

/**
 * Функция по щелчку клавиши Esc закрывает сообщение об успешной отправке формы
 * @param {evt} evt
 */
const onEscKeydownSucces = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

/**
 * Функция удаляет сообщение об успешной отправке формы
 */
const closeSuccessMessage = () => {
  body.removeChild(successMessage);
  document.removeEventListener('keydown', onEscKeydownSucces);
}

successMessage.addEventListener('click', () => {
  closeSuccessMessage();
});

const errorTemplate = document.querySelector('#error').content;
const newError = errorTemplate.querySelector('.error');
const errorMessage = newError.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button')

/**
 * Функция показывает сообщение об ошибке отправки формы
 */
const showErrorMessage = () => {
  body.appendChild(errorMessage);
  document.addEventListener('keydown', onEscKeydownError);
}

const closeErrorMessage = () => {
  body.removeChild(errorMessage);
  document.removeEventListener('keydown', onEscKeydownError);
}

/**
 * Функция по щелчку клавиши Esc закрывает сообщение об успешной отправке формы
 * @param {evt} evt
 */
const onEscKeydownError = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

errorMessage.addEventListener('click', () => {
  closeErrorMessage();
});

export {setUserFormSubmit, showSuccessMessage };
