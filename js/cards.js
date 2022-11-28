
import {createDescriptions} from './create-descriptions.js';

const cardContainer = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content;
const newCardTemplate = cardTemplate.querySelector('.popup');

const userCards = createDescriptions();

const cardContainerFragment = document.createDocumentFragment();

userCards.forEach((description) => {
  const userCard = newCardTemplate.cloneNode(true);
  userCard.querySelector('.popup__avatar').src = description.author.avatar;
  userCard.querySelector('.popup__title').textContent = description.offer.title;
  userCard.querySelector('.popup__text--address').textContent = description.offer.address;
  userCard.querySelector('.popup__text--price').innerHTML = `${description.offer.price} <span>₽/ночь</span>`;
  userCard.querySelector('.popup__type').textContent = description.offer.type;
  userCard.querySelector('.popup__text--capacity').textContent = `${description.offer.rooms} комнаты для ${description.offer.guests} гостей`;
  userCard.querySelector('.popup__text--time').textContent = `Заезд после ${description.offer.checkin}, выезд до ${description.offer.checkout}`;
  // userCard.querySelector('.popup__features').innerHTML = description.offer.features;
  userCard.querySelector('.popup__description').textContent = description.offer.description;
  // userCard.querySelector('.popup__photos').innerHTML = description.offer.photos;

  cardContainerFragment.appendChild(userCard);
});

cardContainer.appendChild(cardContainerFragment.firstChild);
