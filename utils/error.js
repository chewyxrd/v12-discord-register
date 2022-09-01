const Discord = require("discord.js");
const fs = require("fs");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Yeterli yetkin bulunmamakta!")
        .setColor("RED")
        .addField("Yetersiz izin.", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
    .setColor("RED")
        .setTitle("Hata!")
        .addField(`${user} izinleri var.`, perms);

    message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Hata!")
        .setDescription("Bir botu yasaklayamazsın!")
           .setColor("RED")

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Hata!")
        .setDescription("Bu kullanıcı bulunamadı!")
        .setColor("RED")

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Hata!")
        .setDescription("Lütfen bir neden belirtin!")
           .setColor("RED")

    channel.send(embed).then(m => m.delete(5000));
}
