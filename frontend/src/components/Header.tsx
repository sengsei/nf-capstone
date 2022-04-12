import {useNavigate} from "react-router-dom";

export default function Header() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/"+where)
    }

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    return(
        <div>
            <div>TRUTHY </div>
            <button onClick={() => routeToPath('login')}>Login</button>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => routeToPath('home')}>Home</button>
            <button>Konto</button>
            <button onClick={() => routeToPath('editormenue')}>Editor</button>
        </div>
    )
}