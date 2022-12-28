
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
 * Функция создаёт карточку объявления для вставки в HTML
 * @param {object} description объект с рандомными данными для объявления
 * @returns {HTMLElement} HTML элемент карточки объявления
 */
const createUserCard = (description) => {
  const cardTemplate = document.querySelector('#card').content;
  const newCardTemplate = cardTemplate.querySelector('.popup');
  const userCard = newCardTemplate.cloneNode(true);

  userCard.querySelector('.popup__avatar').src = description.author.avatar;
  userCard.querySelector('.popup__title').textContent = description.offer.title;
  userCard.querySelector('.popup__text--address').textContent = description.offer.address;
  userCard.querySelector('.popup__text--price').textContent = `${description.offer.price} ${RUBLE_CURRENCY}/ночь`;
  userCard.querySelector('.popup__type').textContent = TYPES_OF_BUILDINGS[description.offer.type];
  userCard.querySelector('.popup__text--capacity').textContent = `${description.offer.rooms} ${getCorrectWord(description.offer.rooms, ROOM_WORDS)} для ${description.offer.guests} ${getCorrectWord(description.offer.guests, GUEST_WORDS)}`;
  userCard.querySelector('.popup__text--time').textContent = `Заезд после ${description.offer.checkin}, выезд до ${description.offer.checkout}`;
  userCard.querySelector('.popup__description').textContent = description.offer.description;

  if (description.offer.features) {
    const featuresList = userCard.querySelectorAll('.popup__feature');

    featuresList.forEach((featuresItem) => {
      const isNecessary = description.offer.features.some(
        (feature) => featuresItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featuresItem.remove();
      }
    });
  } else {
    userCard.querySelector('.popup__features').remove();
  }

  if (description.offer.photos) {
    const photosContainer = userCard.querySelector('.popup__photos');
    const photoItem = userCard.querySelector('.popup__photo');
    photosContainer.removeChild(photoItem);

    description.offer.photos.forEach((photo) => {
      const item = photoItem.cloneNode(true);
      item.src = photo;
      photosContainer.appendChild(item);
    });
  } else {
    userCard.querySelector('.popup__photos').remove();
  }

  return userCard;
};

export { createUserCard };
