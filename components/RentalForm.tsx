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
import { useContext, useState } from "react";
import { ResourceCode } from "@/types/data/TronResourceRentalOrder";
import { MultipleAddressInput } from "./MultipleAddressInput";
import { IconHome, IconHelpCircle } from "@douyinfe/semi-icons";
import { TimeUnit, getTimeUnitChinese } from "@/types/common/Constants";
import { NumberButton } from "./NumberButton";
import { PaymentDetailsPreview } from "./PaymentDetailsPreview";
import ResourcePriceCalculator from "@/utils/ResourcePriceCalculator";

const amounts = [33000, 100000, 1000000, 10000000];
const durations = [
  { title: "1小时", duration: 3600000 },
  { title: "3小时", duration: 10800000 },
  { title: "1天", duration: 86400000 },
  { title: "3天", duration: 259200000 },
];
const days = Array.from({ length: 30 }, (_, i) => i + 1);
export function RentalForm() {
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
    loading,
    submitOrder
  } = useContext(B2cContext);
  function deleteAddress(index: number) {
    setReceivingAddress(receivingAddress.filter((item, i) => index != i));
  }
  function getAddressInput() {
    if (receivingAddress.length == 0) {
      return (
        <Input
          placeholder="地址"
          size="large"
          showClear
          onChange={(value) => setReceivingAddress([value])}
        ></Input>
      );
    } else if (receivingAddress.length == 1) {
      return (
        <Input
          placeholder="地址"
          size="large"
          showClear
          value={receivingAddress[0]}
          onChange={(value) => setReceivingAddress([value])}
        ></Input>
      );
    } else {
      return (
        <Space vertical align="start" style={{ width: "100%" }}>
          {receivingAddress.map((item, index) => (
            <Tag
              style={{ width: "100%", padding: 24 }}
              key={index}
              size="large"
              closable
              onClose={(value, e) => deleteAddress(index)}
            >
              {item}
            </Tag>
          ))}
        </Space>
      );
    }
  }
  function onChangeAmount(value: string | number) {
    if (typeof value === "number") {
      setAmount(value);
    } else {
      setAmount(undefined);
    }
  }
  function onChangeDuration(value: string | number) {
    if (typeof value === "number") {
      if (timeUnit === TimeUnit.DAY) {
        setDuration(value * 24 * 60 * 60 * 1000);
      } else if (timeUnit === TimeUnit.HOUR) {
        setDuration(value * 60 * 60 * 1000);
      }
    } else {
      setDuration(undefined);
    }
  }
  function durationRender() {
    if (typeof duration == "number") {
      if (timeUnit === TimeUnit.DAY) {
        const days = duration / (24 * 60 * 60 * 1000);
        if (days < 1) {
          setTimeUnit(TimeUnit.HOUR);
        }
        return days;
      } else if (timeUnit === TimeUnit.HOUR) {
        const hours = duration / (60 * 60 * 1000);
        if (hours >= 24) {
          setTimeUnit(TimeUnit.DAY);
        }
        return hours;
      }
    }
  }
  function renderEveryDay() {
    return (duration ?? 0) > ResourcePriceCalculator.ONE_DAY_IN_MILLIS
      ? "每天"
      : "";
  }

  return (
    <div className="flex flex-col items-start justify-center space-y-4 w-full ">
      <div className="flex flex-col items-center justify-center w-full ">
        <Title
          className="p-2 border-b border-blue-400 w-full text-center"
          heading={4}
        >
          资源租赁
        </Title>
      </div>
      <div className="px-4">
        <RadioGroup
          type="button"
          buttonSize="large"
          aria-label="资源类型"
          name="resource type"
          value={resourceType}
          onChange={(event) => setResourceType(event.target.value)}
        >
          <Radio value={ResourceCode.ENERGY}>能量</Radio>
          <Radio value={ResourceCode.BANDWIDTH}>带宽</Radio>
        </RadioGroup>
      </div>

      <div className="flex flex-col items-start justify-center space-y-2 w-full px-4">
        <div className="flex flex-row items-center justify-between w-full">
          <Title heading={6}>接收方</Title>
          {receivingAddress.length > 1 && (
            <Title heading={6}>{`${receivingAddress.length}个地址`}</Title>
          )}
        </div>

        {getAddressInput()}
        <MultipleAddressInput />
      </div>
      <div className="flex flex-col items-start justify-center space-y-2 w-full px-4">
        <div className="flex flex-row items-center justify-between w-full">
          <Title heading={6}>租用量</Title>

          {amount != undefined && ResourceCode.ENERGY == resourceType && (
            <div className="flex flex-row items-center justify-center">
              <Tooltip
                style={{
                  maxWidth: 320,
                }}
                className="another-classname"
                content={
                  <>
                    <div>{`转账对方有USDT，预估${renderEveryDay()}可转${(
                      amount / 32000
                    ).toFixed(0)}次`}</div>
                    <div>{`转账对方无USDT，预估${renderEveryDay()}可转${(
                      (amount - 32000) /
                      32000
                    ).toFixed(0)}次`}</div>
                  </>
                }
              >
                <IconHelpCircle className="mr-1" />
              </Tooltip>
              <Title heading={6}>{`预计${renderEveryDay()}可转账${(
                amount / 32000
              ).toFixed(0)}次`}</Title>
            </div>
          )}
        </div>

        <InputNumber
          size="large"
          suffix={"数量"}
          style={{ width: "100%" }}
          value={amount}
          hideButtons
          showClear
          onChange={onChangeAmount}
          placeholder="请输入数量"
        />
        <div className="flex flex-row items-center justify-between w-full space-x-2 ">
          {amounts.map((amount) => (
            <BorderButton
              key={amount}
              title={`+${amount.toLocaleString()}`}
              onClick={() => setAmount((p) => (p ?? 0) + amount)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start justify-center space-y-2 w-full px-4">
        <Title heading={6}>租用时长</Title>
        <InputNumber
          size="large"
          innerButtons={true}
          suffix={getTimeUnitChinese(timeUnit)}
          value={durationRender()?.toFixed(2)}
          showClear
          onChange={onChangeDuration}
          style={{ width: "100%" }}
          placeholder="请输入租用时长"
        />
        <div className="flex flex-row items-center justify-between w-full space-x-2">
          {durations.map(({ title, duration }) => (
            <BorderButton
              key={title}
              title={title}
              onClick={() => setDuration(duration)}
            />
          ))}
          <Popover
            position="top"
            content={
              <div className="flex flex-col items-start justify-center w-80  overflow-auto p-4 space-y-4">
                <Title heading={6}>时间单位天</Title>
                <div className="flex flex-row items-center justify-start w-full  flex-wrap">
                  {days.map((item) => (
                    <NumberButton
                      key={item}
                      onPress={() => setDuration(item * 1000 * 60 * 60 * 24)}
                    >
                      {item}
                    </NumberButton>
                  ))}
                </div>
              </div>
            }
          >
            <div className="border flex flex-col items-center justify-center overflow-ellipsis border-gray-400 rounded-xl  px-4 py-1 cursor-pointer text-sm hover:border-blue-300  transition-transform hover:text-blue-300 w-full">
              更多
            </div>
          </Popover>
        </div>
      </div>
      {amount != undefined && duration != undefined && (
        <div className="flex flex-col items-start justify-center w-full px-4 space-y-1">
          <Title heading={6}>支付详情</Title>
          <PaymentDetailsPreview></PaymentDetailsPreview>
        </div>
      )}

      <div className="flex flex-col items-start justify-center space-y-2 w-full  ">
        <button onClick={submitOrder} className="border-t border-blue-400   py-2 cursor-pointer text-xl   transition-transform hover:text-blue-300 w-full">
          {loading ? <Spin /> : "支付"}
        </button>
      </div>
    </div>
  );
}
