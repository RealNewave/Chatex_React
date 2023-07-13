import axios, {AxiosInstance, AxiosResponse} from "axios";

let socket: WebSocket;
let connected = false;
let token = localStorage.getItem("token") || "";
const axiosInstance: AxiosInstance = axios.create({baseURL:  "http://localhost:8080/api/v1/questions"});

export function closeSocket(): void{
    if(socket){
        socket.close();
    }
    axiosInstance
}

export function getSocket(questionId: string, username: string): WebSocket {
    if(socket){
        if(socket.url.includes(String(questionId)) && socket.url.includes(username)){
            socket.close();
        }
    }
    if(!socket) {
        socket = new WebSocket("ws://localhost:8080/api/v1/questions/" + questionId + "/" + username);
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
    return axiosInstance.get( "/", {headers: {"Authorization": token, "username": username}})
        .then(response => response.data);
}

export function getQuestion(username: string, questionId: string): Promise<Question> {
    return axiosInstance.get("/" + username + "/" + questionId)
        .then(response => response.data);
}

export function login(username: string, password: string): Promise<string> {
    return axios.post("http://localhost:8080/api/v1/responders/login", {username, password})
        .then(response => {
            return response.data;
        });
}

export function createResponder(username: string, password: string) {
    return axios.post("http://localhost:8080/api/v1/responders", {username, password});
}

export function answerQuestion(questionId: string, username: string, answer: string): void {
    if(!connected){
        getSocket(questionId, username);
    }
    socket.send(answer);
}


export type Answer = {
        username: string
        answer: string
        timestamp: string
    }

export type Question = {
        id: string;
        starter: string
        question: string
        answers: []
        timestamp: string
    }
