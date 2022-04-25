import {useNavigate} from "react-router-dom";
import andrea from "../images/andrea.jpg"
import codes from "../images/codes.png"

export default function LandingPage() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/" + where)
    }

    return (
        <div className={"mb-8"}>
            <div className={"flex flex-row bg-[#7ea87b] font-mono text-[#FFFFFF] h-96 mx-6"}>
                <div className={"basis-1/2 p-8"}>
                    TRUTHY ist ein kostenloses Webangebot für Studierende,
                    die ihr Programmierwissen abfragen und erweitern möchten.
                    Mit true/false Fragen wird geprüft was Du schon kannst und was nochmal gelernt werden sollte.
                    Mit dem TRUTHY Editor kannst Du deine individuellen Fragen hinzufügen.
                </div>

                <img className={"basis-1/2"} alt={"Schülerin mit Notebook"} width={"400"} src={andrea}/>
            </div>
            <div className={"flex flex-row bg-[#fffaaf] mx-6 h-96"}>
                <div className={"basis-1/2 p-20"}><img alt={"codes"} width={200} src={codes}/></div>
                <div className={"basis-1/2 bg-[#1e5a78] font-mono text-[#FFFFFF] p-8"}>
                    Ganz einfach programmieren lernen!
                    <br/>
                    Log Dich ein und leg los...
                    <br/>
                    <button className={"border-none bg-[#7ea87b] font-bold text-[#FFFFFF] text-2xl rounded-md px-8 mt-2"}
                            onClick={() => routeToPath("categories")}>Start
                    </button>
                    <br/>
                    <button className={"border-none bg-[#7ea87b] font-bold text-[#FFFFFF] text-2xl rounded-md px-2 mt-2"}
                            onClick={() => routeToPath("register")}>Registrieren
                    </button>
                </div>
            </div>
        </div>
    )
}