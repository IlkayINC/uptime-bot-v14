const Discord = require('discord.js')
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('sil')
    .setDescription('🔋 Sistemden glitch/replit linki silersiniz.')
    .setDMPermission(false),
  
    async execute(client, interaction) { 
      
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("<:reddet:1121426474856087632> | İşlem Başarısız.")
    .setDescription(`<:reddet:1121426474856087632> **Sistemde böyle bir proje bulunmuyor.**`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("<:tik_skyuptime:1133695185184882688> | İşlem Başarılı")
    .setDescription(`<:onay:1121427062280949911> **Projen başarıyla sistemden silindi.**`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    
const LinkSilmeFormu = new ModalBuilder()
    .setCustomId('linksilmeform')
    .setTitle('Link sil')
const LinkSilFormu = new TextInputBuilder()
    .setCustomId('linksil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://sky-uptime.glitch.me')
    .setRequired(true)
const LinkSilmeSistemi = new ActionRowBuilder().addComponents(LinkSilFormu);
LinkSilmeFormu.addComponents(LinkSilmeSistemi);
      
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.guild.id}`)
      
      await interaction.showModal(LinkSilmeFormu);
  
      await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === `linksilmeform`, time: 60 * 60 * 1000 }).then(async (interaction) => {
 
      const links = db.get(`UptimeLink_${interaction.user.id}`)
      let linkInput = interaction.fields.getTextInputValue("linksil")

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok]}).catch(e => { })
      
     // if(!PremiumÜye) {
        
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
     
     /* } else {
        
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`PremiumUptimeLink`, linkInput)
        
      }*/
        interaction.reply({embeds: [LinkSilindi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = "<:reddet:1121426474856087632>"
        } else {
        PreVarmı = "<:onay:1121427062280949911>"
        }
  
        const ProjeSilindi = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Sistemden bir link silindi")
         .addFields({name: `<:botkullanici:1121431774619258891> **Kullanıcı adı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:user:1121402954671456358> **Kullanıcı tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: `<:icons_id:1121431988738470039> **Kullanıcı id**`, value: `${interaction.user.id}`})
         .addFields({name: `<:icons_todolist:1121403747050995842> **Sistemdeki link sayısı**`, value: `${db.fetch(`UptimeLink`).length}`})
         .addFields({name: `<:icons_link:1121399159921066096> **Kullanıcının link sayısı**`, value: `${db.fetch(`UptimeLink_${interaction.user.id}`).length}`})
         .addFields({name: `<:icons_premiumchannel:1121402323315474483> **Kullanıcının premiumu bulunuyormu**`, value: `${PreVarmı}`})
         .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
        client.channels.cache.get("1121471705370603530").send({embeds: [ProjeSilindi]})
        
      })  
   }
}