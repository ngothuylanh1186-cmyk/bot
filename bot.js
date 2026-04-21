const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'aechatsmp.sdlf.fun',      // IP server của bạn
  port: 25565,            // Port server (mặc định 25565)
  username: 'MyBot',      // Tên bot
  version: '1.21.11',     // Phiên bản server
  // auth: 'microsoft',   // Bỏ comment nếu server online mode
})

// Khi bot vào server thành công
bot.once('spawn', () => {
  console.log('✅ Bot đã vào server thành công!')
  bot.chat('Xin chào mọi người!') // Bot chat khi vào
})

// Khi bị kick hoặc lỗi
bot.on('kicked', (reason) => {
  console.log('❌ Bị kick:', reason)
})

bot.on('error', (err) => {
  console.log('⚠️ Lỗi:', err)
})

bot.on('end', () => {
  console.log('🔴 Bot đã disconnect')
})