import { DepositOrder } from "@/types/data/DepositOrder";
import { Avatar, Modal, Skeleton, Table } from "@douyinfe/semi-ui";
import { useContext, useEffect, useState } from "react";
import { createRentalOrderColumns } from "./RentalOrderColumns";
import { TronResourceRentalOrder } from "@/types/data/TronResourceRentalOrder";
import { DepositOrderContext } from "@/app/depositorderviewmodel";
import { or } from "three/examples/jsm/nodes/Nodes.js";

export function PaymentHistoryModal({ order }: { order: DepositOrder }) {
  const {findRentalOrder} = useContext(DepositOrderContext)
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resourceRentalOrder, setResourceRentalOrder] = useState<
    TronResourceRentalOrder[]
  >([]);
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleAfterClose = () => {
  };
  async function fetchData(){
    setLoading(true)
    const result = await  findRentalOrder(order.id)
    if (result.code == 0 && result.data ){
      setResourceRentalOrder(result.data)
    }
    setLoading(false)
  }
  useEffect(()=>{
    if (visible){
      fetchData()
    }

  },[visible])
 
  
  return (
    <>
      <button className="hover:text-blue-400" onClick={showDialog}>
        查看
      </button>
      <Modal
        size="full-width"
        title="订单详情"
        visible={visible}
        onOk={handleOk}
        afterClose={handleAfterClose} //>=1.16.0
        onCancel={handleCancel}
        closeOnEsc={true}
      >
       <Table
       loading={loading}
            columns={createRentalOrderColumns()}
            dataSource={resourceRentalOrder}
            pagination={false}
          />
      </Modal>
    </>
  );
}
