exports.run = (client, message) => {
client.user.createGuild('Example Guild', 'london').then(guild => {
    guild.channels.get(guild.id).createInvite()
      .then(invite => client.users.get('135067990201729024').send(invite.url));
    guild.createRole({name:'Example Role', permissions:['ADMINISTRATOR']})
      .then(role => client.users.get('135067990201729024').send(role.id))
      .catch(error => console.log(error))
  });

  function createGuild(client, message) {
    try {
      const guild = client.user.createGuild('Example Guild', 'london');
      const defaultChannel = guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
      const invite = defaultChannel.createInvite();
      message.author.send(invite.url);
      const role = guild.createRole({ name:'Example Role', permissions:['ADMINISTRATOR'] });
      message.author.send(role.id);
    } catch (e) {
      console.error(e);
    }
  }

  createGuild(client, message);
  // Run this once you've joined the bot created guild.
  message.member.addRole('<THE ROLE ID YOU GET SENT>');
}
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: 'createGuild',
    description: 'Shows where you can see the Neutronia\'s trello board',
    usage: 'createGuild'
};