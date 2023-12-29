import { ReactNode } from "react";

export function NumberButton({children,onPress}:{children:ReactNode,onPress:()=>void}){
    return (
        <button onClick={onPress} className="flex flex-row justify-center items-center hover:border-blue-300 hover:border h-12 w-12">{children}</button>
    )
}