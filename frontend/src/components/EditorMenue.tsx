import {useNavigate} from "react-router-dom";


export default function EditorMenue() {

    const navigate = useNavigate()

    const routeToPath = (where: string) => {
        navigate("/"+where)
    }

    return(
        <div className={"bg-[#1e5a78] mx-6 h-80"}>
            <button className={"border-none bg-[#7ea87b] font-bold text-[#FFFFFF] rounded-md px-3 mt-2 mx-6"} onClick={() => routeToPath('editorcategories')}>Kategorie-Editor</button>
            <br/>
            <button className={"border-none bg-[#7ea87b] font-bold text-[#FFFFFF] rounded-md px-3 mt-2 mx-6"} onClick={() => routeToPath('truefalseedit')}>True/False Editor</button>
        </div>
    )
}