import {Category, Question} from "../model";
import {useEffect, useState} from "react";
import axios from "axios";
import mull from "../images/mull.png";


export default function TrueFalseEditor() {
    const [categoryName, setCategoryName] = useState('')
    const [question, setQuestion] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [questions, setQuestions] = useState([] as Array<Question>)
    const [questionState, setQuestionState] = useState('false')
    const [editMode, setEditMode] = useState(-1)
    const [categories, setCategories] = useState([] as Array<Category>)
    const [image, setImage] = useState({} as File)
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const timoutId = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timoutId)
    }, []);

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
                questionState: questionState,
                imageUrl: imageUrl
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error('Eine Frage kann nicht hinzugefügt werden.')
            })
            .then((data: Array<Question>) => data)
            .then(fetchAllQuestions)
            .then(() => setImageUrl(''))
            .then(() => setQuestion(''))
            .then(() => setQuestionState(''))
            .then(() => setCategoryName(''))
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
            .then(response => {
                if (response.ok) {
                    return response.json()
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
            .then((response) =>
                response.json()
            ).then(data => setImageUrl(data.secure_url))
    }

    useEffect(() => {
        fetchAllCategories();
    }, [])


    return (
        <div>
            <div className={"bg-[#fffaaf] mx-6"}>
                <div>
                    <label className={"font-bold text-[#1e5a78] ml-2"} htmlFor="html">CSV Upload</label>
                    <input className={"ml-2"} type={"file"} accept={".csv"}
                           onChange={ev => importCsv(ev.target.files![0])}/>
                </div>
                <input type={"text"} className={"block px-3 rounded ease-in-out mt-6 ml-2"} placeholder={"Frage"}
                       value={question} onChange={ev => setQuestion(ev.target.value)}/>
                <select className={"ml-2"} value={categoryName} onChange={ev => setCategoryName(ev.target.value)}>
                    <option value={''}>Wähle eine Kategorie</option>
                    {categories.map(e => <option key={e.id}>{e.categoryName}</option>)}
                </select>
                <input className={"ml-2"} type={"checkbox"} value={questionState}
                       onChange={ev => ev.target.checked ? setQuestionState("true") : setQuestionState("false")}/>
                <input className={"ml-2"} type={"file"} accept={".png"} onChange={ev => {
                    if (ev.target.files != null) {
                        setImage(ev.target.files[0])
                    }
                }}/>
                <div>{image.size > 0 &&
                    <button className={"border-none bg-[#1e5a78] font-bold text-[#FFFFFF] rounded-md px-2 mt-2 ml-2"}
                            onClick={uploadImage}>Upload</button>}</div>

                {errorMessage ? <p>{errorMessage}</p> :
                    <button className={"border-none bg-[#1e5a78] font-bold text-[#FFFFFF] rounded-md px-2 mt-2 ml-2 my-4"}
                            onClick={addQuestion}>Hinzufügen</button>}


            </div>

            <div className={"overflow-scroll h-96 bg-[#fffaaf] mx-6"}>

                <div>
                    {errorMessage ? <p>{errorMessage}</p> : questions.map((elem, index) => <div className={"flex"}
                                                                                                key={elem.id}>
                        <img className={"ml-2"} alt={"Löschen"} width={30} src={mull}
                             onClick={() => deleteQuestion(elem)}/>
                        <div className={"font-bold text-[#1e5a78] ml-2"}
                             onClick={() => setEditMode(index)}>{elem.question}</div>


                        {
                            editMode === index
                            &&
                            <div className={"flex flex-row"}>
                                <input className={"block px-3 rounded ease-in-out mt-6 ml-2"} type={"text"}
                                       placeholder={"Frage"} value={question}
                                       onChange={ev => setQuestion(ev.target.value)}/>
                                <input className={"block px-3 rounded ease-in-out mt-6 ml-2"} type={"text"}
                                       placeholder={"Kategorie"} value={categoryName}
                                       onChange={ev => setCategoryName(ev.target.value)}/>
                                <input className={"mt-6 ml-2"} type={"checkbox"} value={questionState}
                                       onChange={ev => ev.target.checked ? setQuestionState("true") : setQuestionState("false")}/>
                                <button
                                    className={"border-none bg-[#1e5a78] font-bold text-[#FFFFFF] rounded-md px-2 mt-6 ml-2"}
                                    onClick={() => changeQuestion(elem.id)}>Ändern
                                </button>
                            </div>
                        }
                    </div>)}

                </div>
            </div>
        </div>
    )
}