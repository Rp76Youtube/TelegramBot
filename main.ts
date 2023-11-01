import {Bot} from "./src/Telegram/Bot";
import {Message} from "./src/Telegram/Types";
import {DataSource} from "typeorm";
import {User} from "./src/Models/User";
import express from 'express';

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "reza",
    password: "password",
    database: "telegram_bot",
    synchronize: true,
    logging: true,
    entities: [User],
});

const token: string = '6569037292:AAGMNUK45qTbZFesSCkJ03aC2_JbBjcsxu0';
const bot: Bot = new Bot(token);

const exServer = express();

exServer.use(express.json());

// bot.setWebhook('https://298a-91-98-219-84.ngrok-free.app/');
exServer.all('/', (req, res) => {
    try {
        const pm: Message = req.body;

        const chatId: number = pm.message.chat.id;
        const text: string = pm.message.text;
        const resource=AppDataSource.getRepository(User);

        resource.findOne({
                where:{
                    chat_id:chatId
                }
            }).then((user:User | null)=>{
            if (!user)
                resource.save({
                    chat_id: chatId,
                    name: pm.message.from.first_name + ' ' + pm.message.from.last_name,
                    username: pm.message.from.username
                });
        }).catch(console.log)

        switch (text) {
            case '/start':
                bot.sendMessage(chatId, 'خوش‌آمدی عزیزم <3');
                break;
            default:
                bot.sendMessage(chatId, 'وای! من اصلا متوجه صحبت هات نمی‌شم!');
        }
    } catch (e) {
        console.log(e);
    }

    res.send('<h1>wow you found me :D</h1>');
});

AppDataSource.initialize()
    .then(() => {
        exServer.listen(1090, () => {
            console.log('im ready at http://127.0.0.1:1090');
        });
    }).catch(console.log)