const Discord = require('discord.js');
const db = require("orio.db")

exports.run = async (client, message, args) => {

 if (!message.member.roles.cache.has("YETKİLİ ROL ID") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("RANDOM").setFooter('Developed by Chewy'));
  let uye = message.mentions.users.first()
  if (!uye) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcıyı etiketlemen gerekli!`).setFooter('Developed by Chewy').setColor("RANDOM"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(uye)
   let isim = args[1];
   let yas = args[2];   
   if(!isim) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir isim belirtmen gerekli!`).setFooter('Developed by Chewy').setColor("RANDOM")).then
await member.setNickname(`TAGINIZ ${isim} | ${yas}`)

  let embed = new Discord.MessageEmbed() 
  .setColor("RANDOM")
  .setDescription(`**Kullanıcının ismi başarıyla değiştirildi!**`) 
  .setFooter('Developed by Chewy')
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim" , "i"],
  permLevel: 0
}
exports.help = {
  name: 'isim',

}
