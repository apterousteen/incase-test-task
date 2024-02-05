export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Время ожидания ответа превышено`));
    }, s * 1000);
  });
};
