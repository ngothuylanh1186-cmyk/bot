const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'aechatsmp.progamer.me',
    port:41679 ,
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

    bot.once('end', () => clearInterval(antiAFK))
  })

  // 🏆 Tự động uống Ominous Bottle khi Raid Victory
  bot.on('entityEffect', async (entity, effect) => {
    // Hero of the Village = effect id 32
    if (entity === bot.entity && effect.id === 32) {
      console.log('🏆 Raid Victory! Đang tìm Ominous Bottle...')
      await drinkOminousBottle()
    }
  })

  async function drinkOminousBottle() {
    // Tìm Ominous Bottle trong inventory
    const bottle = bot.inventory.items().find(item =>
      item.name.includes('ominous_bottle')
    )

    if (!bottle) {
      console.log('❌ Không tìm thấy Ominous Bottle trong túi đồ!')
      return
    }

    try {
      // Trang bị vào tay
      await bot.equip(bottle, 'hand')
      console.log('🍶 Đã cầm Ominous Bottle, đang uống...')

      // Uống (giữ chuột phải)
      bot.activateItem()
      await new Promise(r => setTimeout(r, 1600)) // Giữ 1.6 giây để uống xong
      bot.deactivateItem()

      console.log('✅ Đã uống Ominous Bottle! Bad Omen kích hoạt!')
    } catch (err) {
      console.log('⚠️ Lỗi khi uống Ominous Bottle:', err.message)
    }
  }

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
