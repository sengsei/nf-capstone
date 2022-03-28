import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";


function App() {

    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LandingPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
