const fs = require('fs');

const getDirectLink = require('./utils/getDirectLink');
const toBuffer = require('./utils/toBuffer');

async function start() {
  const listLink = fs.readFileSync('./input.txt', 'utf-8').split('\n');
  for (let i = 0; i < listLink.length; i++) {
    try {
      let directLink = await getDirectLink(listLink[i]);
      let buffer = await toBuffer(directLink.link);
      fs.writeFileSync(`./output/${directLink.title}.mp4`, buffer);
    } catch (error) {
      console.log(error);
    }
  }
}

start();
