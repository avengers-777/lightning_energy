import { B2cContext } from "@/app/b2cviewmodel";
import { TimeUnit, getTimeUnitChinese } from "@/types/common/Constants";
import { getResourceText } from "@/types/data/TronResourceRentalOrder";
import { Currency, formatAmountAsFloat } from "@/types/enums/Currency";
import ResourcePriceCalculator from "@/utils/ResourcePriceCalculator";
import { useContext } from "react";

export function PaymentDetailsPreview() {
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
    getTotalEnergy,
  } = useContext(B2cContext);
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
  function timeRender() {
    return ` ${durationRender()} ${getTimeUnitChinese(timeUnit)}`;
  }
  const originalPriceSun = ResourcePriceCalculator.calculateTotalOriginalPrice(
    getTotalEnergy(),
    duration ?? 0,
    resourceType
  );
  const totalPriceSun = ResourcePriceCalculator.calculateTotalPrice(
    getTotalEnergy(),
    duration ?? 0,
    resourceType
  );

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-1">
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-gray-500  text-base">订单信息</span>
        <div className="flex flex-row items-center justify-end space-x-2 ">
          {receivingAddress.length > 1 && (
            <span className="text-gray-500 text-base">{`${receivingAddress.length} 个地址,`}</span>
          )}

          <span className="text-gray-500 text-base">{`总计 ${getTotalEnergy().toLocaleString()} ${
            getResourceText[resourceType]
          },${timeRender()}`}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-gray-500  text-base">支付</span>
        <div className="flex flex-row items-center justify-end space-x-2 ">
          <span className="text-gray-500 line-through text-base">
            {`${formatAmountAsFloat(
              originalPriceSun,
              Currency.TRX
            ).toLocaleString()} TRX`}
          </span>
          <span className="text-blue-400 font-bold text-2xl ">{`${formatAmountAsFloat(
            totalPriceSun,
            Currency.TRX
          ).toLocaleString()} TRX`}</span>
        </div>
      </div>
      <span className="text-blue-400  text-sm ">
        {`单价 ${ResourcePriceCalculator.calculateResourcePricePerUnit(
          resourceType,
          duration ?? 0
        )} SUM，较${timeRender()}烧毁省${(
          ((originalPriceSun - totalPriceSun) / originalPriceSun) *
          100
        ).toFixed(2)}% ≈ ${formatAmountAsFloat(
          originalPriceSun - totalPriceSun,
          Currency.TRX
        ).toLocaleString()}TRX`}
      </span>
    </div>
  );
}
