"use client";
import { Divider, Space } from "@douyinfe/semi-ui";
import Image from "next/image";
import { IconBolt } from "@douyinfe/semi-icons";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import * as THREE from "three";
import { useEffect, useState } from "react";
import ThreeContainer from "@/components/ThreeContainer";
import { DigitalDisplay } from "@/components/DigitalDisplay";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Copyright } from "@/components/Copyright";

export default function Home() {
  const [totalEnergy, setTotalEnergy] = useState<number>(644654954);
  const [totalEnergyProvided, setTotalEnergyProvided] =
    useState<number>(45559359032);
  const [savedTrx, setSavedTrx] = useState<number>(63203334);
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalEnergy((prev) => prev + prev * 0.0001);
      setTotalEnergyProvided((prev) => prev + prev * 0.0001);
      setSavedTrx((prev) => prev + prev * 0.0001);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div
        style={{ height: "100%", width: "100%" }}
        className="relative flex  items-center justify-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
      ></div>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <div className="flex flex-col items-center justify-start w-full h-full flex-grow overflow-auto">
          <Header/>

          <Divider />
          <div className="flex flex-col items-center justify-center w-full  py-32 ">
            <h1 className="text-3xl lg:text-6xl  font-bold ">
              TRON能量交易平台
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center w-full ">
          <Link className="border  rounded px-20 py-2 cursor-pointer text-lg hover:border-blue-300 hover:scale-105 transition-transform hover:text-blue-300" href="/b2c">获得能量</Link>
       
          </div>
          <div className="flex  lg:flex-row flex-col items-center justify-center w-full lg:mt-48 mt-10">
            <DigitalDisplay
              title={"平台总能量"}
              number={totalEnergy}
            ></DigitalDisplay>
            <DigitalDisplay
              title={"累计提供能量"}
              number={totalEnergyProvided}
            ></DigitalDisplay>
            <DigitalDisplay
              title={"累计节省TRX"}
              number={savedTrx}
            ></DigitalDisplay>
          </div>
        </div>
        <Copyright/>
      </div>
    </div>
  );
}
