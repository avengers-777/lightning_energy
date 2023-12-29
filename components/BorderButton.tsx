
export function BorderButton({title,onClick}:{title:string,onClick:()=>void }){
    return (
        <button onClick={onClick} className="border overflow-ellipsis border-gray-400 rounded-xl  px-4 py-1 cursor-pointer text-sm hover:border-blue-300  transition-transform hover:text-blue-300 w-full" >{title}</button>
    )
}