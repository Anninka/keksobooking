
/**
 *Функция проверяет нажатие клавиши Esc
 * @param {evt} evt
 * @returns {boolean}
 */
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export { isEscEvent }
