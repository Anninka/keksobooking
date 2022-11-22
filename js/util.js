
/**
 * Функция получает два числа для диапазона: мин и макс
 * @param  {number} min начальное значение диапазона (больше или равно нулю)
 * @param  {number} max конечное значение диапазона (больше нуля)
 * @returns {number | NaN} рандомное число из заданного диапазона
 */
const getRandom = (min, max) => {
  if(min >= 0 && max > 0 && max !== min && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return NaN;
}

/**
 * Функция получает числа для диапазона мин макс и количество знаков после запятой
 * @param {number} min начальное значение диапазона (больше или равно нулю)
 * @param {number} max конечное значение диапазона (больше нуля)
 * @param {number} decimalPlace количество знаков после запятой (по умолчанию 5)
 * @returns {number | NaN} случайное число с указанным количеством знаков после запятой
 */
const getRandomCoordinates = (min, max, decimalPlace = 5) => {
  if(min >= 0 && max > 0 && max !== min && max > min && decimalPlace > 0 && decimalPlace < 20) {
    return +((Math.random() * (max - min)) + min).toFixed(decimalPlace.toFixed());
  }
  return NaN;
}

/**
 * Функция получает массив
 * @param  {array} array
 * @returns {element} случайный элемент массива
 */
const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * (array.length))];
}

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
 * @param {array} array
 * @returns {array} массив случайной длины (не больше исходного)
 */
const getRandomLengthArray = (array) => {
  return array.slice(0, getRandom(1, array.length));
}

export {getRandom, getRandomCoordinates, getRandomArrayElement, shuffle, getRandomLengthArray};
