"use client";
import { Header } from "@/components/Header";
import { RentalAbout } from "@/components/RentalAbout";
import { Button, Divider, Spin } from "@douyinfe/semi-ui";

import { RentalForm } from "@/components/RentalForm";
import { useContext, useState } from "react";
import { B2cContext } from "../b2cviewmodel";
import { PaymentCenter } from "@/components/PaymentCenter";
import { PaymentTimeout } from "@/components/PaymentTimeout";
import { DepositStatus } from "@/types/data/DepositOrder";
import { PaymentSuccess } from "@/components/PaymentSuccess";
import { PaymentHistory } from "@/components/PaymentHistory";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import { IconCamera, IconSidebar, IconChevronDown ,IconRefresh} from '@douyinfe/semi-icons';
import { DepositOrderContext } from "../depositorderviewmodel";
import { Copyright } from "@/components/Copyright";
export default function B2c() {
  const {
    resourceType,
    receivingAddress,
    amount,
    duration,
    setResourceType,
    setReceivingAddress,
    setAmount,
    setDuration,
    payOrder,
  } = useContext(B2cContext);
  const {search,loading} = useContext(DepositOrderContext)
  const [isExpired, setIsExpired] = useState(false);
  function render() {
    if (payOrder) {
      if (payOrder.t1.status == DepositStatus.RECEIVED) {
        return <PaymentSuccess />;
      } else if (isExpired) {
        return <PaymentTimeout></PaymentTimeout>;
      } else {
        return <PaymentCenter setIsExpired={setIsExpired} />;
      }
    } else {
      return <RentalForm />;
    }
  }
  return (
    <div className="relative w-full h-screen">
      <div
        style={{ height: "100%", width: "100%" }}
        className="relative flex  items-center justify-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
      ></div>
      <div className="absolute inset-0  flex flex-col items-center justify-start w-flull h-screen overflow-auto">
        <Header />
        <Divider />
        <div className="flex lg:flex-row flex-col items-center justify-center w-full p-4 lg:w-1/2 mt-12">
          <div className="hidden lg:flex flex-row items-center justify-start w-full ">
            <RentalAbout />
          </div>
          <div className="flex flex-row items-center justify-start w-full border border-blue-400 rounded-2xl ">
            {render()}
          </div>
        </div>
        <div className="flex lg:flex-col flex-col items-center justify-center w-full p-4 lg:w-1/2 mt-24">
          <div className="flex flex-row items-center justify-between w-full p-4  border-blue-400">
            <Title heading={4}>支付记录</Title>
            <button onClick={search}  >{ loading ? <Spin /> : <IconRefresh  />}</button>
          </div>
          <PaymentHistory />
        </div>
        <Copyright/>
      </div>
    </div>
  );
}
