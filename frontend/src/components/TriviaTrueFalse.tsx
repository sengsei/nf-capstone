import {useEffect, useState} from "react";
import {TriviaQuizData} from "../model";
import wahr from "../images/wahr.png";
import falsch from "../images/falsch.png";

export default function TriviaTrueFalse() {

    const [amount, setAmount] = useState(1 as number)
    const [errorMessage, setErrorMessage] = useState('')

    const url = `https://opentdb.com/api.php?amount=${amount}&category=18&type=boolean`
    const [questions, setQuestion] = useState([] as Array<TriviaQuizData>)

    const loadQuestions = () => {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Es sind keine Fragen zum Anzeigen vorhanden!')

            })
            .then(data => {
                setQuestion(data.results)
            })
            .catch((e: Error) => setErrorMessage(e.message))
    }

    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )

    const checkWrongAnswer = (elem: TriviaQuizData, index: string) => {
        const elemById = document.getElementById(index)!;
        elem.correct_answer === 'False' ? elemById.setAttribute("style", 'background-color:#ff9196')
            : elemById.setAttribute("style", 'background-color:#64c8b9')
    }

    const checkRightAnswer = (elem: TriviaQuizData, index: string) => {
        const elemById = document.getElementById(index)!;
        elem.correct_answer === 'True' ? elemById.setAttribute("style", 'background-color:#ff9196')
            : elemById.setAttribute("style", 'background-color:#64c8b9')
    }

    return (
        <div className={"bg-[#fffaaf] mx-6"}>
            <label className={"font-bold text-[#1e5a78] text-xl"} htmlFor={"qname"}>Gebe die Anzahl der Fragen zwischen
                (1-10) ein:</label>
            <input type={"number"} id={"qname"} placeholder={"Anzahl der Fragen"} min={"1"} max={"10"} value={amount}
                   onChange={ev => setAmount(ev.target.valueAsNumber)}/>
            <button className={"border-none bg-[#1e5a78] font-bold text-[#FFFFFF] rounded-md px-2 mt-2 ml-2 text-2xl"}
                    onClick={() => loadQuestions()}>Start
            </button>

            {
                errorMessage ? <p>{errorMessage}</p> :
                    questions.map((elem, index) => <div className={"font-bold text-[#1e5a78] text-xl"}
                                                        id={index.toString()}
                                                        key={index}>{elem.question}
                        <div className={"flex flex-row"}>
                            <img alt={""} width={30} src={wahr}
                                 onClick={() => checkWrongAnswer(elem, index.toString())}/>
                            <img alt="" width={30} src={falsch}
                                 onClick={() => checkRightAnswer(elem, index.toString())}/>
                        </div>
                    </div>)

            }
        </div>
    )
}