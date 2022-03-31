import {useEffect, useState} from "react";
import {Category, Question} from "../model";


export default function EditorCategories(){
    const[category, setCategory] = useState(localStorage.getItem('category') ?? '')
    const[errorMessage, setErrorMessage] = useState('');
    const[categories, setCategories] = useState([] as Array<Category>)


    useEffect(() => {
        localStorage.setItem('category', category)
        const timoutId = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timoutId)
    } , [category]);

    const addCategory = () => {
        setCategory('')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryName: category
            })
        })
            .then(response => {
                if (response.ok){
                    return response.json()
                }
                throw Error('Eine Kategorie kann nicht hinzugefügt werden.')
            } )
            .then((data: Array<Category>) => data)
            .then(() => fetchAllCategories())
            .catch(e => setErrorMessage(e.message))
    }

    const fetchAllCategories = () => {

        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
            method: "GET"
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Es sind keine Kategorien zum Anzeigen vorhanden!')

            })
            .then((catFromBackend: Array<Question>) => setCategories(catFromBackend))
            .catch((e: Error) => setErrorMessage(e.message))
    }

    useEffect(() => {
        fetchAllCategories()
    }, [])

    return(
        <div>
            <input type={"text"} placeholder={"Kategorie"} value={category} onChange={ev => setCategory(ev.target.value)}/>
            {errorMessage ? <p>{errorMessage}</p> : <button id ="addBtn" onClick={addCategory}>Hinzufügen</button>}
            <div>
                {errorMessage ? <p>{errorMessage}</p> : categories.map((elem) => <p key={elem.id}>{elem.categoryName}
                    {elem.categoryName === category ? <p>Die Kategorie {elem.categoryName} ist schon vorhanden, bitte ändern Sie die Bezeichnung.</p> : ''}
                    </p>)}
            </div>
        </div>

    )
}