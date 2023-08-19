const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('yenile')
    .setDescription('🔋 Bot sahibi özel komutu.')
    .setDMPermission(false),
              
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:reddet:1121426474856087632> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("<:icons_outage:1121804136208404480> | Hata")
        
      if(interaction.user.id !== "788717157919096854" && interaction.user.id !== "852863161605816320"){
      return interaction.reply({embeds: [YetkiYok]});
}
    
      const Başlatıldı = new EmbedBuilder()
         .setDescription(`<:tik_skyuptime:1133695185184882688> **Bot yeniden başlatılıyor.**`)
         .setColor('Green')
         .setTitle('<:dcoloricon_green:1125829143767040061> | İşlem Başarılı')
         .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
         
      interaction.reply({embeds: [Başlatıldı]})
        
      setTimeout(() => {
      console.log(`Miracle » Bot Yenileniyor`);
      process.exit(0);
      }, 2000) 
     
   }
}