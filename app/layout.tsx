import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./store";
import B2cProvider from "./b2cviewmodel";
import DepositOrderViewModelProvider from "./depositorderviewmodel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "闪电能量 | TRON 能量交易平台",
  description:
    "闪电能量是波场生态中的能源交易平台，我们的宗旨是降低波场交易者的能源消耗成本，提供更优惠、更安全、更高效的能源B2C和C2C交易服务。",
  keywords: [
    "闪电能量",
    "快速租赁",
    "能量秒到账",
    "多币种支付",
    "DAPP浏览器",
    "tron",
    "energy",
    "trongas",
    "波场能量",
    "币币交易",
    "币币兑换",
    "闪兑",
    "USDT换TRX",
    "TRX换USDT",
    "能量自助租赁",
    "tron能量租赁",
    "tron能量出租",
    "tron能量购买",
    "tron手续费",
    "tron燃料费",
    "波场能量租赁",
    "波场能量出租",
    "波场能量购买",
    "波场手续费",
    "波场燃料费",
    "节省手续费",
    "TRON energy exchange",
    "tron energy market",
    "Fast Leasing",
    "energy second payment",
    "multi-currency payment",
    "DAPP browser",
    "tron gas fee",
    "tron coin",
    "tron crypto",
    "Coin exchange",
    "swap",
    "tron wallet",
    "tron for free",
    "free trx legit",
    "tron",
    "energy",
    "tron news",
    "tron trx",
    "tron network",
    "trx tron explorer",
    "tron explorer",
    "trx to usdt",
    "Freesteam",
    "tron earn cf",
    "free trx legit",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className} theme-mode="dark">
        <StoreProvider>
          <B2cProvider>
            <DepositOrderViewModelProvider>
            {children}
            </DepositOrderViewModelProvider>
            
            </B2cProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
