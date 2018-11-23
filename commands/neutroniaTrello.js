exports.run = (message) => {
  message.delete().catch(O_o=>{});
  message.channel.send("Neutronia's trello board are https://trello.com/b/A1qgnyXu/neutronia");
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'neutronia-trello',
  description: 'Shows where you can see the Neutronia\'s trello board',
  usage: 'neutronia-trello'
};