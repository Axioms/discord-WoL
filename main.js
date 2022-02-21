require('dotenv').config();
const Discord = require('discord.js');
const utils = require('./utils');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


try{
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ activity: { name: 'listening' }, status: 'online' })

});

client.on('messageCreate', async message => {
	if (message.content === '.ping') {
	  message.reply('pong');
	}
	else if (message.content === '.start') {
		message.channel.sendTyping();
		let started = await utils.startComputer();
		await utils.sleep(15000);
		if (started) {
			message.reply('started the computer!');
		}
		else {
			message.reply('failed to send Wake-On-Lan packet');
		}
		message.channel.sendTyping();
	}
  });

client.login(process.env.DISCORDTOKEN);
}
catch(e) {
console.log(e)
}
