module.exports = member => {
    const guild = member.guild;
    const channel = guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;
    // channel.send(`Welcome ${member} to Neutronia, Hope you will have an amazing time here! You can see progress of the mod in ${guild.channels.get('462540617147351060')}and you can also see what is happening on our GitHub in ${guild.channels.get('462540633626902528')}. We also have some servers you can join if you want in`);
    channel.send(`Welcome ${member} to Neutronia, Hope you will have an amazing time here! You can see progress of the mod in ${guild.channels.get('514870640503947284')} and you can also see what is happening on our GitHub in ${guild.channels.get('514870655762563089')}. We also have some servers you can join if you want in`);
};