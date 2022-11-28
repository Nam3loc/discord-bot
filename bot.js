require('dotenv').config();
const axios = require('axios');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();

sadWords = ['sad', 'depressed', 'unhappy', 'angry', 'miserable'];

encouragements = ['Cheer up!', 'Get glad', 'You got this', 'Keep going', 'You are a pretty cool hooman'];

const getQuote = () => {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]['q'] + ' -' + data[0]['a']
        })
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

let interval;

// FreeCodeCamp Bot Messages
client.on('message', async msg => {
    if(msg.author.bot) return
    
    if(msg.content === '$inspire') {
        getQuote().then(quote => msg.channel.send(quote));
    }

    if(sadWords.some(word => msg.content.includes(word))) {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(encouragement);
    }

    if(msg.content === '!eye') {
        msg.channel.send('You are now subscribed to eye reminders.');
        interval = setInterval (function () {
            msg.channel.send('Please take an eye break now!')
            .catch(console.error);
        }, 3600000); // every hour
    }
})

// Buddy Bot Messages
// client.on('message', async msg => {
//     switch (msg.content) {
//       case "ping":
//         msg.reply("Pong!");
//         break;
//       //our meme command below
//       case "!meme":
//         msg.channel.send("Here's your meme!"); //Replies to user command
//         const img = await getMeme(); //fetches an URL from the API
//         msg.channel.send(img); //send the image URL
//         break;
//     }
// })

// async function getMeme(){
//     const res = await axios.get('https://memeapi.pythonanywhere.com/');
//     return res.data.memes[0].url;
// }

client.login(process.env.TOKEN);