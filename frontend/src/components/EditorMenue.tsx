import {useNavigate} from "react-router-dom";


export default function EditorMenue() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/"+where)
    }

    return(
        <div>
            <button>Kategorie-Editor</button>
            <br/>
            <button onClick={() => routeToPath('truefalseedit')}>True/False Editor</button>
        </div>
    )
}