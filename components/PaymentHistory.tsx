import { DepositOrderContext } from "@/app/depositorderviewmodel";
import { DepositOrder, DepositStatus, getDepositStatusDescription } from "@/types/data/DepositOrder";
import { formatAmountAsFloat } from "@/types/enums/Currency";
import { Tools } from "@/utils/Tools";
import { Divider, Empty } from "@douyinfe/semi-ui";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import { useContext } from "react";
import { or } from "three/examples/jsm/nodes/Nodes.js";
import { ProgressStatus } from "./ProgressStatus";
import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';
import { PaymentHistoryModal } from "./PaymentHistoryModal";
export function PaymentHistory() {
  const { search, orders } = useContext(DepositOrderContext);
  function renderPaymentStatus(order:DepositOrder){
    const duration = order.expirationDate - order.createDate
    if (order.expirationDate > new Date().getTime() && order.status == DepositStatus.PENDING){
        return <ProgressStatus expiration={order.expirationDate} duration={duration}/>
    }else{
        return <span style={{width:100}}>{getDepositStatusDescription(order.status)}</span>
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full  border border-blue-400 rounded-2xl ">
      <div className="flex flex-row items-center justify-between w-full p-4 border-b border-blue-400 text-lg text-gray-400 font-bold">
        <span style={{width:100}}>数量/货币</span>
        <span style={{width:280}}>创建时间</span>
        <span style={{width:100}}>状态</span>
        <span>操作</span>
      </div>

      {orders.length > 0 ? orders.map((item,index) => (
        <div
          key={item.id}
          className={`flex flex-row items-center justify-between w-full  p-4 ${orders.length -1 == index ? "" : "border-b"} border-blue-400`}
        >
          <span style={{width:100}}>{`${formatAmountAsFloat(item.amount, item.currency)} ${
            item.currency
          }`}</span>
          <span style={{width:280}} >{Tools.formatTimestampToLocalTime(item.createDate)}</span>
          {renderPaymentStatus(item)}
          <PaymentHistoryModal order={item}/>
        </div>
      )) :  (

        <Empty
        style={{margin:32}}
        image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
        darkModeImage={<IllustrationConstructionDark style={{ width: 150, height: 150 }} />}
        title={'数据为空'}
        description="暂无数据请稍后再试！"
    />
      )}
    </div>
  );
}
