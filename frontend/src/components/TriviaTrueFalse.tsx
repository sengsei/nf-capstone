import {useEffect, useState} from "react";
import {TriviaQuizData} from "../model";

export default function TriviaTrueFalse(){

    const url = "https://opentdb.com/api.php?amount=3&category=18&type=boolean"
    const [questions, setQuestion] = useState([] as Array<TriviaQuizData>)


    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setQuestion(data.results)
            })
    }, [])


    return(
        <div>
            {
               questions.map((e, index) => <p key={index}>{e.question}</p>)

            }
        </div>
    )
}