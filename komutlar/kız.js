const Discord = require('discord.js'); 
const db = require("orio.db")

exports.run = async (client, message, args) => {

 if (!message.member.roles.cache.has("YETKİLİ ROL ID") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("RANDOM").setFooter('Developed by Chewy'));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcıyı etiketlemen gerekiyor!`).setFooter('Developed by Chewy').setColor("RANDOM")).then(m => m.delete({timeout: 10000}));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let isim = args[1];
      if(!isim) return message.channel.send(new Discord.MessageEmbed().setDescription(`Kayıt yapabilmek için **isim** belirtmen gerekli!`).setFooter('Developed by Chewy').setColor("RANDOM")).then(m => m.delete({timeout: 5000}));
   let yas = args[2];
      if(!yas) return message.channel.send(new Discord.MessageEmbed().setDescription(`Kayıt yapabilmek için **yaş** belirtmen gerekli!`).setFooter('Developed by Chewy').setColor("RANDOM")).then(m => m.delete({timeout: 5000}));
await member.setNickname(`TAGINIZ ${isim} | ${yas}`)

  member.roles.add("KIZ ROL ID");
  member.roles.remove("KAYITSIZ ROL ID");

     const kanal = message.guild.channels.cache.find(c => c.id == "SOHBET KANAL ID")
    const chewyembed = new Discord.MessageEmbed() 
    .setDescription(`<@!${member.id}> **sunucumuzun \`${member.guild.memberCount}\`. üyesi olarak aramıza katıldı! sıcak bir hoş geldin diyelim!**`) 
    .setColor("RANDOM")
  let embed = new Discord.MessageEmbed() 
  .setColor("RANDOM")                                                           
  .setTimestamp()
  .setDescription(`<@!${member.id}> kullanıcısı <@&KIZROLID> olarak kayıt edildi!`) 
  .setFooter(`Developed by Chewy`)

  return message.channel.send(embed).then(kanal.send(chewyembed)).then 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kız" , "k"],
  permLevel: 0
}
exports.help = {
  name: 'kız',

}
