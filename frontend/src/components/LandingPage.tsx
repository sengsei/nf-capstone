import {useNavigate} from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate()

    const routeToTrueCategories = () => {
        navigate("/categories")
    }

    return (
        <div>
            <div>
                Hier wird die App beschrieben und es erscheint ein Empfangstext
            </div>
            <button onClick={routeToTrueCategories}>Start</button>
        </div>
    )
}