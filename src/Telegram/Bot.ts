import axios from "axios";
import {SocksProxyAgent} from 'socks-proxy-agent';
import {GetMe, SendMessage, Updates} from "./Types";

const agent = new SocksProxyAgent(
    'socks5h://127.0.0.1:1060'
);

const axiosProxy = axios.create({
    httpsAgent: agent,
    httpAgent: agent
})

export class Bot {
    constructor(protected token: String) {
    }

    api(method: string): string {
        return `https://api.telegram.org/bot${this.token}/${method}`
    }

    async getMe(): Promise<GetMe> {
        return await axiosProxy.get(this.api('getMe')).then(res => res.data);
    }

    async getUpdates(offset?:number): Promise<Updates> {
        console.count()
        return await axiosProxy.post(this.api('getUpdates'),{
            offset
        }).then(res => res.data);
    }

    async sendMessage(chat_id:number,text:string):Promise<SendMessage>{
        return await axiosProxy.post(this.api('sendMessage'), {
            chat_id,
            text
        }).then(res => res.data);
    }

    async deleteMessage(chat_id:number,message_id:number):Promise<Boolean>{
        return await axiosProxy.post(this.api('deleteMessage'), {
            chat_id,
            message_id
        }).then(() => true)
            .catch(() => false);
    }
}

