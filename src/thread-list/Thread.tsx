export type Thread =
    {
        sender_id: number
        subject: string
        receivers: string[]
        replies: []
        timestamp: string
    }