import {Question} from "../model";
import {useEffect, useState} from "react";
import axios from "axios";



export default function TrueFalseEditor() {
    const[categoryName, setCategoryName] = useState(localStorage.getItem('category') ?? '')
    const[question, setQuestion] = useState(localStorage.getItem('question') ?? '')
    const[state, setState] = useState( '')
    const[errorMessage, setErrorMessage] = useState('')
    const[questions, setQuestions] = useState([] as Array<Question>)
    const[questionState, setQuestionState] = useState('')
    const [editMode, setEditMode] = useState(-1)


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
            .then(fetchAllQuestions)
            .catch(e => setErrorMessage(e.message))
    }

    const fetchAllQuestions = () => {
        setQuestionState('')
        setQuestion('')
        setCategoryName('')
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

    const deleteQuestion = (question: Question) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/questions/${question.id}`, {
            method: 'DELETE'
        })
            .then(() => fetchAllQuestions())
    }

    const importCsv = (file: File | null) => {
        const fileData = new FormData();
        fileData.append('csv', file!);

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/questions`, fileData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            }

        }).catch(error => {
            if (error.response.status === 422) {
                setErrorMessage('Nicht alle Einträge konnten importiert werden!');
            } else if (error.response.status === 400) {
                setErrorMessage('Die Einträge wurde nicht importiert. Guck ins Log!!!');
            }
        })
            .then(() => fetchAllQuestions())
    };

    const changeQuestion = (id: string) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/questions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                categoryName: categoryName,
                question: question,
                questionState: questionState
            })
        })
            .then(response => response.json())
            .then((qFromBackend: Array<Question>) => setQuestions(qFromBackend))
            .then(() => setEditMode(-1))
            .then(() => setQuestion(''))
            .then(() => setQuestionState(''))
            .then(() => setCategoryName(''))
    }

    return(
        <div>
            <div>
                <input type={"file"} accept={".csv"} onChange={ev => importCsv(ev.target.files![0])}/>
            </div>
            <input type={"text"} placeholder={"Frage"} value={question} onChange={ev => setQuestion(ev.target.value)}/>
            <input type={"text"} placeholder={"Kategorie"} value={categoryName} onChange={ev => setCategoryName(ev.target.value)}/>
            <input type={"text"} placeholder={"true oder false"} value={state} onChange={ev => setState(ev.target.value)}/>
            {errorMessage ? <p>{errorMessage}</p> : <button onClick={addQuestion}>Hinzufügen</button>}
            <div>
                {errorMessage ? <p>{errorMessage}</p> : questions.map((elem, index) => <div key={elem.id}>
                 <div onClick={() => setEditMode(index)}>{elem.question}</div>
                <button onClick={() => deleteQuestion(elem)}>Löschen</button>

                    {
                        editMode === index
                        &&
                        <div>
                            <input type={"text"} placeholder={"Frage"} value={question} onChange={ev => setQuestion(ev.target.value)}/>
                            <input type={"text"}  placeholder={"Kategorie"} value={categoryName} onChange={ev => setCategoryName(ev.target.value)}/>
                            <input type={"text"} placeholder={"true oder false"} value={questionState} onChange={ev=>setQuestionState(ev.target.value)}/>
                            <button onClick={() => changeQuestion(elem.id)}>Ändern</button>
                        </div>
                    }
                </div>)}




            </div>
        </div>
    )
}