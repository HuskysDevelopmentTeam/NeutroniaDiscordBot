const Discord = require('discord.js');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed();
  embed
    .setTitle('Info about the mod')
    .setDescription('Neutronia is a mod that aims to expand upon the vanilla charm, including much more' + 
    'variety to all dimensions. The surface, underground, nether and end have upgraded worldgen, more biomes' +
    'and structures.');
  message.delete().catch(O_o=>{});
  message.channel.send(embed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'modinfo',
  description: 'Tells you about Neutronia',
  usage: 'modinfo'
};