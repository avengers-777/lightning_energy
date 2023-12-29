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
  Tooltip,
} from "@douyinfe/semi-ui";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import { BorderButton } from "./BorderButton";
import { B2cContext } from "@/app/b2cviewmodel";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ResourceCode } from "@/types/data/TronResourceRentalOrder";
import { MultipleAddressInput } from "./MultipleAddressInput";
import { IconHome, IconHelpCircle } from "@douyinfe/semi-icons";
import {
  TimeUnit,
  getTimeUnitChinese,
  handleCopy,
} from "@/types/common/Constants";
import { NumberButton } from "./NumberButton";
import { PaymentDetailsPreview } from "./PaymentDetailsPreview";
import ResourcePriceCalculator from "@/utils/ResourcePriceCalculator";
import QRCodeComponent from "./QRCodeComponent";
import { formatAmountAsFloat } from "@/types/enums/Currency";
import { Status } from "@/types/data/TronAccount";
import { Tools } from "@/utils/Tools";

export function PaymentSuccess() {
  const { payOrder, setPayOrder } = useContext(B2cContext);
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
      <div className="flex flex-col items-center justify-center w-full py-32 ">
        <span className="text-blue-400 font-bold text-4xl ">支付成功</span>
        <span className="text-gray-500  text-base">{}</span>
        {payOrder && (
          <span className="text-gray-500  text-base">{`${formatAmountAsFloat(
            payOrder.t1.amount,
            payOrder.t1.currency
          )} ${payOrder.t1.currency}`}</span>
        )}
      </div>

      <div className="flex flex-col items-start justify-center space-y-2 w-full  ">
        <button
          onClick={() => setPayOrder(undefined)}
          className="border-t border-blue-400   py-2 cursor-pointer text-xl   transition-transform hover:text-blue-300 w-full"
        >
          返回
        </button>
      </div>
    </div>
  );
}
