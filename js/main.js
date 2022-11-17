
const APARTMENTS_COUNT = 10;

const TITLES = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
];

const DESCRIPTIONS = [
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
];

const CHECKIN_CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const TYPES_OF_BUILDINGS = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

/**
 * Функция получает два числа для диапазона: мин и макс
 * @param  {number} min начальное значение диапазона (больше или равно нулю)
 * @param  {number} max конечное значение диапазона (больше нуля)
 * @returns {number} рандомное число из заданного диапазона
 */
const getRandom = function(min, max) {
  if(min >= 0 && max > 0 && max !== min && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return NaN;
}

getRandom(1, 10);

// Функция получения рандомных координат
/**
 * Функция получает числа для диапазона мин макс и количество знаков после запятой
 * @param {number} min начальное значение диапазона (больше или равно нулю)
 * @param {number} max конечное значение диапазона (больше нуля)
 * @param {number} decimalPlace количество знаков после запятой (по умолчанию 5)
 * @returns {number} случайное число с указанным количеством знаков после запятой
 */
const getRandomCoordinates = function(min, max, decimalPlace = 5) {
  if(min >= 0 && max > 0 && max !== min && max > min && decimalPlace > 0 && decimalPlace < 20) {
    return +((Math.random() * (max - min)) + min).toFixed(decimalPlace.toFixed());
  }
  return NaN;
}

getRandomCoordinates(5, 8);

const notes = ['до', 'ре', 'ми', 'фа', 'соль', 'ля', 'си' ];

/**
 * Функция получает массив
 * @param  {array} array
 * @returns {element} случайный элемент массива
 */
const getRandomArrayElement = function(array) {
  return array[Math.floor(Math.random() * (array.length))];
}

getRandomArrayElement(notes);

/**
 * Функция перемешивает элементы массива
 * @param {array} array
 * @returns {array} новый массив с перемешанными элементами
 */
const shuffle = (array) => {
  const cloneArray = array.slice();
  let j;
  let temp;
  for (let i = 0; i < cloneArray.length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    temp = cloneArray[j];
    cloneArray[j] = cloneArray[i];
    cloneArray[i] = temp;
  }
  return cloneArray;
};

/**
 * Функция получает массив и возвращает массив случайной длины от исходного массива
 * @param {*} array
 * @returns {array} массив случайной длины (не больше исходного)
 */
const getRandomLengthArray = (array) => {
  return array.slice(0, getRandom(1, array.length));
}


const createApartmentsDescriptions = () => {
  return {
    author: {
      avatar: `img/avatars/user${String(getRandom(1, 10)).padStart(2,'0')}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${getRandomCoordinates(35.65, 35.70)}, ${getRandomCoordinates(139.70, 139.80)}`,
      price: getRandom(1000, 100000),
      type: getRandomArrayElement(TYPES_OF_BUILDINGS),
      rooms: getRandom(1, 10),
      guests: getRandom(1, 10),
      checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
      checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
      features: getRandomLengthArray(shuffle(FEATURES)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomLengthArray(shuffle(PHOTOS)),
    },
    location: {
      x: getRandomCoordinates(35.65, 35.70),
      y: getRandomCoordinates(139.70, 139.80),
    },
  };
};

const ApartmentsDescriptions = new Array(APARTMENTS_COUNT).fill(null).map(createApartmentsDescriptions);
ApartmentsDescriptions[0];
