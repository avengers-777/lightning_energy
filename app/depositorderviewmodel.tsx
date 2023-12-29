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
import { ResourceCode, TronResourceRentalOrder } from "@/types/data/TronResourceRentalOrder";
import { v4 as uuidv4 } from 'uuid';
import { TronAccount } from "@/types/data/TronAccount";
import { DepositOrder, DepositStatus } from "@/types/data/DepositOrder";
import { TronResourceRentalRequest } from "@/types/dto/TronResourceRentalRequest";
import { AppContext } from "./store";
import TronWeb from 'tronweb';
import { QueryTool } from "@/types/data/QueryTool";
import { Tools } from "@/utils/Tools";

// 定义 AppContext 的类型
export interface DepositOrderViewModel {
  orders: DepositOrder[];
  loading: boolean;
  search:()=> Promise<void>;
  findRentalOrder:(id: string)=> Promise<ResModel<TronResourceRentalOrder[]>>
}

export const DepositOrderContext = createContext<DepositOrderViewModel>({
  orders: [],
  loading: false,
  search: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  findRentalOrder: function (id: string): Promise<ResModel<TronResourceRentalOrder[]>> {
    throw new Error("Function not implemented.");
  }
});


function DepositOrderViewModelProvider({ children }: {
  children: ReactNode;
}) {
  const router = useRouter();
  const api = new Api(router);
  const {deviceId} = useContext(AppContext)
  const [orders,setOrders] = useState<DepositOrder[]>([])
  const [page,setPage] = useState(0)
  const [size,setSize] = useState(10)
  const [count,setCount] = useState(0)
  const [loading,setLoading] = useState(false)
  
  async function  search() {
    const deviceId = localStorage.getItem("deviceId")
    setLoading(true)
    const queryTool:QueryTool = new QueryTool()
    const param :Params = {
      size:size,
      page:page,
      direction:"DESC",
      properties:"id"
    }
    const result = await api.post<DepositOrder[]>(`/g/v1/tron/deposit/order/search/${deviceId}`,param,queryTool)
    if (result.code  == 0 && result.data && result.count != undefined){
      setOrders(result.data)
      setCount(result.count)
    }
    setLoading(false)
  }
  async function  findRentalOrder(id:string) {
    return  await api.get<TronResourceRentalOrder[]>(`/g/v1/tron/deposit/order/${id}/rental-order`,{deviceId:deviceId})
    
  }
  const contextValue: DepositOrderViewModel = {
    orders,
    loading,
    search,
    findRentalOrder
  };

  useEffect(()=>{
    search()
  },[])
  return (
    <DepositOrderContext.Provider value={contextValue}>{children}</DepositOrderContext.Provider>
  );
}

export default DepositOrderViewModelProvider;
