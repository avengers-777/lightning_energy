"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from "react";
import { Api, Params } from "@/networking/Api";
import { useRouter } from "next/navigation";
import { Notification, Button, ButtonGroup } from "@douyinfe/semi-ui";
import { NoticeReactProps } from "@douyinfe/semi-ui/lib/es/notification";
import { ResModel } from "@/types/common/ResModel";
import { Signature, SignatureType, SignatureTypeMessages } from "@/types/dto/Signature";
import { TokenInfo } from "@/types/dto/TokenInfo";
import { Admin } from "@/types/data/Admin";
import { NavItemProps, SubNavProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { AccountResourceMessage, initAccountResourceMessage } from "@/types/app/ResourceConverter";
import { Tuple2 } from "@/types/common/Constants";
import { ResourceCode } from "@/types/data/TronResourceRentalOrder";
import { v4 as uuidv4 } from 'uuid';
// 定义 AppContext 的类型
export interface AppContextType {
  deviceId: string;
  accountResourceMessage: AccountResourceMessage
}

export const AppContext = createContext<AppContextType>({
  deviceId: "",
  accountResourceMessage: initAccountResourceMessage
});

export type StoreProviderProps = {
  children: ReactNode;
};

function StoreProvider({ children }: StoreProviderProps) {
  const router = useRouter();
  const api = new Api(router);
  const [deviceId,setDeviceId] = useState<string>("")
  const [accountResourceMessage,setAccountResourceMessage] = useState<AccountResourceMessage>(initAccountResourceMessage)
  async function getAccountResourceMessage() {
    const result = await api.get<AccountResourceMessage>("/g/v1/tron/resource/resource-message")
    if (result.code ==0 && result.data){
      setAccountResourceMessage(result.data)
    }
  }
  
  const contextValue: AppContextType = {
    deviceId,
    accountResourceMessage

  };
  useEffect(()=>{
   const deviceId = localStorage.getItem("deviceId")
   if (deviceId){
    setDeviceId(deviceId)
   }else{
    const newDeviceId = uuidv4()
    setDeviceId(newDeviceId)
    localStorage.setItem("deviceId",newDeviceId)
   }
  },[])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default StoreProvider;
