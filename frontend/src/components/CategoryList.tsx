import {useEffect, useState} from "react";
import {Category} from "../model";


export default function CategoryList() {

    const [categories, setCategories] = useState([] as Array<Category>)
    const[errorMessage, setErrorMessage] = useState('')

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
            .then((todosFromBackend: Array<Category>) => setCategories(todosFromBackend))
            .catch((e: Error) => setErrorMessage(e.message))
    }

    useEffect( () => {
        setTimeout(() => setErrorMessage(''), 10000)
        fetchAllCategories()
        }, []
    )


    return (
        <div>
            { errorMessage ? <p>{errorMessage}</p> :  categories.map((elem) => <p key={elem.id}>{elem.categoryName}</p> )}
        </div>
    )

}