import axios, {AxiosResponse} from "axios";

export function getThreads(): Promise<Thread[]>{
    return axios.get("http://localhost:8080/api/v1/messages/")
        .then(response => response.data);
}

export function createThread(subject: string): Promise<AxiosResponse<any>> {
    return axios.post("http://localhost:8080/api/v1/messages/");
}

export function getMessages(threadId: number): Promise<Message[]>{
    return axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.data);
}

export function addMessage(message: string, threadId: number): void {
    axios.post("http://localhost:8080/api/v1/messages/" + threadId);
}

export type Message =
    {
        userId: number
        body: string
        title: string
    }

export type Thread =
    {
        sender_id: number
        subject: string
        receivers: string[]
        replies: []
        timestamp: string
    }
