export interface TronResourceRentalOrder {
    id: string;
    depositOrderId:string;
    receivingAccountId: string;
    lessorId: string;
    deviceId: string;
    ip: string;
    resourceCode: ResourceCode; // 假设 ResourceCode 已定义
    valueInTrx: number;
    amount: number;
    lockup: boolean;
    duration: number;
    expectedReclaimTime: number;
    expectedReclaimBlockHeight: number;
    error?: string;
    txid: string;
    reclaimTxid: string;
    createDate: number;
    transactionTime: number;
    completeTime: number;
    status: Status;
  }
  export enum Status {
    PROGRESS = 'PROGRESS',
    PENDING_RECLAIM = 'PENDING_RECLAIM',
    COMPLETED = 'COMPLETED',
    ERROR = 'ERROR',
    RECLAIM_FAILED = 'RECLAIM_FAILED',
  }
  export function getRentalOrderStatusDescription(status: Status): string {
    const statusDescriptionMap: { [key in Status]: string } = {
      [Status.PROGRESS]: '进行中',
      [Status.PENDING_RECLAIM]: '待回收',
      [Status.COMPLETED]: '已完成',
      [Status.ERROR]: '错误',
      [Status.RECLAIM_FAILED]: '回收失败',
    };
  
    return statusDescriptionMap[status] || '未知状态';
  }
  
  // 假设 Common.ResourceCode 已定义，例如：
  export  enum ResourceCode {
    BANDWIDTH = 'BANDWIDTH',
    ENERGY = 'ENERGY',
    TRON_POWER = 'TRON_POWER',
    UNRECOGNIZED = 'UNRECOGNIZED',
  }
  
  export const ResourceCodeValue: { [key in ResourceCode]: number } = {
    [ResourceCode.BANDWIDTH]: 0,
    [ResourceCode.ENERGY]: 1,
    [ResourceCode.TRON_POWER]: 2,
    [ResourceCode.UNRECOGNIZED]: -1,
  };
  
  // 获取枚举的数值
  export  function getResourceCodeValue(code: ResourceCode): number {
    return ResourceCodeValue[code];
  }

  export const getResourceText: { [key in ResourceCode]: string } = {
    [ResourceCode.BANDWIDTH]: "带宽",
    [ResourceCode.ENERGY]: "能量",
    [ResourceCode.TRON_POWER]: "电量",
    [ResourceCode.UNRECOGNIZED]: "未知",
  };
  