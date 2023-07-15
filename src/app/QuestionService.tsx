import axios, {AxiosResponse} from "axios";

let socket: WebSocket;
let connected = false;
let token: string = localStorage.getItem("token") || "";
let username: string = localStorage.getItem("username") || "";
axios.defaults.baseURL =  "http://localhost:8080/api/v1/questions"

export function closeSocket(): void{
    if(socket){
        socket.close();
    }

}

export function getSocket(questionId: string): WebSocket {
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

export function createQuestion(subject: string): Promise<AxiosResponse<void>> {
    return axios.post("/", {subject, username}, {headers: {"Authorization": token, "username": username}})
}

export function getQuestions(): Promise<Question[]> {
    return axios.get( "/", {headers: {"Authorization": token, "username": username}})
        .then(response => response.data);
}

export function getQuestion(questionId: string): Promise<Question> {
    return axios.get("/" + username + "/" + questionId, {headers: {"Authorization": token, "username": username}})
        .then(response => response.data);
}

export function login(inputUsername: string, password: string): Promise<void> {
    return axios.post("http://localhost:8080/api/v1/responders/login", {"username": inputUsername, password})
        .then(response => {
            localStorage.setItem("token", response.data);
            localStorage.setItem("username", inputUsername);
            return;
        });
}

export function createResponder(username: string, password: string) {
    return axios.post("http://localhost:8080/api/v1/responders", {username, password});
}

export function answerQuestion(questionId: string, answer: string): void {
    if(!connected){
        getSocket(questionId);
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
