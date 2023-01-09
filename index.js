const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { EditPhotoHandler } = require('./feature/edit_foto');
const { ChatAIHandler } = require('./feature/chat_ai');



const client = new Client({
    authStrategy: new LocalAuth()
});



client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot Terhubung!');
});

client.on('message', async msg => {

    const text = msg.body.toLowerCase() || '';

    //check status
    if (text === '!ping') {
        msg.reply('aman bre..');
    } else {
        msg.reply('gabisa bre..');
    }

    // #edit_bg/bg_color
    if (text.includes("edit/")) {
        await EditPhotoHandler(text, msg);
    }
    // #ask/question?
    if (text.includes("tanya/")) {
        await ChatAIHandler(text, msg);
    }

});

client.initialize();



