import {useEffect, useState} from "react";
import {Question} from "../model";

export default function QuestionListTrueFalse() {

    const [questions, setQuestions] = useState([] as Array<Question>)
    const [errorMessage, setErrorMessage] = useState('')

    const fetchAllQuestions = () => {

        fetch(`${process.env.REACT_APP_BASE_URL}/api/questions`, {
            method: "GET"
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Es sind keine Fragen zum Anzeigen vorhanden!')

            })
            .then((questionsFromBackend: Array<Question>) => setQuestions(questionsFromBackend))
            .catch((e: Error) => setErrorMessage(e.message))
    }

    useEffect(() => {
        fetchAllQuestions();
    }, [])

    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )

    return (
        <div>
            {errorMessage ? <p>{errorMessage}</p> : questions.map((elem) => <p key={elem.id}>{elem.question}</p>)}
        </div>
    )
}