import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import log from "../images/login.jpg";

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [vPassword, setVPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = setTimeout(() => setErrorMessage(''), 15000);
        return () => clearTimeout(timeoutId);
    }, [errorMessage]);

    const register = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password,
                "passwordAgain": vPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 400) {
                    setErrorMessage('password is not the same')
                } else if (response.status === 409) {
                    setErrorMessage('username is in use')
                }

            })
            .then(() => navigate("/login"))

    }

    return (
        <div>
            <div className={"flex flex-row bg-[#1e5a78] mx-6"}>
                <div className="basis-1/2 p-20">
                    <input type={"text"} className={"block px-3 rounded ease-in-out"} placeholder={"E-Mail"}
                           value={email} onChange={e => setEmail(e.target.value)}/><br/>
                    <input type={"password"} className={"block px-3 rounded ease-in-out"} placeholder={"password"}
                           value={password} onChange={e => setPassword(e.target.value)}/><br/>
                    <input type={"password"} className={"block px-3 rounded ease-in-out"} placeholder={"reply password"}
                           value={vPassword} onChange={e => setVPassword(e.target.value)}/><br/>
                    <button
                        className={"border-none bg-[#7ea87b] font-bold text-[#FFFFFF] text-2xl rounded-md px-8 mt-2"}
                        onClick={register}>Register
                    </button>
                </div>
                <div className={"basis-1/2"}>
                    <img alt={"login"} src={log}/>
                </div>
            </div>
        </div>

    )
}