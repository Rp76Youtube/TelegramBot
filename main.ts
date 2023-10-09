import {Bot} from "./src/Telegram/Bot";

const token: string = '6569037292:AAGMNUK45qTbZFesSCkJ03aC2_JbBjcsxu0';
const bot: Bot = new Bot(token);
let offset:number | undefined=undefined;

setInterval(async function () {
    await bot.getUpdates(offset).then(res => {
        res.result.forEach(async (pm) => {
            const chatId: number = pm.message.chat.id;
            const text: string = pm.message.text;

            switch (text) {
                case '/start':
                    await bot.sendMessage(chatId, 'خوش‌آمدی عزیزم <3');
                    break;
                default:
                    await bot.sendMessage(chatId, 'وای! من اصلا متوجه صحبت هات نمی‌شم!');
            }

            offset = pm.update_id + 1;
        });
    });
}, 5000);