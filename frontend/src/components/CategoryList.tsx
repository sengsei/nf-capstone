import {useEffect, useState} from "react";
import {Category, Question} from "../model";
import {useNavigate, useParams} from "react-router-dom";
import mull from "../images/mull.png"


export default function CategoryList() {

    const [categories, setCategories] = useState([] as Array<Category>)
    const[errorMessage, setErrorMessage] = useState('')
    const [questions, setQuestions] = useState([] as Array<Question>)
    const params = useParams()

    const navigate = useNavigate()

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

    useEffect(() => {
        fetchAllCategories();
    }, [])

    useEffect( () => {
        const timoutId = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timoutId)
        }, [errorMessage]
    )

    useEffect(() => {
            getQuestionByCategory(params.categoryName ?? '')
                .then((data: Array<Question>) => setQuestions(data))

    }, [params.categoryName])

    const routeToTrueFalseQuestion = (categoryName:string) => {
      navigate(`/questions/${categoryName}`)
    }

    const routeToPath = (where: string) => {
        navigate("/"+where)
    }

    const deleteCategory = (category:Category) => {
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories/${category.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(() => fetchAllCategories())

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

    return (
        <div>
        <div className={"overflow-scroll h-96 bg-[#fffaaf] mx-6"}>
            {errorMessage ? <p>{errorMessage}</p> : categories.map((elem) =>
                <div className={"flex flex-row mt-2 p-8"} key={elem.id}>{<div className={"mr-4 mt-2 font-bold text-[#1e5a78] text-xl"}>{elem.categoryName}</div>}
                    <div className={"mr-4 mt-2 text-[#1e5a78]"}>{"[" + (questions.filter(e=> e.categoryName === elem.categoryName).length).toString(2) + "]"}<sub>2</sub></div>
                    <button
                        className={"border-none bg-[#1e5a78] font-bold text-[#FFFFFF] rounded-md px-2 mt-2"}
                        onClick={() => routeToTrueFalseQuestion(elem.categoryName)}>Fragen
                    </button>
                    <img alt={"Löschen"} width={30} src={mull} onClick={() => deleteCategory(elem)}/>
                </div>
            )}
        </div>

            <div className="flex flex-row mt-2 p-8 bg-[#1e5a78] mx-6">
                <div>
                    <button className={"border-none bg-[#7ea87b] font-bold text-[#FFFFFF] rounded-md px-3 mt-2 mx-6"}
                            onClick={() => routeToPath('questions/trivia-tf')}>Trivia-Fragen
                    </button>
                </div>
            </div>
            </div>
    )

}