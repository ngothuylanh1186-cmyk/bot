const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'aechatsmp.progamer.me',
    port: 41679,
    username: 'MyBot',
    version: '1.21.11',
    // auth: 'microsoft',
  })

  // ✅ Khi bot vào server thành công
  bot.once('spawn', () => {
    console.log('✅ Bot đã vào server thành công!')
    bot.chat('Xin chào mọi người!')

    // 🔄 Chống AFK - nhảy mỗi 4 phút
    const antiAFK = setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
        console.log('🦘 Anti-AFK: Bot đã nhảy!')
      }
    }, 4 * 60 * 1000)

    // Dọn interval khi bot disconnect
    bot.once('end', () => clearInterval(antiAFK))
  })

  // ❌ Khi bị kick
  bot.on('kicked', (reason) => {
    console.log('❌ Bị kick:', reason)
  })

  // ⚠️ Lỗi
  bot.on('error', (err) => {
    console.log('⚠️ Lỗi:', err.message)
  })

  // 🔴 Khi disconnect -> tự reconnect sau 10 giây
  bot.on('end', () => {
    console.log('🔴 Bot đã disconnect. Reconnect sau 10 giây...')
    setTimeout(() => {
      console.log('🔁 Đang reconnect...')
      createBot()
    }, 10 * 1000)
  })
}

createBot()
