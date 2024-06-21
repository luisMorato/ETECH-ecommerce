import { dbChatProps } from "../interfaces/Chat.interface";


export class Chat {
    private props: dbChatProps

    constructor(props: dbChatProps){
        this.props = props
    }

    getChat = () => {
        return this.props;
    }
}