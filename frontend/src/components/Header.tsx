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
        <div className={"flex space-x-4 bg-[#7ea87b] my-6 mx-6"}>
            <div><img alt={"Logo"} width={"200"} src={logo}/></div>
            <div><button className={"font-bold text-[#FFFFFF] text-2xl hover:bg-[#1e5a78]"} onClick={() => routeToPath('login')}>Login</button></div>
            <div><button className={"font-bold text-[#FFFFFF] text-2xl hover:bg-[#1e5a78]"} onClick={() => logout()}>Logout</button></div>
            <div><button className={"font-bold text-[#FFFFFF] text-2xl hover:bg-[#1e5a78]"} onClick={() => routeToPath('home')}>Home</button></div>
            <div><button className={"font-bold text-[#FFFFFF] text-2xl hover:bg-[#1e5a78]"}>Konto</button></div>
            <div><button className={"font-bold text-[#FFFFFF] text-2xl hover:bg-[#1e5a78]"} onClick={() => routeToPath('editormenue')}>Editor</button></div>
        </div>
    )
}