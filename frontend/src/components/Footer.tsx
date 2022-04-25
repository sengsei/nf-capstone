import github from "../images/github.png";

export default function Footer() {

    return (
        <div>
            <div className={"flex space-x-4 bg-[#7ea87b] my-14 mb-8 mx-6 h-20 p-2 "}>
                <div className={"text-[#FFFFFF] text-xl"}>Get connected with me</div>

                <div>
                    <a href={"https://github.com/sengsei"}><img alt={"GitHub"} src={github} width={30}/></a>
                    </div>
            </div>
        </div>
    )
}