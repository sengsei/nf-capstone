import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CategoryList from "./components/CategoryList";


function App() {

    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LandingPage/>}/>
                    <Route path={'/categories'} element={<CategoryList/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
