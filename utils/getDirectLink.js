const axios = require('axios');
const querystring = require('querystring');

//get full link on video

module.exports = async function getLink(link) {
  link = link.match(/watch\?v=(.+)/)[1];
  const html = await axios.get('https://presaver.com/');
  const token = html.data.match(/csrf-token"\scontent="(.+?)"/s)[1];
  const cookies = html.headers['set-cookie'].join(';');
  const form = querystring.stringify({ vid: link });

  const htmlGetVideo = await axios.post('https://presaver.com/files/info', form, {
    headers: {
      Cookie: cookies,
      'x-csrf-token': token,
    },
  });

  if (!htmlGetVideo.data) {
    throw new Error(`Error identify video: ${link}`)
  }
  
  const title = htmlGetVideo.data.title.replace(/[\\?*:<>"|/]+/g, '');
  return { link: htmlGetVideo.data.formats[0].url, title: title };
};
