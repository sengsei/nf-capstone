import {useNavigate} from "react-router-dom";

export default function Header() {

    const navigate = useNavigate()

    const routeToHome = () => {
        navigate("/categories")
    }

    return(
        <div>
            <div>Titel</div>
            <button>Login</button>
            <button>Logout</button>
            <button onClick={routeToHome}>Home</button>
            <button>Konto</button>
        </div>
    )
}