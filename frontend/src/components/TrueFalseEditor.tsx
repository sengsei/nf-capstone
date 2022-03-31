import {Question} from "../model";
import {useEffect, useState} from "react";



export default function TrueFalseEditor() {
    const[categoryName, setCategoryName] = useState(localStorage.getItem('category') ?? '')
    const[question, setQuestion] = useState(localStorage.getItem('question') ?? '')
    const[state, setState] = useState( '')
    const[errorMessage, setErrorMessage] = useState('')
    const[questions, setQuestions] = useState([] as Array<Question>)


    useEffect(() => {
        localStorage.setItem('question', question)
        localStorage.setItem('category', categoryName)
        const timoutId = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timoutId)
    } , [question, categoryName]);

    const addQuestion = () => {
        setCategoryName('')
        setQuestion('')
        setState('')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryName: categoryName,
                question: question,
                questionState: state
            })
        })
            .then(response => {
                if (response.ok){
                    return response.json()
                }
                throw Error('Eine Frage kann nicht hinzugefügt werden.')
            } )
            .then((data: Array<Question>) => data)
            .catch(e => setErrorMessage(e.message))
    }

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
        fetchAllQuestions()
    }, [])

    return(
        <div>
            <input type={"text"} placeholder={"Frage"} value={question} onChange={ev => setQuestion(ev.target.value)}/>
            <input type={"text"} placeholder={"Kategorie"} value={categoryName} onChange={ev => setCategoryName(ev.target.value)}/>
            <input type={"text"} placeholder={"1 oder 0"} value={state} onChange={ev => setState(ev.target.value)}/>
            {errorMessage ? <p>{errorMessage}</p> : <button onClick={addQuestion}>Hinzufügen</button>}
            <div>
                {errorMessage ? <p>{errorMessage}</p> : questions.map((elem) => <p key={elem.id}>{elem.question}</p>)}
            </div>
        </div>
    )
}