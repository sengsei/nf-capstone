import {useEffect, useState} from "react";
import {Category} from "../model";
import {useNavigate} from "react-router-dom";

export default function CategoryList() {

    const [categories, setCategories] = useState([] as Array<Category>)
    const[errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const fetchAllCategories = () => {

        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
            method: "GET"
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
        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories/${category.id}`, {
            method: 'DELETE'
        })
            .then(() => fetchAllCategories())

    }

    return (
        <div>
            {errorMessage ? <p>{errorMessage}</p> : categories.map((elem) =>
                <p key={elem.id}>{elem.categoryName}
                    <button onClick={() => routeToTrueFalseQuestion(elem.categoryName)}>Wahr/Falsch Fragen</button>
                    <button onClick={() => deleteCategory(elem)}>Löschen</button>
                </p>
            )}
        <div>
            <button onClick={() => routeToPath('questions/trivia-tf')}>Trivia-Wahr/Falsch</button>
        </div>
        </div>
    )

}