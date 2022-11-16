
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
    return +((Math.random() * (max - min + 1)) + min).toFixed(decimalPlace.toFixed());
  }
  return NaN;
}

getRandomCoordinates(5, 8);
