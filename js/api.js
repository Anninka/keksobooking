
const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => alert('Произошла ошибка, попробуйте ещё раз'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    // 'https://23.javascript.pages.academy/keksobooking',
    'https://22.javascript.pages.academy/404',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
}

export { getData, sendData };
