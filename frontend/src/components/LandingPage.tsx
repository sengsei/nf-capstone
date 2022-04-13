import {useNavigate} from "react-router-dom";
import andrea from "../images/andrea.jpg"
import codes from "../images/codes.png"

export default function LandingPage() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/" + where)
    }

    return (
        <div>
            <div className={"flex flex-row bg-[#6B8A47] font-sans text-[#F6C915]"}>
                <div>
                    TRUTHY ist ein kostenloses Webangebot für Studierende, die ihr Programmierwissen abfragen und
                    erweitern
                    möchten.
                    <br/>
                    Mit true/false Fragen wird geprüft was Du schon kannst und was nochmal gelernt werden sollte.
                    <br/>
                    Mit dem TRUTHY Editor kannst Du deine individuellen Fragen hinzufügen.
                </div>
                <img alt={"Schülerin mit Notebook"} width={"400"} src={andrea}/>
            </div>
            <div className={"flex flex-row bg-[#FAC240]"}>
                <div className={"basis-1/2"}><img alt={"codes"} width={"200"} src={codes}/></div>
                <div className={"basis-1/2 bg-[#D1EEE9] font-sans text-[#6B8A47]"}>
                    Ganz einfach programmieren lernen!
                    <br/>
                    Log Dich ein und leg los...
                    <br/>
                    <button className={"border-none bg-[#A7C584] font-bold text-[#F6C915] rounded-md px-8 mt-1 "}
                            onClick={() => routeToPath("categories")}>Start
                    </button>
                    <br/>
                    <button className={"border-none bg-[#A7C584] font-bold text-[#F6C915] rounded-md px-2 mt-2"}
                            onClick={() => routeToPath("register")}>Registrieren
                    </button>
                </div>
            </div>
        </div>
    )
}