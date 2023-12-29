"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Api, Params } from "@/networking/Api";
import { useRouter } from "next/navigation";
import { Notification, Button, ButtonGroup, Toast } from "@douyinfe/semi-ui";
import { NoticeReactProps } from "@douyinfe/semi-ui/lib/es/notification";
import { ResModel } from "@/types/common/ResModel";
import { Signature, SignatureType, SignatureTypeMessages } from "@/types/dto/Signature";
import { TokenInfo } from "@/types/dto/TokenInfo";
import { Admin } from "@/types/data/Admin";
import { NavItemProps, SubNavProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { AccountResourceMessage, initAccountResourceMessage } from "@/types/app/ResourceConverter";
import { TimeUnit, Tuple2 } from "@/types/common/Constants";
import { ResourceCode } from "@/types/data/TronResourceRentalOrder";
import { v4 as uuidv4 } from 'uuid';
import { TronAccount } from "@/types/data/TronAccount";
import { DepositOrder, DepositStatus } from "@/types/data/DepositOrder";
import { TronResourceRentalRequest } from "@/types/dto/TronResourceRentalRequest";
import { AppContext } from "./store";
import TronWeb from 'tronweb';

// 定义 AppContext 的类型
export interface B2cViewModel {
  resourceType: ResourceCode;
  receivingAddress: string[];
  amount: number | undefined;
  duration: number | undefined;
  setResourceType: Dispatch<SetStateAction<ResourceCode>>;
  setReceivingAddress: Dispatch<SetStateAction<string[]>>;
  setAmount: Dispatch<SetStateAction<number | undefined>>;
  setDuration: Dispatch<SetStateAction<number | undefined>>;
  timeUnit: TimeUnit;
  setTimeUnit: Dispatch<SetStateAction<TimeUnit>>;
  getTotalEnergy:()=> number;
  loading: boolean;
  payOrder: Tuple2<DepositOrder, TronAccount> | undefined;
  submitOrder(): Promise<void>;
  setPayOrder: Dispatch<SetStateAction<Tuple2<DepositOrder, TronAccount> | undefined>>

}

export const B2cContext = createContext<B2cViewModel>({
  resourceType: ResourceCode.ENERGY,
  receivingAddress: [],
  amount: undefined,
  duration: undefined,
  setResourceType: function (value: SetStateAction<ResourceCode>): void {
    throw new Error("Function not implemented.");
  },
  setReceivingAddress: function (value: SetStateAction<string[]>): void {
    throw new Error("Function not implemented.");
  },
  setAmount: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setDuration: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  timeUnit: TimeUnit.HOUR,
  setTimeUnit: function (value: SetStateAction<TimeUnit>): void {
    throw new Error("Function not implemented.");
  },
  getTotalEnergy: function (): number {
    throw new Error("Function not implemented.");
  },
  loading: false,
  payOrder: undefined,
  submitOrder: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  setPayOrder: function (value: SetStateAction<Tuple2<DepositOrder, TronAccount> | undefined>): void {
    throw new Error("Function not implemented.");
  }
});


function B2cProvider({ children }: {
  children: ReactNode;
}) {
  const router = useRouter();
  const api = new Api(router);
  const {deviceId} = useContext(AppContext)
  const [resourceType,setResourceType] = useState<ResourceCode>(ResourceCode.ENERGY)
  const [receivingAddress,setReceivingAddress] = useState<string []>([])
  const [amount,setAmount] = useState<number | undefined>()
  const [duration,setDuration] = useState<number | undefined> ()
  const [timeUnit,setTimeUnit] = useState<TimeUnit>(TimeUnit.HOUR)
  const [loading,setLoading] = useState(false)
  const [payOrder,setPayOrder] = useState<Tuple2<DepositOrder, TronAccount> | undefined>()

  function getTotalEnergy(){
    return (receivingAddress.length <1 ? 1 : receivingAddress.length) * (amount ?? 0)
  }
  async function refreshPaymentOrder() {
    if (payOrder && payOrder.t1.status == DepositStatus.PENDING){
      const result = await api.get<DepositOrder>(`/g/v1/tron/deposit/order/${payOrder.t1.id}`,{deviceId:deviceId})
      if (result.code == 0 && result.data){
        const newOrder:Tuple2<DepositOrder, TronAccount> ={
          t1: result.data,
          t2: payOrder.t2
        }
        setPayOrder(newOrder)
      } 
    }
   
    
  }
  function paymentVerification(){
    if (!amount){
        Toast.warning("数量不能为空")
        return false
    }else if(!duration){
      Toast.warning("时长不能为空")
      return false
    }else if(receivingAddress.length == 0 || receivingAddress.filter(item => TronWeb.isAddress(item)).length == 0){
      Toast.warning("地址不能为空")
      return false
    }else{
      return true
    }
  }
  async function submitOrder() {
    setLoading(true)
    
    if (paymentVerification() && amount && duration){
      const orders: TronResourceRentalRequest[] = receivingAddress.map(item => ({
        deviceId: deviceId,
        resourceCode: resourceType,
        amount: amount,
        lockup: false,
        duration: duration,
        receivingAddress: item
      }));
     const result = await api.post<Tuple2<DepositOrder, TronAccount>>("/g/v1/tron/resource/rental",undefined ,orders)
     if (result.code == 0){
        setPayOrder(result.data)
     }
    }
    setLoading(false)
    
  }
  useEffect(()=>{
    const interval = setInterval(() => {
      refreshPaymentOrder()
      }, 3000); 
  
  
      return () => clearInterval(interval);

  },[payOrder])
  const contextValue: B2cViewModel = {
    resourceType,
    receivingAddress,
    amount,
    duration,
    setResourceType,
    setReceivingAddress,
    setAmount,
    setDuration,
    timeUnit,
    setTimeUnit,
    getTotalEnergy,
    loading,
    payOrder,
    submitOrder,setPayOrder
  };


  return (
    <B2cContext.Provider value={contextValue}>{children}</B2cContext.Provider>
  );
}

export default B2cProvider;
