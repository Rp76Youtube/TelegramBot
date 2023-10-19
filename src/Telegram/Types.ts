export  type GetMe = {
    "ok": boolean,
    "result": {
        "id": number,
        "is_bot": boolean,
        "first_name": string,
        "username": string,
        "can_join_groups": boolean,
        "can_read_all_group_messages": boolean,
        "supports_inline_queries": boolean
    }
}

export type Message = {
    "update_id": number,
    "message": {
        "message_id": number,
        "from": {
            "id": number,
            "is_bot": boolean,
            "first_name": string,
            "last_name": string,
            "username": string,
            "language_code": string,
            "is_premium": boolean
        },
        "chat": {
            "id": number,
            "first_name": string,
            "last_name": string,
            "username": string,
            "type": string
        },
        "date": number,
        "text": string,
        "entities": [
            {
                "offset": number,
                "length": number,
                "type": string
            }
        ]
    }
}

export type Updates = {
    "ok": boolean,
    "result": Message[]
}

export type SendMessage = {
    "ok": boolean,
    "result": {
        "message_id": number,
        "from": {
            "id": number,
            "is_bot": boolean,
            "first_name": string,
            "username": string
        },
        "chat": {
            "id": number,
            "first_name": string,
            "last_name": string,
            "username": string,
            "type": string
        },
        "date": number,
        "text": string
    }
}