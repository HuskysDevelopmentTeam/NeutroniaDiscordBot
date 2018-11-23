exports.run = (message) => {
  message.delete().catch(O_o=>{});
  message.channel.send("Neutronia's github are https://github.com/HuskysDevelopmentTeam/Neutronia/tree/module-system");
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'neutronia-github',
  description: 'Shows where you can see the mod\'s github',
  usage: 'neutronia-github'
};