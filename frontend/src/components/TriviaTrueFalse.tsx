import {useEffect, useState} from "react";
import {TriviaQuizData} from "../model";

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
        elem.correct_answer === 'False' ? elemById.setAttribute("style", 'background-color:green')
            : elemById.setAttribute("style", 'background-color:red')
    }

    const checkRightAnswer = (elem: TriviaQuizData, index: string) => {
        const elemById = document.getElementById(index)!;
        elem.correct_answer === 'True' ? elemById.setAttribute("style", 'background-color:green')
            : elemById.setAttribute("style", 'background-color:red')
    }

    return (
        <div>
            <label htmlFor={"qname"}>Gebe die Anzahl der Fragen zwischen (1-10) ein:</label>
            <input type={"number"} id={"qname"} placeholder={"Anzahl der Fragen"} min={"1"} max={"10"} value={amount}
                   onChange={ev => setAmount(ev.target.valueAsNumber)}/>
            <button onClick={() => loadQuestions()}>Start</button>
            {
                errorMessage ? <p>{errorMessage}</p> :
                    questions.map((elem, index) => <div id={index.toString()}
                                                        key={index}>{elem.question}
                        <div>
                            <button onClick={() => checkWrongAnswer(elem, index.toString())}>F</button>
                            <button onClick={() => checkRightAnswer(elem, index.toString())}>W</button>
                        </div>
                    </div>)

            }
        </div>
    )
}