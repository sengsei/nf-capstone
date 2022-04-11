import {useNavigate} from "react-router-dom";


export default function LandingPage() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/" + where)
    }



    return (
        <div>
            <div>
                TRUTHY ist ein kostenloses Webangebot für Studierende, die ihr Programmierwissen abfragen und erweitern möchten.
                Mit true/false Fragen wird geprüft was Du schon kannst und was nochmal gelernt werden sollte.
                Mit dem TRUTHY Editor kannst Du deine individuellen Fragen hinzufügen.
            </div>
                <button onClick={() => routeToPath("categories")}>Start</button>
                <button onClick={() => routeToPath("register")}>Registrieren</button>
        </div>
    )
}