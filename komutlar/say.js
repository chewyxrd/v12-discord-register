const Discord = require('discord.js');
const db = require('orio.db');

exports.run = async (client, message, args) => {

  let tag = 'chewy' 
  
  if (!message.member.roles.cache.has("YETKİLİ ROL ID") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("RANDOM").setFooter('Developed by Chewy'));

        let toplamüye = message.guild.memberCount
        let online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        let Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        let tagg = message.guild.members.cache.filter(a => a.user.username.includes(tag)).size

        const chewyembed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`
            Sunucuda toplam **${toplamüye}** üye bulunmakta.
            Sunucuda **${online}** aktif üye bulunmakta.
            Sunucuda toplam tagımızı alan **${tagg}** üye bulunmakta.
            Sunucuda sesli sohbetlerde toplam **${Sesli}** üye bulunmakta`)
          
            .setFooter('Developed by Chewy')

        message.channel.send(chewyembed)

  }
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["say"],
    permLevel: 0
  }
  exports.help = {
    name: 'say',
  
  }
