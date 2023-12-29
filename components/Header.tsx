import { IconBolt } from "@douyinfe/semi-icons";
import Link from "next/link";
export function Header(){
    return (
        <nav className="flex flex-row items-center justify-start p-4 w-full ">
            <Link href={"/"} className="flex flex-row ">
            <IconBolt style={{ fontSize: 28, marginRight: 4 }} />
            <h1 className="text-xl lg:text-2xl  font-bold ">闪电能量</h1>
            </Link>
           
          </nav>
    )
}