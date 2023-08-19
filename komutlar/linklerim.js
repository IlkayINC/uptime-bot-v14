const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('linklerim')
    .setDescription('🔋 Sistemdeki linklerinizi listeler.')
    .setDMPermission(false),
      
    async execute(client, interaction) {   
      
      const ProjeEklenmemiş = new EmbedBuilder()
          .setColor("Red")
          .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
          .setTitle("Hata")
          .setDescription(`<:reddet:1121426474856087632>  **Sisteme hiç proje eklememişsin.**`)
          .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    
      const LinkYok = db.get(`UptimeLink_${interaction.user.id}`)
 			if (!LinkYok) return interaction.reply({embeds: [ProjeEklenmemiş]})
        
        const links = db.get(`UptimeLink_${interaction.user.id}`).map(map => `<:icons_djoin:1121681856358797413> ${map}`).join("\n")

        const LinkListe = new EmbedBuilder()
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
            .setDescription(`
            ${links || "Sisteme eklenmiş bir proje yok."}
            
            
> <:icons_exclamation:1121710964245549136> Link silerken linkinizin sonundaki / sembolünü siliniz aksi takdirde hata verecektir ve linkinizi Sistemden silmeyecektir.
            
            `)
        .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
            .setColor("Blue")

        interaction.reply({
            embeds: [LinkListe],
            ephemeral: true
        }).catch(e => { })
      
    }
}