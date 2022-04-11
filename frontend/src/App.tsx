import Header from "./components/Header";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";



function App() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/" + where)
    }

    useEffect(() => {
        routeToPath("home")
    }, [])

    return (
        <div>

                <Header/>
                <Outlet/>

        </div>
    );
}

export default App;
