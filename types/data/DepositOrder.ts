import { BlockchainPlatform } from "../enums/BlockchainPlatform";
import { Currency } from "../enums/Currency";

export interface DepositOrder {
    id: string;
    deviceId: string;
    platform: BlockchainPlatform; // 假设 BlockchainPlatform 已定义
    receivingAccountId: string;
    fromAddress: string;
    currency: Currency; // 假设 Currency 已定义
    amount: number;
    txid: number;
    blockHeight: number;
    createDate: number;
    receivingDate: number;
    expirationDate: number;
    actions: string[];
    status: DepositStatus; // 假设 DepositStatus 已定义
  }
  export enum DepositStatus {
    PENDING = "PENDING",
    RECEIVED = "RECEIVED"
}

export function getDepositStatusDescription(status: DepositStatus): string {
  const statusChineseMap: { [key in DepositStatus]: string } = {
    [DepositStatus.PENDING]: '未支付',
    [DepositStatus.RECEIVED]: '支付成功'
  };

  return statusChineseMap[status] || '未知状态';
}