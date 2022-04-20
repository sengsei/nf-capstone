import {useEffect, useState} from "react";
import {Question} from "../model";
import {useParams} from "react-router-dom";
import wahr from "../images/wahr.png"
import falsch from "../images/falsch.png"


export default function QuestionListTrueFalse() {

    const [questions, setQuestions] = useState([] as Array<Question>)
    const [errorMessage, setErrorMessage] = useState('')
    const [questionCounter, setQuestionCounter] = useState(0);
    const [numberOfAllQuestions, setNumberOfAllQuestions] = useState(0)
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

    const getQuestionByCategory = (categoryName: string) => {
        const token = localStorage.getItem("token")
        return fetch(`${process.env.REACT_APP_BASE_URL}/api/questions/${categoryName}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error("Keine Frage mit der Kategorie " + categoryName + " gefunden!")
                }
            })
    }

    useEffect(() => {
        params.categoryName === "all" ?
            fetchAllQuestions() :
            getQuestionByCategory(params.categoryName ?? '')
                .then((data: Array<Question>) => setQuestions(data))

    }, [params.categoryName, questionCounter])

    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )

    const handleQuestionCount = () => {
        setQuestionCounter(questionCounter + 1)
        setNumberOfAllQuestions(questions.length)
    }

    const checkWrongAnswer = (elem: Question) => {
        const elemById = document.getElementById(elem.id)!;
        elem.questionState === 'false' ? elemById.setAttribute("style", 'background-color:green')
            : elemById.setAttribute("style", 'background-color:red')
        if (elem.questionState === 'false') {
            handleQuestionCount()
        }
    }

    const checkRightAnswer = (elem: Question) => {
        const elemById = document.getElementById(elem.id)!;
        elem.questionState === 'true' ? elemById.setAttribute("style", 'background-color:green')
            : elemById.setAttribute("style", 'background-color:red')
        if (elem.questionState === 'true') {
            handleQuestionCount()
        }
    }

    return (
        <div>
            <div className={"mx-6 font-bold text-[#1e5a78]"}>{questionCounter} von {numberOfAllQuestions}</div>
            <div className={"overflow-scroll h-96 bg-[#fffaaf] mx-6"}>
                {errorMessage ? <p>{errorMessage}</p> : questions.map((elem) => <div
                    className={"font-bold text-[#1e5a78] text-xl"} id={elem.id}
                    key={elem.id}> {elem.question}
                    <div><img src={elem.imageUrl} alt={""}/></div>
                    <img alt={""} width={30} src={wahr} onClick={() => checkRightAnswer(elem)}/>
                    <img alt="" width={30} src={falsch} onClick={() => checkWrongAnswer(elem)}/>
                </div>)}
            </div>
        </div>
    )
}