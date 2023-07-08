import axios, {AxiosResponse} from "axios";

let socket: WebSocket;
let connected = false;
const axiosInstance = axios.create({baseURL:  "https://chatex-backend.onrender.com/api/v1/questions", headers: {"Access-Control-Allow-Origin": "*"}});

export function closeSocket(): void{
    if(socket){
        socket.close();
    }
}

export function getSocket(questionId: string, username: string): WebSocket {
    if(socket){
        if(socket.url.includes(String(questionId)) && socket.url.includes(username)){
            socket.close();
        }
    }
    if(!socket) {
        socket = new WebSocket("ws://chatex-backend.onrender.com/api/v1/questions/" + questionId + "/" + username);
        socket.onopen = () => {
            connected = true;
        }
        socket.onerror = (error) => {
            connected = false
        }
        socket.onclose = () => {
            connected = false;
        }
    }
    return socket;
}

export function createQuestion(username: string, subject: string): Promise<AxiosResponse<void>> {
    return axiosInstance.post("/", {subject, username});
}

export function getQuestions(username: string): Promise<Question[]> {
    return axiosInstance.get( "/" + username)
        .then(response => response.data);
}

export function getQuestion(username: string, questionId: string): Promise<Question> {
    return axiosInstance.get("/" + username + "/" + questionId)
        .then(response => response.data)
}

export function answerQuestion(questionId: string, username: string, answer: string): void {
    if(!connected){
        getSocket(questionId, username);
    }
    socket.send(answer);
}


export type Answer =
    {
        username: string
        answer: string
        timestamp: string
    }

export type Question =
    {
        id: string;
        starter: string
        question: string
        answers: []
        timestamp: string
    }
