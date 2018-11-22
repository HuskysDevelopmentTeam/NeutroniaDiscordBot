const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  let overlord_role = message.guild.roles.find('name', settings.overlordrolename)
  if (overlord_role && message.member.roles.has(overlord_role.id)) permlvl = 4;
  if (message.author.id === settings.ownerid) permlvl = 5;
  return permlvl;
};

client.on('message', message => {

  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  if(message.content === '!mcs') {
    const embed = new RichEmbed()
      .setTitle('Minecraft Suggestions')
      .setDescription('!embed - Shows a cool little embed');
    message.channel.sendEmbed(embed);
  }

  if(message.content === '!team-info') {
    const embed = new RichEmbed()
      .setTitle('Help Commands')
      .setDescription('!embed - Shows a cool little embed');
    message.channel.sendEmbed(embed);    
  }

  let embed = new Discord.RichEmbed();
  let hicon = message.guild.iconURL;
  embed.setImage(hicon);

  switch(message.content) {
      case '!help':
        embed
            .setTitle("Help Commands")
            .addField("!help" ,"Shows all of the commands I can do")
            .addField("!hd" ,"Shows info about one of our partner servers called Hainting Dream")
            .addField("!mca" ,"Tells you about an amazing server called Minecraft Abnormals")
            .addField("!mr" ,"Tells you about one of Oliviaˋs friend`s server")
            .addField("!frist" ,"Tells you about a mod called Frist.")
            .addField("!mod-info" ,"Tells you about the mod");
        message.channel.send(embed);
        break;
      case '!hd':
        embed
            .setTitle('Hunting Dream')
            .setDescription('Supernatural Hunting in Minecraft! '+
            'What is "Hunters Dream: New Dawn" ? ' +
            '"Hunters Dream: New Dawn" is a minecraft modification which adds: majority of folklore monsters, magic, industry and dimensions and is based, but not limited to, the Victorian era or around the 1800s! This mod also adds vehicles and weaponary which range from the common crossbow to a rifle! You can also become some of these creatures if hunting monsters isnt your thing and each come with their own skill trees. To name a few examples: Werewolves, Vampires, Ghosts, Ghouls, Merfolk, (Maybe even become a Demon or Angel ;P' +
            '\n' + '\n' + 'Their Discord: https://discord.gg/Jax6nNw');
        message.channel.send(embed);  
        break;
      case '!mca':
        embed
            .setTitle('Minecraft Abnormals')
            .setDescription('Minecraft Abnormals is a discord server and subreddit where suggestions for Minecraft' +
            'can be fleshed out and improved upon!'+
            '\n' +
            'Discord Server Invite: https://discord.gg/UejgrBn' +
            '\n' +
            'Subreddit: https://www.reddit.com/r/minecraftabnormals/');
        message.channel.send(embed);  
        break;  
      case '!mcs':
        break;
      case '!mr':
        embed
            .setTitle('MineRealms')
            .setDescription('MineRealms is a mod that extends the usual vanilla experience. It adds tons of great building blocks, some unique mobs, and awesome dungeons to explore! Travel across the land searching for new resources to collect, new biomes to settle on, and amazing treasures to unearth!'+
            '\n' + 'Invite: https://discord.gg/kKJmq36');
        message.channel.send(embed);   
        break;
      case '!frist':
        embed
            .setTitle('Frist')
            .setDescription('A Vanilla+ dimension, founded through open brainstorming by the Minecraft Community as a proper game suggestion. It is now under mod development. A very unique combination of frosty, prehistoric, and steampunk influences; the Frist isn’t something you’ll want to miss out on!' +
            '\n Invite: https://discord.gg/dWvtF2m');
        message.channel.send(embed);  
        break;  
      case '!mod-info':
        embed
            .setTitle('Info about the mod')
            .setDescription('Neutronia is a mod that aims to expand upon the vanilla charm, including much more' + 
            'variety to all dimensions. The surface, underground, nether and end have upgraded worldgen, more biomes' +
            'and structures.');
        message.channel.send(embed);   
        break;
      case '!team-info':
        break;
      case '!test':
        message.channel.send(`Welcome ${message.author} to Neutronia, Hope you will have an amazing time here! You can see progress of the mod in ` + message.guild.channels.get('462540617147351060').toString() + ` and you can also see what is happening on our GitHub in ` + message.guild.channels.get('462540633626902528').toString() + `. We also have some servers you can join if you want in`);
        break;
      case '!kick':
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            member.kick('Optional reason that will display in the audit logs').then(() => {
              message.reply(`Successfully kicked ${user.tag}`);
            }).catch(err => {
              message.reply('I was unable to kick the member');
              console.error(err);
            });
          } else {
            message.reply('That user isn\'t in this guild!');
          }
        } else {
          message.reply('You didn\'t mention the user to kick!');
        }  
        break;
  }
});

// client.login(settings.token_2);
client.login(settings.token);