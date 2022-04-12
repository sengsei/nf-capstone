import {Category, Question} from "../model";
import {useEffect, useState} from "react";
import axios from "axios";



export default function TrueFalseEditor() {
    const[categoryName, setCategoryName] = useState('')
    const[question, setQuestion] = useState('')
    const[errorMessage, setErrorMessage] = useState('')
    const[questions, setQuestions] = useState([] as Array<Question>)
    const[questionState, setQuestionState] = useState('')
    const [editMode, setEditMode] = useState(-1)
    const [categories, setCategories] = useState([] as Array<Category>)
    const [image, setImage] = useState({} as File)
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const timoutId = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timoutId)
    } , []);

    const addQuestion = () => {
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_BASE_URL}/api/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                categoryName: categoryName,
                question: question,
                questionState: questionState
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

    useEffect(() => {
        fetchAllQuestions()
    }, [])

    const deleteQuestion = (question: Question) => {
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_BASE_URL}/api/questions/${question.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(() => fetchAllQuestions())
    }

    const importCsv = (file: File | null) => {
        const fileData = new FormData();
        fileData.append('csv', file!);
        const token = localStorage.getItem("token")

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/questions`, fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + token
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
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_BASE_URL}/api/questions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
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

    const fetchAllCategories = () => {
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response =>
            {
                if(response.ok){
                    return  response.json()
                }
                throw new Error('Es sind keine Kategorien zum Anzeigen vorhanden!')

            })
            .then((catFromBackend: Array<Category>) => setCategories(catFromBackend))
            .catch((e: Error) => setErrorMessage(e.message))
    }

    const uploadImage = () => {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'z7uvczz9')

        fetch(`https://api.cloudinary.com/v1_1/robo42/image/upload`, {
            method: "POST",
            body: formData
        })
            .then((response) => {
                response.json()
            })
    }

    useEffect(() => {
        fetchAllCategories();
    }, [])


    return(
        <div>
            <div>
                <input type={"file"} accept={".csv"} onChange={ev => importCsv(ev.target.files![0])}/>
            </div>
            <input type={"text"} placeholder={"Frage"} value={question} onChange={ev => setQuestion(ev.target.value)}/>
            <select value={categoryName} onChange={ev => setCategoryName(ev.target.value)}>
                <option value={''}>Wähle eine Kategorie</option>
                {categories.map(e => <option key={e.id}>{e.categoryName}</option>)}
            </select>
            <input type={"checkbox"} value={questionState} onChange={ev => ev.target.checked ? setQuestionState("true") : setQuestionState("false")}/>

            {errorMessage ? <p>{errorMessage}</p> : <button onClick={addQuestion}>Hinzufügen</button>}
            <div>
                {errorMessage ? <p>{errorMessage}</p> : questions.map((elem, index) => <div key={elem.id}>
                    <div onClick={() => setEditMode(index)}>{elem.question}</div>
                    <button onClick={() => deleteQuestion(elem)}>Löschen</button>
                    <input type={"file"} accept={".png"} onChange={ev => {if (ev.target.files != null) {setImage(ev.target.files[0])}}}/>
                    <div>{image.size > 0 && <button onClick={uploadImage}>Upload</button>}</div>

                    {
                        editMode === index
                        &&
                        <div>
                            <input type={"text"} placeholder={"Frage"} value={question} onChange={ev => setQuestion(ev.target.value)}/>
                            <input type={"text"}  placeholder={"Kategorie"} value={categoryName} onChange={ev => setCategoryName(ev.target.value)}/>
                            <input type={"checkbox"} value={questionState} onChange={ev => ev.target.checked ? setQuestionState("true") : setQuestionState("false")}/>
                            <button onClick={() => changeQuestion(elem.id)}>Ändern</button>
                        </div>
                    }
                </div>)}

            </div>
        </div>
    )
}