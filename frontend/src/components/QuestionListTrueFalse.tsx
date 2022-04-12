import {useEffect, useState} from "react";
import {Question} from "../model";
import {useParams} from "react-router-dom";


export default function QuestionListTrueFalse() {

    const [questions, setQuestions] = useState([] as Array<Question>)
    const [errorMessage, setErrorMessage] = useState('')
    const params = useParams()

    const fetchAllQuestions = () => {
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_BASE_URL}/api/questions`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
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
        const token = localStorage.getItem("token")
        return fetch(`${process.env.REACT_APP_BASE_URL}/api/questions/${categoryName}`,{
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
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

    const checkWrongAnswer = (elem: Question) => {
        const elemById = document.getElementById(elem.id)!;
        elem.questionState === 'false' ? elemById.setAttribute("style",'background-color:green')
            : elemById.setAttribute("style",'background-color:red')
    }

    const checkRightAnswer = (elem: Question) => {
        const elemById = document.getElementById(elem.id)!;
        elem.questionState === 'true' ? elemById.setAttribute("style",'background-color:green')
            : elemById.setAttribute("style",'background-color:red')
    }

    return (
        <div>
            {errorMessage ? <p>{errorMessage}</p> : questions.map((elem) => <div id={elem.id}
                                                                                 key={elem.id}> {elem.question}
                <div><img src={elem.imageUrl} alt={"Bild mit Wahr/Falsch Aufgabenstellung"}/></div>
                <div>
                    <button onClick={() => checkRightAnswer(elem)}>W</button>
                    <button onClick={() => checkWrongAnswer(elem)}>F</button>
                </div>
            </div>)}
        </div>
    )
}