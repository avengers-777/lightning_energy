"use client";
import { Modal, TextArea } from "@douyinfe/semi-ui";
import { BorderButton } from "./BorderButton";
import { useContext, useState } from "react";
import TronWeb from 'tronweb';
import { B2cContext } from "@/app/b2cviewmodel";

export function MultipleAddressInput() {
    const {
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
    
    } = useContext(B2cContext)
  const [visible, setVisible] = useState(false);
  const [addressArray,setAddressArray] = useState<string []>([])
  const [value,setValue] = useState<string>()
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setReceivingAddress(p => {
      const newAddresses = Array.from(new Set(p.concat(addressArray)));
      return newAddresses
    })
    setVisible(false);
    setValue(undefined)
    setAddressArray([])
  };
  const handleCancel = () => {
    setVisible(false);
    setValue(undefined)
    setAddressArray([])
  };
  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };
  function onChangeTextArea(value: string, e: any) {
    setAddressArray(p => {
      const newAddresses = value.split(/[,， \r\n]+/).map(addr => addr.trim()).filter(item => TronWeb.isAddress(item))
      const allAddresses = Array.from(new Set(p.concat(newAddresses)));
      return allAddresses;
    });
    setValue(value);
  }
  return (
    <>
      <BorderButton
        title={"批量导入地址"}
        onClick={showDialog}
      />
      <Modal
        title="批量导入地址"
        visible={visible}
        onOk={handleOk}
        afterClose={handleAfterClose} //>=1.16.0
        onCancel={handleCancel}
        
        closeOnEsc={true}
        okText={`添加${addressArray.length}个地址`}
      >
        <TextArea autosize value={value} onChange={onChangeTextArea}/>
        <br />
        可使用 英文逗号 中文逗号 空格 回车 分隔地址。
      </Modal>
    </>
  );
}
