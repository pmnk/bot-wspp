const qrcode = require('qrcode-terminal');
const express = require("express");
const app = express();
//const Tenor_Key_API = 'AIzaSyC_ZcLzh_0L5pfe-dLP2C-Wg6QRxecAwxY';
let PORT = process.env.PORT || 3000;
//const fetch = require("node-fetch");
const { MessageMedia } = require('whatsapp-web.js');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  puppeteer: {
    handleSIGINT: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  headless: true,
  authStrategy: new LocalAuth(),
});


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  const chat = await message.getChat();
  if (message.body === '!st') {
    if (message.hasMedia) {
      if (message._data.type != "image") {
        message.reply("Error, solo imágenes.");
      } else {
        message.downloadMedia().then((media) => {
          client.sendMessage(message.from, media, { sendMediaAsSticker: true, stickerAuthor: "*Stickers PMNK*" });
        });
      }
    } else {
      message.reply("Primero añade una imagen");
    }
  }

  if (message.body === '!hola') {
    var num = randoms(4);
    if (num === 1) {
      const image = 'https://64.media.tumblr.com/baec304d58c44a3ba0184db4c21a6d69/tumblr_pnlzwbtKZp1vx60ppo1_1280.jpg';
      let media = await MessageMedia.fromUrl(image, undefined, {
        caption: 'Hola phantom'
      });
      message.reply(media, undefined, '*Hola Querido Phantom*');
    }
    if (num === 2) {
      const image = 'https://pbs.twimg.com/media/DWAOs0yU8AAWbMh.jpg';
      let media = await MessageMedia.fromUrl(image, undefined, {
        caption: 'Hola phantom'
      });
      message.reply(media, undefined, '*Hola Querido Phantom*');
    }
    if (num === 3) {
      const image = 'http://images6.fanpop.com/image/photos/38100000/Anime-girl-lynx_kawaii-38182130-597-843.jpg';
      let media = await MessageMedia.fromUrl(image, undefined, {
        caption: 'Hola phantom'
      });
      message.reply(media, undefined, '*Hola Querido Phantom*');
    }
    if (num === 4) {
      const image = 'https://i.imgur.com/P1DkT2G.jpeg';
      let media = await MessageMedia.fromUrl(image, undefined, {
        caption: 'Hola phantom'
      });
      message.reply(media, undefined, { caption: '*Hola Querido Phantom*' });
    }
  }

  ///comamdo de que menciona a todos 

  if (message.body === '!todos') {

    client.sendMessage(message.from, '~*Te han mencionado XD*~')
    let text = "";
    let mentions = [];

    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);

      mentions.push(contact);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  }

  //comando de mecion admins

  if (message.body === '!dioses') {
    if (!chat.isGroup) return true;
    let menciones = "";
    let admins = [];
    for (let i = 0; i < chat.participants.length; i++) {
      if (chat.participants[i].isAdmin) {
        menciones += `@${chat.participants[i].id.user} `;
        const contact = await client.getContactById(chat.participants[i].id._serialized);

        admins.push(contact);
      }
    }

    message.reply('*Invoncando a los dioses:*\n' + menciones, undefined, { mentions: admins })


  }

  //comando para desplegar la lista de comando 
  if (message.body === '!comando') {
    message.reply('*⚡ANIMES PMNK PHANTOM⚡*\n' + '____________________________________\n\n' + '*NOTA:* Todos los comandos se escriben de igual forma en la que está en el listado, estó incluye signos, espacios, mayúsculas y minúsculas (exceptuando emoji). Además todos los comandos empiezan con el signo: "!". \n\n' + '____________________________________\n' + '*📋Lista de comandos📋*' + '____________________________________\n\n' + '*!hi*: Con este comando envias un saludo. \n\n' + '*!st*: A este comando debes adjutar una imagen para crear un stiker. \n\n' + '*!all*: con este comando mencionas a todos los integrantes. \n\n' + '*!allGod*: Este comando invoca a todos los dioses.\n\n' + '____________________________________\n' + '*Nota:* Este Bot se llama " *Mamalon* "')
  }

  //
  if (message.body === '!choco') {
    const { MessageMedia } = require('whatsapp-web.js');

    //const media = await MessageMedia.fromUrl('https://c.tenor.com/gsBilnF97T0AAAAC/fail.gif');
    chat.sendMessage(media);
  }

});
function randoms(number) {
  number += 1;
  return Math.floor(Math.random() * number);
}

app.listen(PORT, () => {
  client.initialize();
});

