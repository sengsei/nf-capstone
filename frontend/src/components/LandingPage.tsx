import {useNavigate} from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/" + where)
    }

    return (
        <div>
            <div>
                Hier wird die App beschrieben und es erscheint ein Empfangstext
            </div>
                <button onClick={() => routeToPath("categories")}>Start</button>
                <button onClick={() => routeToPath("register")}>Registrieren</button>
        </div>
    )
}