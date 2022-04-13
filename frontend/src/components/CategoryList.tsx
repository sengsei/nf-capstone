import {useEffect, useState} from "react";
import {Category} from "../model";
import {useNavigate} from "react-router-dom";
import mull from "../images/mull.png"

export default function CategoryList() {

    const [categories, setCategories] = useState([] as Array<Category>)
    const[errorMessage, setErrorMessage] = useState('')

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

    return (
        <div className={"bg-[#D1EEE9] mx-6 h-80"}>
            {errorMessage ? <p>{errorMessage}</p> : categories.map((elem) =>
                <div className={"flex flex-row mt-2 "} key={elem.id}>{<div className={"mr-4 mt-2"}>{elem.categoryName}</div>}
                    <button
                        className={"border-none bg-[#A7C584] font-bold text-[#F6C915] rounded-md px-2 mt-2"}
                        onClick={() => routeToTrueFalseQuestion(elem.categoryName)}>Wahr/Falsch Fragen
                    </button>
                    <img alt={"Löschen"} width={30} src={mull} onClick={() => deleteCategory(elem)}/>
                </div>
            )}
        <div className={"flex flex-row mt-5 px-20"}>
            <button className={"border-none bg-[#A7C584] font-bold text-[#F6C915] rounded-md px-3 mt-2"} onClick={() => routeToPath('questions/trivia-tf')}>Trivia-Wahr/Falsch</button>
        </div>
        </div>
    )

}