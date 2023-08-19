const Discord = require('discord.js')
const db = require('croxydb')
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { botid, ownerid } = require("../ayarlar.json")
const osutils = require('os-utils') 

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('istatistik')
    .setDescription('🔋 Bot istatistiklerini gösterir.')
    .setDMPermission(false),
      
    async execute(client, interaction) {   
      
      let b = client.users.cache.get('788717157919096854').tag
      
    //  osutils.cpuUsage(function(v) {
        
      const Linkler = db.fetch(`UptimeLink`) || []
      const Uptime = db.fetch(`UptimeLink_${interaction.user.id}`) || []
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      
      if(!Uptime.length <= 0) {
        
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
      
      const IstatistikYok = new EmbedBuilder()
      .setColor("Blue")
      .setDescription("# Miracle Uptime | İstatistikler")
      .setImage("https://cdn.discordapp.com/banners/788717157919096854/2ebe499f66e41114b2302df690d54b90.png?size=1024")
      .addFields({
          name: "<:icons_owner:1121729444520935494> | Kurucu & Geliştirici Takımı",
          value: `[Napolyon Bonapart](https://discord.com/users/788717157919096854)`,
        },
        {
          name: "<:icons_javascript:1122395134517063710> | Yazılım İstatistik",
          value: `Discord.JS: [14.11.0](https://discord.js.org) \n Node.JS: [16.16.0](https://nodejs.org/ja/blog/release/v16.16.0)`,
          inline: true
        }, 
        {
          name: "<:icons_uptime:1122396107788529726> | Aktiflik:", 
          value: `Uptime: ${days}gün ${hours}saat \n RAM: ${(process.memoryUsage().heapUsed / 2024 / 2024).toFixed(2)} MB`,
          inline: true
        },
 
        {
          name: "<:botkullanici:1121431774619258891>  | Kullanım",
          value: `Sunucu: *${client.guilds.cache.size}* \n Kullanıcı: *${client.users.cache.size}*`,
          inline: true
        },
        {
          name: "<:Bank:1125127827059126443> | Projeler",
          value: `Toplam: *${Linkler.length}* \n Sahip olunan: *${Uptime.length}*`,
          inline: true
        },
        {           
          name: "<:User_Badge:1125127739477864479> | Premium",
          value: `Toplam: *${db.fetch(`PremiumSayı`) || 0}\*`,
          inline: true
        },
        {           
          name: "\n",
          value: `Toplam *${Limit}* hakkınız bulunmaktadır.`,
        })          
      
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
     
     return interaction.reply({embeds: [IstatistikYok]})
       
     } else {
       
       let days = Math.floor(client.uptime / 86400000);
       let hours = Math.floor(client.uptime / 3600000) % 24;
       let minutes = Math.floor(client.uptime / 60000) % 60;
       let seconds = Math.floor(client.uptime / 1000) % 60;
      
     const Istatistik = new EmbedBuilder()
     .setColor("Blue")
     .setDescription("# Miracle Uptime | İstatistikler")
     .setImage("https://cdn.discordapp.com/banners/788717157919096854/2ebe499f66e41114b2302df690d54b90.png?size=1024")
     .addFields({
         name: "<:icons_owner:1121729444520935494> | Kurucu & Geliştirici Takımı",
         value: `[Napolyon Bonapart](https://discord.com/users/788717157919096854)`,
       },
       {
         name: "<:icons_javascript:1122395134517063710> | Yazılım İstatistik",
         value: `Discord.JS: [14.11.0](https://discord.js.org) \n Node.JS: [16.16.0](https://nodejs.org/ja/blog/release/v16.16.0)`,
         inline: true
       }, 
       {
         name: "<:icons_uptime:1122396107788529726> | Aktiflik:", 
         value: `Uptime: ${days}gün ${hours}saat \n RAM: ${(process.memoryUsage().heapUsed / 2024 / 2024).toFixed(2)} MB`,
         inline: true
       },

       {
         name: "<:botkullanici:1121431774619258891>  | Kullanım",
         value: `Sunucu: *${client.guilds.cache.size}* \n Kullanıcı: *${client.users.cache.size}*`,
         inline: true
       },
       {
         name: "<:Bank:1125127827059126443> | Projeler",
         value: `Toplam: *${Linkler.length}* \n Sahip olunan: *${Uptime.length}*`,
         inline: true
       },
       {           
         name: "<:User_Badge:1125127739477864479> | Premium",
         value: `Toplam: *${db.fetch(`PremiumSayı`) || 0}\*`,
         inline: true
       },
       {           
         name: "\n",
         value: `Toplam *${Limit}* hakkınız bulunmaktadır.`,
       })          
     
     .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
   .setTimestamp()
     
     return interaction.reply({embeds: [Istatistik]})
               
         }
      // })
    }
}
