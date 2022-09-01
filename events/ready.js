module.exports = client => {
client.user.setStatus("online");
  
console.log(`${client.user.id}                                                                                                                                                      `)
client.user.setActivity(`Chewy Youtube Video`, { type: "PLAYING"});  
};
