const Discord = require('discord.js');
exports.run = (client, message) => {
    
  if (message.author.id === "135067990201729024" || message.author.id === "369490730525261835") {
        message.author.send(help.helpMsg1);
        setTimeout(() => {
          message.author.send(help.helpMsg2);
        }, 250);
        setTimeout(() => {
          message.author.send(help.helpMsg3);
       }, 500);
        setTimeout(() => {
          message.author.send(help.helpMsg4);
       }, 800);
       message.channel.send(`**${message.author.username}**, check your DMs!`)
     } else {
       message.author.send(help.helpMsg1);
       setTimeout(() => {
         message.author.send(help.helpMsg2);
       }, 250);
       setTimeout(() => {
         message.author.send(help.helpMsg3);
      }, 500);
      message.channel.send(`**${message.author.username}**, check your DMs!`)
    }
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'teamInfo',
  description: 'Tells about the team behind Neutronia',
  usage: 'teamInfo'
};