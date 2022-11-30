
import {createDescriptions} from './create-descriptions.js';

const RUBLE_CURRENCY = '\u20BD';

const TYPES_OF_BUILDINGS = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

const ROOM_WORDS = [
  'комнат',
  'комната',
  'комнаты',
];

const GUEST_WORDS = [
  'гостей',
  'гостя',
  'гостей',
];

/**
 * Функция вставляет верное написание слова из массива
 * @param {number} item порядковый номер
 * @param {array} words массив с вариантами слов
 * @returns {string} верное написание слова из массива
 */
const getCorrectWord = (item, words) => {
  if (item % 100 > 4 && item % 100 < 21) {
    return words[0];
  } else if (item % 10 === 1) {
    return words[1];
  } else if (item % 10 > 1 && item % 10 < 5) {
    return words[2];
  }
  return words[0];
};

/**
 * Функция создает массив с HTML элементами features готовыми для вставки в разметку
 * @param {array} features массив
 * @returns список с features
 */
const createFeaturesList = (features) => {
  const featureList = document.createElement('ul');
  featureList.classList.add('popup__features');

  features.forEach((feature) => {
    const popupFeature = document.createElement('li');
    const featureClass = `popup__feature--${feature}`;
    popupFeature.classList.add('popup__feature');
    popupFeature.classList.add(featureClass);
    featureList.appendChild(popupFeature);
  });
  return featureList;
};

/**
 * Функция создает HTML элемент с photos готовыми для вставки в разметку.
 * @param {array} address массив с адресами фото
 * @returns {HTMLElement} HTML элемент с photos
 */
const createPopupPhotos = (address) => {
  const popupPhotoDiv = document.createElement('div');
  popupPhotoDiv.classList.add('popup__photos');

  address.forEach((photo)=>{
    const popupPhoto = document.createElement('img');
    popupPhoto.classList.add('popup__photo');
    popupPhoto.width = 45;
    popupPhoto.height = 40;
    popupPhoto.alt = 'Фотография жилья';
    popupPhoto.src = photo;
    popupPhotoDiv.appendChild(popupPhoto);
  });
  return popupPhotoDiv;
};

/**
 * Функция создаёт карточки объявлений для вставки в HTML
 * @returns {HTMLElement} HTML элемент карточек объявлений
 */
const createUserCards = () => {
  const cardTemplate = document.querySelector('#card').content;
  const newCardTemplate = cardTemplate.querySelector('.popup');
  const userCards = createDescriptions();
  const cardContainerFragment = document.createDocumentFragment();

  userCards.forEach((description) => {
    const userCard = newCardTemplate.cloneNode(true);

    userCard.querySelector('.popup__avatar').src = description.author.avatar;
    userCard.querySelector('.popup__title').textContent = description.offer.title;
    userCard.querySelector('.popup__text--address').textContent = description.offer.address;
    userCard.querySelector('.popup__text--price').textContent = `${description.offer.price} ${RUBLE_CURRENCY}/ночь`;
    userCard.querySelector('.popup__type').textContent = TYPES_OF_BUILDINGS[description.offer.type];
    userCard.querySelector('.popup__text--capacity').textContent = `${description.offer.rooms} ${getCorrectWord(description.offer.rooms, ROOM_WORDS)} для ${description.offer.guests} ${getCorrectWord(description.offer.guests, GUEST_WORDS)}`;
    userCard.querySelector('.popup__text--time').textContent = `Заезд после ${description.offer.checkin}, выезд до ${description.offer.checkout}`;
    userCard.replaceChild(createFeaturesList(description.offer.features), userCard.querySelector('.popup__features'));
    userCard.querySelector('.popup__description').textContent = description.offer.description;
    userCard.replaceChild(createPopupPhotos(description.offer.photos), userCard.querySelector('.popup__photos'));

    cardContainerFragment.appendChild(userCard);
  });
  return cardContainerFragment;
};

/**
 * Функция отрисовывает одну карточку
 * @returns {void}
 */
const showUserCards = () => {
  const cardContainer = document.querySelector('.map__canvas');
  cardContainer.appendChild(createUserCards().firstChild);
};

showUserCards();
