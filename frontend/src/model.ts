

export interface Category {
    id: string
    categoryName: string
}

export interface Question {
    id: string
    categoryName: string
    question: string
    questionState: string
    imageUrl?: string
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export interface TriviaQuizData {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answer: string
}