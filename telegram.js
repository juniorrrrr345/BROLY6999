
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import Product from '../models/Product.model.js';

dotenv.config();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const userState = {};

bot.onText(/(.+)-([0-9]+)€/, (msg, match) => {
  const chatId = msg.chat.id;
  const name = match[1].trim();
  const price = parseFloat(match[2].trim());
  userState[chatId] = { name, price };
  bot.sendMessage(chatId, 'Parfait. Maintenant, envoie-moi la photo ou la vidéo du produit.');
});

bot.on(['photo', 'video'], async (msg) => {
  const chatId = msg.chat.id;
  const data = userState[chatId];
  if (!data) return bot.sendMessage(chatId, 'Commence par envoyer "Nom - Prix€"');

  const fileId = msg.photo ? msg.photo.pop().file_id : msg.video.file_id;
  const file = await bot.getFileLink(fileId);

  const newProduct = new Product({
    name: data.name,
    price: data.price,
    media: file.href,
    type: msg.photo ? 'photo' : 'video'
  });

  await newProduct.save();
  bot.sendMessage(chatId, 'Produit enregistré avec succès !');
  delete userState[chatId];
});
