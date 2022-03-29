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


    return (
        <div>
            { errorMessage ? <p>{errorMessage}</p> :  categories.map((elem) => <p key={elem.id}>{elem.categoryName}</p> )}
        </div>
    )

}