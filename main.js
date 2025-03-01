require('dotenv').config(); 
const TelegramBot = require('node-telegram-bot-api');
const os = require('os');
const process = require('process');
const si = require('systeminformation');
const fs = require('fs');
const path = require('path');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
console.log('Bot sedang berjalan...');
const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
};
const owners = readJsonFile('./data/owner.json'); 
const premiums = readJsonFile('./data/premium.json'); 
const users = readJsonFile('./data/users.json'); 
const isOwner = (userId) => {
  return owners.includes(userId);
};
const isPrem = (userId) => {
  return premiums.includes(userId);
};
const isUser = (userId) => {
  return users.includes(userId);
};
const handleGetMyId = (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  bot.sendMessage(chatId, `🆔 ID Anda adalah: \`${userId}\``, {
    parse_mode: 'Markdown',
  });
};
bot.onText(/\/(getmyid|myid|id)/, (msg) => {
  handleGetMyId(msg);
});
bot.onText(/\/chatid/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🆔 ID Chat ini adalah: \`${chatId}\``, { parse_mode: 'Markdown' });
});
bot.onText(/\/userinfo/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username ? `@${msg.from.username}` : 'Tidak ada';
  const fullName = `${msg.from.first_name || ''} ${msg.from.last_name || ''}`;
  const userType = msg.chat.type;
  const userInfo = `👤 *Informasi Pengguna:*\n\n` +
    `🆔 ID: \`${userId}\`\n` +
    `📛 Nama: *${fullName.trim()}*\n` +
    `🔗 Username: ${username}\n` +
    `🏷️ Tipe: *${userType}*`;
  bot.sendMessage(chatId, userInfo, { parse_mode: 'Markdown' });
});
const getServerStats = async () => {
  const uptime = os.uptime(); 
  const loadAverage = os.loadavg()[0].toFixed(2); 
  const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2); 
  const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2); 
  const usedMemory = (totalMemory - freeMemory).toFixed(2); 
  const cpuModel = os.cpus()[0].model; 
  const cpuCores = os.cpus().length; 
  const cpuArch = os.arch(); 
  const platform = os.platform(); 
  const hostname = os.hostname(); 
  const uptimeHours = Math.floor(uptime / 3600);
  const uptimeMinutes = Math.floor((uptime % 3600) / 60);
  const uptimeSeconds = Math.floor(uptime % 60);
  const uptimeFormatted = `${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`;
  const cpuUsage = await si.currentLoad(); 
  const diskUsage = await si.fsSize(); 
  const totalDisk = (diskUsage[0].size / 1024 / 1024 / 1024).toFixed(2); 
  const usedDisk = (diskUsage[0].used / 1024 / 1024 / 1024).toFixed(2); 
  const freeDisk = (totalDisk - usedDisk).toFixed(2); 
  return `📊 *Statistik Server:*
🖥 Hostname: *${hostname}*
⏳ Uptime: *${uptimeFormatted}*
⚙️ CPU: *${cpuModel} (${cpuCores} Core, ${cpuArch})*
📉 CPU Usage: *${cpuUsage.currentLoad.toFixed(2)}%*
📈 Load Avg: *${loadAverage}*
💾 RAM Total: *${totalMemory} MB*
🔴 RAM Terpakai: *${usedMemory} MB*
🟢 RAM Tersisa: *${freeMemory} MB*
🗂 Disk Total: *${totalDisk} GB*
📂 Disk Terpakai: *${usedDisk} GB*
📁 Disk Tersisa: *${freeDisk} GB*
🛠 OS: *${platform}*`;
};
bot.onText(/\/ping/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  if (!isOwner(userId)) {
    return bot.sendMessage(chatId, '❌ Maaf, perintah ini hanya untuk owner.');
  }
  const serverStats = await getServerStats();
  bot.sendMessage(chatId, `🏓 *Pong!* Bot sedang aktif.\n\n${serverStats}`, {
    parse_mode: 'Markdown',
  });
});
bot.onText(/\/time/, (msg) => {
  const chatId = msg.chat.id;
  const now = new Date();
  const timeString = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  bot.sendMessage(chatId, `⏳ Waktu sekarang: *${timeString}*`, { parse_mode: 'Markdown' });
});
bot.on('message', (msg) => {
  if (msg.sticker) {
    const chatId = msg.chat.id;
    const stickerId = msg.sticker.file_id;

    bot.sendMessage(chatId, `🆔 ID Stiker: \`${stickerId}\``, { parse_mode: 'Markdown' });
  }
});
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const startMessage = `✨ Selamat datang! Berikut adalah perintah yang tersedia:
  ✅ /getmyid - Menampilkan ID Telegram Anda
  ✅ /chatid - Menampilkan Chat ID
  ✅ /userinfo - Menampilkan informasi pengguna
  ✅ /ping - Mengecek status Server (hanya untuk owner)
  ✅ /time - Menampilkan waktu sekarang
  ✅ Kirim stiker - Untuk mendapatkan ID stiker
  Silakan gunakan perintah di atas untuk mencoba fitur bot ini!`;
  bot.sendMessage(chatId, startMessage, { parse_mode: 'Markdown' });
});
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(chatId, 'Halo! Kirim /start untuk melihat daftar perintah.');
  }
});