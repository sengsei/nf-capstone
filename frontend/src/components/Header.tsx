import {useNavigate} from "react-router-dom";

export default function Header() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/"+where)
    }

    return(
        <div>
            <div>Titel</div>
            <button onClick={() => routeToPath('login')}>Login</button>
            <button>Logout</button>
            <button onClick={() => routeToPath('categories')}>Home</button>
            <button>Konto</button>
            <button onClick={() => routeToPath('editormenue')}>Editor</button>
        </div>
    )
}