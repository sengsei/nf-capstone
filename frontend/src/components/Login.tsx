import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
            <input type={"text"} placeholder={"E-Mail"} value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <input type={"password"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={login}>Login</button>
            <br/>
            <button onClick={() => routeToPath("register")}>Register</button>
        </div>
    )
}