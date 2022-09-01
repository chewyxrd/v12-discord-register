const Discord = require("discord.js");
const express = require("express");
const app = express();
const http = require("http");
const db = require('orio.db')
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");

require("./util/eventLoader")(client);
app.get("/", (request, response) => {
  response.sendStatus(200);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

////////////////////////////////// KOMUTLAR //////////////////////////////////

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    console.log("Chewy Kayıt Botu Aktif!")
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

////////////////////////////////// TOKEN //////////////////////////////////

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

////////////////////////////////// TAG //////////////////////////////////

client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`TAGINIZ`);
    }
  }
);

client.on('message', msg => {
  if (msg.content === '.tag') {
      msg.channel.send(`TAGINIZ`);
  }
}
);

client.on('message', msg => {
  if (msg.content === 'tag') {
      msg.channel.send(`TAGINIZ`);
  }
}
);

////////////////////////////////// WELCOME MESAJI //////////////////////////////////

client.on("guildMemberAdd", member => {  
  const kanal = member.guild.channels.cache.find(r => r.id === "HOŞGELDİN KANAL ID");
    
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'ÇARPIEMOJİID'
  if (kurulus > 1296000000) kontrol = 'TİKEMOJİID'
  moment.locale("tr");

  kanal.send(":tada: Sunucumuza hoş geldin! <@" + member + "> \n\n Hesabın "+ gecen +" önce oluşturulmuş. "+kontrol+" \n\n Sunucu kurallarımız <#KURALLARKANALID> kanalında belirtilmiştir. Unutma! sunucu içerisinde ki ceza-i işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecektir. \n\n Seninle beraber **" + member.guild.memberCount + "** kişi olduk \n\n Tagımızı alarak bizlere destek olabilirsin \n\n Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor <@&YETKILIROLID> seninle ilgilenecektir!")
  });

////////////////////////////////// TAG ALANA ROL //////////////////////////////////

client.on("userUpdate", async (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {

let tag = "TAGINIZ"; //SUNUCU TAGI
let sunucu = "SUNUCU ID"; //SUNUCU ID
let kanal = "WELCOME ID" //HOŞGELDİN MESAJINI ATACAĞI KANAL ID
let rol = "TAGLIROLU ID"; //TAGLI ROLÜNÜN ID

//TAGALANA
if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {

client.channels.cache.get(kanal).send(`**${newUser}** adlı kişi tagımızı aldığı için <@&${rol}> rolü verildi!`)
client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol) }

//TAGÇIKARANA
if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {

client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
client.channels.cache.get(kanal).send(`**${newUser}** adlı kişi tagımızı çıkardığı için <@&${rol}> rolü alındı! \n\n Tagımızı tekrar alırsa rolü verilecektir.`) } } })