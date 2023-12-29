import { ResourceConverter } from "@/types/app/ResourceConverter";
import { TronAccount } from "@/types/data/TronAccount";
import { Currency, formatAmountAsFloat } from "@/types/enums/Currency";
import { Tools } from "@/utils/Tools";
import {
  Button,
  Dropdown,
  Modal,
  Progress,
  Row,
  Typography,
} from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { useState } from "react";
import { ProgressStatus } from "./ProgressStatus";
import {
  Status,
  TronResourceRentalOrder,
  getRentalOrderStatusDescription,
} from "@/types/data/TronResourceRentalOrder";

export function createRentalOrderColumns(): ColumnProps<TronResourceRentalOrder>[] {
  return [
    {
      title: "ID",
      dataIndex: "id",
      width: 250,
      ellipsis: true,
    },
    {
      title: "支付ID",
      dataIndex: "depositOrderId",
    },
    {
      title: "接收账号",
      dataIndex: "receivingAccountId",
    },
    {
      title: "资源类型",
      dataIndex: "resourceCode",
    },
    {
      title: "委托TRX",
      dataIndex: "valueInTrx",
      render: (text, record, index) => {
        return formatAmountAsFloat(
          record.valueInTrx,
          Currency.TRX
        ).toLocaleString();
      },
    },
    {
      title: "资源数量",
      dataIndex: "amount",
      render: (text, record, index) => {
        return record.amount.toLocaleString();
      },
    },
    {
      title: "租用时长",
      dataIndex: "duration",
      render: (text, record, index) => {
        return Tools.formatDuration(record.duration);
      },
    },
    {
      title: "交易日期",
      dataIndex: "transactionTime",
      render: (text, record, index) => {
        if (record.status != Status.PROGRESS && record.status != Status.ERROR) {
          return Tools.formatTimestampToLocalTime(record.transactionTime);
        }
      },
    },
    {
      title: "预计回收时间",
      dataIndex: "expectedReclaimTime",
      render: (text, record, index) => {
        if (record.status != Status.PROGRESS && record.status != Status.ERROR) {
          return Tools.formatTimestampToLocalTime(record.expectedReclaimTime);
        }
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text, record, index) => {
        const timeLeft = record.expectedReclaimTime - new Date().getTime();
        if (record.status == Status.PENDING_RECLAIM && timeLeft > 0) {
          return (
            <ProgressStatus
              expiration={record.expectedReclaimTime}
              duration={record.duration}
            />
          );
        } else {
          return getRentalOrderStatusDescription(record.status);
        }
      },
    },
    {
      title: "",
      dataIndex: "operate",
      render: (text, record, index) => (
        <div className="space-x-2">
          {record.txid && (
            <a
              href={`${process.env.NEXT_PUBLIC_TRONSCAN_HOST}/#/transaction/${record.txid}`}
              className="text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              代理详情
            </a>
          )}
          {record.reclaimTxid && (
            <a
              href={`${process.env.NEXT_PUBLIC_TRONSCAN_HOST}/#/transaction/${record.reclaimTxid}`}
              className="text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              回收详情
            </a>
          )}
        </div>
      ),
    },
  ];
}
