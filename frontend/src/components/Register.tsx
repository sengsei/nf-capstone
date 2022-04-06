import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Register(){

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[vPassword, setVPassword] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = setTimeout(() => setErrorMessage(''), 15000);
        return () => clearTimeout(timeoutId);
    }, [errorMessage]);

    const register = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
            method:"POST",
            body: JSON.stringify({
                "email":email,
                "password": password,
                "passwordAgain": vPassword
            }),
            headers: {
                "Content-Type":"application/json"
            }
        })
            .then(response => {
                if (response.status === 400){
                    setErrorMessage('password is not the same')
                } else if(response.status === 409) {
                    setErrorMessage('username is in use')
                }

            })
            .then(() => navigate("/login"))

    }

    return (
        <div>
            <input type={"text"} placeholder={"E-Mail"} value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <input type={"password"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <input type={"password"} placeholder={"reply password"} value={vPassword} onChange={e => setVPassword(e.target.value)}/><br/>
            <button onClick={register}>Register</button>
        </div>

    )
}