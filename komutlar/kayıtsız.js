const Discord = require("discord.js");
const db = require("orio.db");

module.exports.run = async (client, message, args, ayar, emoji) => {

  let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL).setFooter("Developed by Chewy").setColor('RANDOM').setTimestamp();

  if (!message.member.roles.cache.has("YETKİLİ ROL ID") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("RANDOM").setFooter('Developed by Chewy'));
  let kisi = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!kisi) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete(5000));
  if (message.member.highestRole.position < kisi.highestRole.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya aynı yetkidesin!`)).then(x => x.delete(5000));
  if(kisi.manageable) kisi.setNickname(kisi.user.username).catch();
  await kisi.setRoles('KAYITSIZ ROL ID').catch();
  await member.setNickname(`TAGINIZ İsim | Yaş`)
  message.channel.send(embed.setDescription(`**${kisi}** üyesi, **${message.author}** tarafından kayıtsıza atıldı!`)).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [], 
  permLevel: 0
}

exports.help = {
  name: 'kayıtsız',
  usage: "kayıtsız [üye]",
  description: "Belirtilen üyeyi kayıtsıza atar."
}; 
