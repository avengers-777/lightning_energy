import { Toast } from "@douyinfe/semi-ui";

export const MIN_BANDWIDTH_USAGE = 3000;
export const MIN_ENERGY_USAGE = 32000;
const currentDate = new Date();
export const startOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );

export  const endOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59
  );
  
  export interface Tuple2<T1, T2> {
    t1: T1;
    t2: T2;
  }

  export enum TimeUnit{
    DAY = "DAY",
    HOUR = "HOUR"
  }
  
  export function getTimeUnitChinese(timeUnit: TimeUnit): string {
    const timeUnitChineseMap: { [key in TimeUnit]: string } = {
      [TimeUnit.DAY]: '天',
      [TimeUnit.HOUR]: '小时'
    };
  
    return timeUnitChineseMap[timeUnit] || '未知单位';
  }
  export enum ResourceUnit{
    AMOUNT = "AMOUNT",
    USAGE = "USAGE"
  }
  export const handleCopy = async (textToCopy:string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      Toast.info("复制成功")
    } catch (err) {
      Toast.error(`支付失败 ${err}`)
    }
  };
  