module.exports = member => {
    const guild = member.guild;
    guild.defaultChannel.send(`Bye ${member.user.username} hope you had fun here! We will miss you!`);
};