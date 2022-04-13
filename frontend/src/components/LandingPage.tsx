import {useNavigate} from "react-router-dom";
import book from "../images/student-with-book.jpg"


export default function LandingPage() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/" + where)
    }



    return (
        <div>
            <div className={"columns-2 bg-lime-700 font-sans text-amber-400"}>
                TRUTHY ist ein kostenloses Webangebot für Studierende, die ihr Programmierwissen abfragen und erweitern möchten.
                Mit true/false Fragen wird geprüft was Du schon kannst und was nochmal gelernt werden sollte.
                Mit dem TRUTHY Editor kannst Du deine individuellen Fragen hinzufügen.
                <img alt={"Schüler mit Buch"} width={"200"} height={"200"} src={book}/>
            </div>
            <div className={"columns-2"}>
                <button onClick={() => routeToPath("categories")}>Start</button>
                <button onClick={() => routeToPath("register")}>Registrieren</button>
            </div>

        </div>
    )
}