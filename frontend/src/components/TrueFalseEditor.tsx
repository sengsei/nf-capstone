import {Question} from "../model";
import {useEffect, useState} from "react";



export default function TrueFalseEditor() {
    const[categoryName, setCategoryName] = useState(localStorage.getItem('category') ?? '')
    const[question, setQuestion] = useState(localStorage.getItem('question') ?? '')
    const[state, setState] = useState( '')
    const[addErrorMessage, setAddErrorMessage] = useState('');


    useEffect(() => {
        setTimeout(() => setAddErrorMessage(''), 10000)
        localStorage.setItem('question', question)
        localStorage.setItem('category', categoryName)
    } , [question, categoryName, state]);

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
            .catch(e => setAddErrorMessage(e.message))
    }

    return(
        <div>
            <input type={"text"} placeholder={"Frage"} value={question} onChange={ev => setQuestion(ev.target.value)}/>
            <input type={"text"} placeholder={"Kategorie"} value={categoryName} onChange={ev => setCategoryName(ev.target.value)}/>
            <input type={"text"} placeholder={"1 oder 0"} value={state} onChange={ev => setState(ev.target.value)}/>
            {addErrorMessage ? <p>{addErrorMessage}</p> : <button onClick={addQuestion}>Hinzufügen</button>}
        </div>
    )
}