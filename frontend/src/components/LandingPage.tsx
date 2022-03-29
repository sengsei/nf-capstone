import {useNavigate} from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate()


    return (
        <div>
            <div>
                Hier wird die App beschrieben und es erscheint ein Empfangstext
            </div>
            <button onClick={() => {
        navigate("/categories")}>Start</button>
        </div>
    )
}