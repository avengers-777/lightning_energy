"use client";
import {
  Descriptions,
  Divider,
  Input,
  InputNumber,
  Popover,
  Radio,
  RadioGroup,
  Space,
  Spin,
  Tag,
  Toast,
  Tooltip,
} from "@douyinfe/semi-ui";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import { BorderButton } from "./BorderButton";
import { B2cContext } from "@/app/b2cviewmodel";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ResourceCode } from "@/types/data/TronResourceRentalOrder";
import { MultipleAddressInput } from "./MultipleAddressInput";
import { IconHome, IconHelpCircle } from "@douyinfe/semi-icons";
import { TimeUnit, getTimeUnitChinese, handleCopy } from "@/types/common/Constants";
import { NumberButton } from "./NumberButton";
import { PaymentDetailsPreview } from "./PaymentDetailsPreview";
import ResourcePriceCalculator from "@/utils/ResourcePriceCalculator";
import QRCodeComponent from "./QRCodeComponent";
import { formatAmountAsFloat } from "@/types/enums/Currency";
import { Status } from "@/types/data/TronAccount";
import { Tools } from "@/utils/Tools";
declare global {
  interface Window {
    tronWeb?: any; // 暂时使用 `any` 类型，或者您可以定义更具体的类型
  }
}

export function PaymentCenter({setIsExpired}:{setIsExpired:Dispatch<SetStateAction<boolean>>}) {
  const { payOrder ,setPayOrder} = useContext(B2cContext);
  const [timeLeft,setTimeLeft] = useState<string>();
  const [loading,setLoading] = useState(false)
 
  let descriptionsData = [{ key: "地址:", value: payOrder?.t2.base58CheckAddress }]
  if (payOrder?.t2.status == Status.INACTIVATED){
    descriptionsData.push({key:"地址需激活:",value:"已扣除地址激活费用，请按照页面提示金额转账"})
  }
  function calculateExpirationTime(){
    if (payOrder){
      const time = payOrder.t1.expirationDate - new Date().getTime()
      if (time > 0){
        const result = Tools.formatExpiration(payOrder.t1.expirationDate - new Date().getTime())
        setTimeLeft(result)
      }else{
        setIsExpired(true)
      }
       
    }
  }
  
  async function sendTrx(toAddress: string, amount: number) {
    if (window.tronWeb && window.tronWeb.ready) {
      const tronWeb = window.tronWeb;
      
      try {
        const transaction = await tronWeb.transactionBuilder.sendTrx(
          toAddress,
          amount,
          tronWeb.defaultAddress.base58
        );
        const signedTx = await tronWeb.trx.sign(transaction);
        const broadcast = await tronWeb.trx.sendRawTransaction(signedTx);
        setLoading(true)
        return broadcast;
      } catch (error) {
        Toast.error(`Error sending TRX: ${error}`)
      }
    } else {
      Toast.error("TronWeb 未找到或未准备好")
    }
  }
  useEffect(()=>{
    calculateExpirationTime()
    const interval = setInterval(() => {
        calculateExpirationTime()
        }, 1000); 
        return () => clearInterval(interval);
  },[])
  return (
    <div className="flex flex-col items-start justify-center space-y-4 w-full ">
      <div className="flex flex-col items-center justify-center w-full ">
        <Title
          className="p-2 border-b border-blue-400 w-full text-center"
          heading={4}
        >
          支付中心
        </Title>
      </div>
      <div className="flex flex-col items-center justify-center w-full ">
        {payOrder && (
          <span className="text-blue-400 font-bold text-4xl ">{`${formatAmountAsFloat(
            payOrder.t1.amount,
            payOrder.t1.currency
          )} ${payOrder.t1.currency}`}</span>
        )}
        <span className="text-gray-500  text-base">请转账</span>
      </div>
      <div className="flex flex-col items-center justify-center w-full ">
        <QRCodeComponent text={payOrder?.t2.base58CheckAddress ?? ""}></QRCodeComponent>
      </div>
      <div className="flex flex-orw items-center justify-center w-full text-gray-500 space-x-2 ">
        <span className="text-base">剩余时间:</span>
        <span className="text-base">{timeLeft}</span>
      </div>
      <div className="flex flex-col items-center justify-center w-full ">
        <Descriptions
          data={descriptionsData}
        ></Descriptions>
      </div>

      <div className="flex flex-row items-center justify-center w-full px-4 space-x-4">
        {payOrder && <>
            <BorderButton title="复制金额" onClick={() => handleCopy(formatAmountAsFloat(
            payOrder.t1.amount,
            payOrder.t1.currency
          ).toString())}></BorderButton>
          <BorderButton title="复制地址" onClick={() => handleCopy(payOrder.t2.base58CheckAddress)}></BorderButton>
        </>
          }
        
        
      </div>
      <div className="flex flex-row items-center justify-center w-full px-4 ">
        {payOrder && <BorderButton
          title={loading ?  "正在处理中请稍后..." : "使用 TronLink 支付"}
          onClick={() => sendTrx(payOrder.t2.base58CheckAddress,payOrder.t1.amount)}
        ></BorderButton>}
        
      </div>

      <div className="flex flex-col items-start justify-center space-y-2 w-full  ">
        <button onClick={()=>setPayOrder(undefined)} className="border-t border-blue-400   py-2 cursor-pointer text-xl   transition-transform hover:text-blue-300 w-full">
          返回
        </button>
      </div>
    </div>
  );
}
