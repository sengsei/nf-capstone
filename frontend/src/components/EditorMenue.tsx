import {useNavigate} from "react-router-dom";


export default function EditorMenue() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/"+where)
    }

    return(
        <div className={"bg-[#D1EEE9] mx-6 h-80"}>
            <button className={"border-none bg-[#A7C584] font-bold text-[#F6C915] rounded-md px-3 mt-2"} onClick={() => routeToPath('editorcategories')}>Kategorie-Editor</button>
            <br/>
            <button className={"border-none bg-[#A7C584] font-bold text-[#F6C915] rounded-md px-3 mt-2"} onClick={() => routeToPath('truefalseedit')}>True/False Editor</button>
        </div>
    )
}