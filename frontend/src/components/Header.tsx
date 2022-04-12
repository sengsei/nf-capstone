import {useNavigate} from "react-router-dom";

export default function Header() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/"+where)
    }

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return(
        <div className={"flex space-x-4 bg-lime-500"}>
            <div>TRUTHY </div>
            <div><button className={"font-bold text-amber-400"} onClick={() => routeToPath('login')}>Login</button></div>
            <div><button className={"font-bold text-amber-400"} onClick={() => logout()}>Logout</button></div>
            <div><button className={"font-bold text-amber-400"} onClick={() => routeToPath('home')}>Home</button></div>
            <div><button className={"font-bold text-amber-400"}>Konto</button></div>
            <div><button className={"font-bold text-amber-400"} onClick={() => routeToPath('editormenue')}>Editor</button></div>
        </div>
    )
}