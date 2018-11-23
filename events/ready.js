const chalk = require('chalk');
const Discord = require('discord.js');
const client = new Discord.Client();

const activities_list = [
  "Protecting Queen Olivia.", 
  "doing some coding",
  "Minecraft", 
  "running in the console",
  "Protecting Queen Olivia." 
]; // creates an arraylist containing phrases you want your bot to switch through.

module.exports = client => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
  }, 10000);
  console.log(chalk.bgGreen.black(`Online and ready to serve ${client.guilds.size} servers.`));
};