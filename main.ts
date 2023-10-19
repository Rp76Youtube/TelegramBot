import {Bot} from "./src/Telegram/Bot";
import http from 'http';
import {Message} from "./src/Telegram/Types";

const token: string = '6569037292:AAGMNUK45qTbZFesSCkJ03aC2_JbBjcsxu0';
const bot: Bot = new Bot(token);
let offset: number | undefined = undefined;

const server = http.createServer((req, res) => {
    let requestBody: any[] = [];

    req.on('data', chunk => {
        requestBody.push(chunk);
    });

    req.on('end', async () => {
        try {
            const pm: Message = JSON.parse(Buffer.concat(requestBody).toString());

            const chatId: number = pm.message.chat.id;
            const text: string = pm.message.text;
            switch (text) {
                case '/start':
                    await bot.sendMessage(chatId, 'خوش‌آمدی عزیزم <3');
                    break;
                default:
                    await bot.sendMessage(chatId, 'وای! من اصلا متوجه صحبت هات نمی‌شم!');
            }
        } catch (e) {
            console.log(e);
        }
    });

    res.end('<h1>wow you found me :D</h1>');
})

server.listen(1090, () => {
    console.log('im ready at http://127.0.0.1:1090');
});