import axios, {AxiosResponse} from "axios";

const questionUrl = "http://localhost:8080/api/v1/questions/";

export function createQuestion(subject: string): Promise<AxiosResponse<void>> {
    return axios.post(questionUrl, {subject});
}

export function getQuestions(): Promise<Question[]>{
    return axios.get(questionUrl)
        .then(response => response.data);
}

export function getQuestion(questionId: number): Promise<Question>{
    return axios.get(questionUrl + questionId)
        .then(response => response.data)
}

export function answerQuestion(questionId: number, answer: string): Promise<AxiosResponse<void>> {
    return axios.post(questionUrl + questionId, {username: null, answer});
}

export type Answer =
    {
        id: number;
        username: string
        answer: string
        timestamp: string
    }

export type Question =
    {
        id: number;
        starter: string
        question: string
        answers: []
        timestamp: string
    }
