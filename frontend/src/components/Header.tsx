import {useNavigate} from "react-router-dom";

export default function Header() {

    const navigate = useNavigate()

    const routeToHome = (where: string) => {
        navigate("/"+where)
    }

    return(
        <div>
            <div>Titel</div>
            <button>Login</button>
            <button>Logout</button>
            <button onClick={() => routeToHome('categories')}>Home</button>
            <button>Konto</button>
        </div>
    )
}