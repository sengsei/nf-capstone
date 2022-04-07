import {useEffect, useState} from "react";
import {Category, Question} from "../model";


export default function EditorCategories() {
    const [category, setCategory] = useState(localStorage.getItem('category') ?? '')
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([] as Array<Category>)
    const [editMode, setEditMode] = useState(-1)


    useEffect(() => {
        localStorage.setItem('category', category)
        const timoutId = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timoutId)
    }, [category]);

    const addCategory = () => {
        const token = localStorage.getItem("token")
        setCategory('')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                categoryName: category
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error('Eine Kategorie kann nicht hinzugefügt werden.')
            })
            .then((data: Array<Category>) => data
            )
            .then(() => fetchAllCategories())
            .catch(e => setErrorMessage(e.message))
    }

    const fetchAllCategories = () => {
        const token = localStorage.getItem("token")
        setCategory('')
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
            .then((catFromBackend: Array<Question>) => setCategories(catFromBackend))
            .catch((e: Error) => setErrorMessage(e.message))
    }

    const changeCategory = (id: string) => {
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                id: id,
                categoryName: category
            })
        })
            .then(response => response.json())
            .then((catFromBacked: Array<Category>) => setCategories(catFromBacked))
            .then(() => setEditMode(-1))
            .then(() => setCategory(''))
    }

    const deleteCategory = (id: string) => {
        const token = localStorage.getItem("token")
        fetch(`${process.env.REACT_APP_BASE_URL}/api/categories/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(() => fetchAllCategories())
    }


    useEffect(() => {
        fetchAllCategories()
    }, [])

    const existing = () => {
        return categories.filter(e => e.categoryName === category).length > 0
    }

    return (
        <div>
            <input type={"text"} placeholder={"Kategorie"} value={category}
                   onChange={ev => setCategory(ev.target.value)}/>
            {errorMessage ? <p>{errorMessage}</p> :
                <button id="addBtn" onClick={addCategory} disabled={existing()}>Hinzufügen</button>}
            <div>

                {errorMessage ? <p>{errorMessage}</p> : categories.map((elem, index) => <div key={elem.id}><div
                    onClick={() => setEditMode(index)}>{elem.categoryName}</div>
                    <button onClick={() => deleteCategory(elem.id)}>Löschen</button>

                    {
                        editMode === index
                        &&
                        <div>
                            <input type={"text"} value={category} placeholder={"Kategorie"} onChange={ev => setCategory(ev.target.value)}/>
                            <button onClick={() => changeCategory(elem.id)}>Ändern</button>
                        </div>
                    }
                </div>)}

            </div>
        </div>


    )
}