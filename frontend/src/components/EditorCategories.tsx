import {useEffect, useState} from "react";
import {Category} from "../model";


export default function EditorCategories(){
    const[category, setCategory] = useState(localStorage.getItem('category') ?? '')
    const[addErrorMessage, setAddErrorMessage] = useState('');


    useEffect(() => {
        localStorage.setItem('category', category)
        const timoutId = setTimeout(() => setAddErrorMessage(''), 10000)
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
            .catch(e => setAddErrorMessage(e.message))
    }

    return(
        <div>
            <input type={"text"} placeholder={"Kategorie"} value={category} onChange={ev => setCategory(ev.target.value)}/>
            {addErrorMessage ? <p>{addErrorMessage}</p> : <button onClick={addCategory}>Hinzufügen</button>}
        </div>
    )
}