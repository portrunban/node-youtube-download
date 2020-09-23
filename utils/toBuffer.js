const axios = require('axios');

//convert video to buffer

module.exports = async function (url) {
  const html = await axios({ method: 'GET', url: url, responseType: 'stream' });

  const bufs = [];
  html.data.on('data', (chunk) => {
    bufs.push(chunk);
  });

  const promise = await new Promise((res, rej) => {
    html.data.on('close', () => {
      const array = Buffer.concat(bufs);
      res(array);
    });
  });

  return promise;
};
