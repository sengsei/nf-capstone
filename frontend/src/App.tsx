import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {

    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route>

                    </Route>
                </Routes>
            </BrowserRouter>
            Landing Page
        </div>
    );
}

export default App;
