import {useEffect, useState} from "react";
import {Question} from "../model";
import {useParams} from "react-router-dom";

export default function QuestionListTrueFalse() {

    const [questions, setQuestions] = useState([] as Array<Question>)
    const [errorMessage, setErrorMessage] = useState('')
    const params = useParams()


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



    const getQuestionByCategory = (categoryName : string) => {
        return fetch(`${process.env.REACT_APP_BASE_URL}/api/questions/${categoryName}`,{

        })
            .then(response => {
                if (response.ok){
                    return response.json()
                } else {
                    throw Error("Keine Frage mit der Kategorie "+categoryName+" gefunden!")
                }
            })
    }

    useEffect(() => {
        params.categoryName === "all" ?
        fetchAllQuestions() :
        getQuestionByCategory(params.categoryName ?? '')
            .then((data: Array<Question>) => setQuestions(data))

    }, [params.categoryName])

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