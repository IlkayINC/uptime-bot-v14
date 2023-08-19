const Discord = require('discord.js')
const db = require("croxydb")
const links = db.fetch("UptimeLink") || []    
const Kurulu = db.fetch(`UptimeSistemi`) || []
module.exports = {
    name: 'ready',
      
    execute(client) {
      console.log(`Miracle Uptime » Bot başarıyla aktif!`)
      client.user.setStatus('idle');

      const activities = [
        `🚀 ${links.length} Link Aktif!`,
        `${client.users.cache.size} Kullanıcı`,
        `🚀 Miracle Uptime | /yardım`,
        `🔋 /ekle-glitch | /ekle-replit`
      ]
      setInterval(() => {
        client.user.setActivity({
          name: activities[Math.floor(Math.random() * activities.length)],
        });
        client.user.setStatus('idle');
      }, 5000)
    }
}