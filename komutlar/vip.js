const Discord = require('discord.js');
const rdb = require('orio.db');
const moment = require('moment');

exports.run = async (client, message, args) => {

let vip = 'VİP ROL ID' 
if(!["YETKİLİ ROL ID"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 

  return message.channel.send(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!`).then(x => x.delete({timeout: 5000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));

 member.roles.add(vip)
 
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`${member} kişisine ${vip} rolü verildi!`)
  .setTimestamp()
  .setFooter(`Developed by Chewy`)
message.react(client.emojiler.onay).catch();
message.channel.send(embed).then(x => x.delete({timeout: 5000}));
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vip'],
  permLevel: 0
}
exports.help = {
  name: 'vip',
  description: "Belirtilen üyeye vip rolü verir.",
  usage: 'vip @kişi'
}
