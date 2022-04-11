import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CategoryList from "./components/CategoryList";
import QuestionListTrueFalse from "./components/QuestionListTrueFalse";
import EditorMenue from "./components/EditorMenue";
import TrueFalseEditor from "./components/TrueFalseEditor";
import EditorCategories from "./components/EditorCategories";
import TriviaTrueFalse from "./components/TriviaTrueFalse";
import Login from "./components/Login";
import Register from "./components/Register";

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={"Loading..."}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<App/>}>
                        <Route path={'/home'} element={<LandingPage/>}/>
                        <Route path={'/categories'} element={<CategoryList/>}/>
                        <Route path={'/questions/:categoryName'} element={<QuestionListTrueFalse/>}/>
                        <Route path={'/editormenue'} element={<EditorMenue/>}/>
                        <Route path={'/truefalseedit'} element={<TrueFalseEditor/>}/>
                        <Route path={'/editorcategories'} element={<EditorCategories/>}/>
                        <Route path={'/questions/trivia-tf'} element={<TriviaTrueFalse/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
