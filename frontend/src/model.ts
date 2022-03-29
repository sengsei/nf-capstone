export interface Category {
    id: string
    categoryName: string
}

export interface Question {
    id: string
    categoryName: string
    question: string
    questionState: boolean
}