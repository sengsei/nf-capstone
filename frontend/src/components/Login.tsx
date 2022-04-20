import {useState} from "react";
import {useNavigate} from "react-router-dom";
import log from "../images/login.jpg"


export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const login = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/users/login`, {
            method: "POST",
            body: JSON.stringify({
                "username": email,
                "password": password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                return response.text()
            })
            .then((responseBody: string) => {
                localStorage.setItem("token", responseBody)
                navigate("/")
            })
    }

    const routeToPath = (where: string) => {
        navigate("/"+where)
    }

    return(
        <div>
            <div className={"flex flex-row bg-[#1e5a78] mx-6"}>
                <div className="basis-1/2 p-20">
                    <input type={"text"} className={"block px-3 rounded ease-in-out"} placeholder={"E-Mail"} value={email} onChange={e => setEmail(e.target.value)}/><br/>
                    <input type={"password"} className={"block px-3 rounded ease-in-out"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
                    <button className={"border-none bg-[#7ea87b] font-bold text-[#FFFFFF] text-2xl rounded-md px-8 mt-2"} onClick={login}>Login</button>
                    <br/>
                    <button className={"border-none bg-[#7ea87b] font-bold text-[#FFFFFF] text-2xl rounded-md px-8 mt-2"} onClick={() => routeToPath("register")}>Register</button>
                </div>
                <div className={"basis-1/2"}>
                    <img alt={"login"}  src={log}/>
                </div>

            </div>

        </div>
    )
}