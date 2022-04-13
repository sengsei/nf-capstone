import {useNavigate} from "react-router-dom";
import logo from "../images/logo.png";

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
        <div className={"flex space-x-4 bg-[#A7C584]"}>
            <div><img alt={"Logo"} src={logo}/></div>
            <div><button className={"font-bold text-[#F6C915]"} onClick={() => routeToPath('login')}>Login</button></div>
            <div><button className={"font-bold text-[#F6C915]"} onClick={() => logout()}>Logout</button></div>
            <div><button className={"font-bold text-[#F6C915]"} onClick={() => routeToPath('home')}>Home</button></div>
            <div><button className={"font-bold text-[#F6C915]"}>Konto</button></div>
            <div><button className={"font-bold text-[#F6C915]"} onClick={() => routeToPath('editormenue')}>Editor</button></div>
        </div>
    )
}