import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CategoryList from "./components/CategoryList";
import QuestionListTrueFalse from "./components/QuestionListTrueFalse";
import EditorMenue from "./components/EditorMenue";
import TrueFalseEditor from "./components/TrueFalseEditor";
import EditorCategories from "./components/EditorCategories";
import TriviaTrueFalse from "./components/TriviaTrueFalse";


function App() {

    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<LandingPage/>}/>
                    <Route path={'/categories'} element={<CategoryList/>}/>
                    <Route path={'/questions/:categoryName'} element={<QuestionListTrueFalse/>}/>
                    <Route path={'/editormenue'} element={<EditorMenue/>}/>
                    <Route path={'/truefalseedit'} element={<TrueFalseEditor/>}/>
                    <Route path={'/editorcategories'} element={<EditorCategories/>}/>
                    <Route path={'/questions/trivia-tf'} element={<TriviaTrueFalse/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
