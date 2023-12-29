import { ResourceCode } from "@/types/data/TronResourceRentalOrder";
import { Toast } from "@douyinfe/semi-ui";

export default class ResourcePriceCalculator {
    public static readonly ONE_DAY_IN_MILLIS: number = 24 * 60 * 60 * 1000;
    public static readonly FIFTEEN_DAYS_IN_MILLIS: number = 15 * 24 * 60 * 60 * 1000;
    public static readonly THIRTY_DAYS_IN_MILLIS: number = 30 * 24 * 60 * 60 * 1000;
    public static readonly BURN_FOR_ENERGY_PRICE:number = 420;
    public static readonly BURN_FOR_BANDWIDTH_PRICE:number = 1000;

    public static calculateEnergyPricePerUnit(durationInMillis: number): number {
        if (durationInMillis < this.ONE_DAY_IN_MILLIS) {
            return 60; // 价格单位为“小时”
        } else if (durationInMillis < this.FIFTEEN_DAYS_IN_MILLIS) {
            return 55; // 价格单位为“15天”
        } else if (durationInMillis <= this.THIRTY_DAYS_IN_MILLIS) {
            return 48; // 价格单位为“30天”
        } else {
            Toast.warning("Duration exceeds the maximum limit of 30 days")
            return 48; 
        }
    }

    public static calculateBandwidthPricePerUnit(durationInMillis: number): number {
        if (durationInMillis < this.FIFTEEN_DAYS_IN_MILLIS) {
            return 700;
        } else if (durationInMillis <= this.THIRTY_DAYS_IN_MILLIS) {
            return 650;
        } else {
            Toast.warning("Duration exceeds the maximum limit of 30 days")
            return 650;
        }
    }

    public static calculateResourcePricePerUnit(resourceCode: ResourceCode, durationInMillis: number): number {
        if (resourceCode === ResourceCode.ENERGY) {
            return this.calculateEnergyPricePerUnit(durationInMillis);
        } else {
            return this.calculateBandwidthPricePerUnit(durationInMillis);
        }
    }
    public static calculateResourceOriginalPricePerUnit(resourceCode: ResourceCode): number {
        if (resourceCode === ResourceCode.ENERGY) {
            return ResourcePriceCalculator.BURN_FOR_ENERGY_PRICE;
        } else {
            return ResourcePriceCalculator.BURN_FOR_BANDWIDTH_PRICE;
        }
    }

    public static calculateTotalResources(initialAmount: number, durationInMillis: number): number {
        const days: number = durationInMillis / this.ONE_DAY_IN_MILLIS;
        return Math.round(initialAmount + (days * initialAmount));
    }
    public static calculateTotalPrice(initialAmount: number, durationInMillis: number,resourceCode: ResourceCode){
        const pricePerUnit = ResourcePriceCalculator.calculateResourcePricePerUnit(resourceCode,durationInMillis)
        const totalResource = ResourcePriceCalculator.calculateTotalResources(initialAmount,durationInMillis)
        return pricePerUnit * totalResource;
    }
    public static calculateTotalOriginalPrice(initialAmount: number, durationInMillis: number,resourceCode: ResourceCode){
        const pricePerUnit = ResourcePriceCalculator.calculateResourceOriginalPricePerUnit(resourceCode)
        const totalResource = ResourcePriceCalculator.calculateTotalResources(initialAmount,durationInMillis)
        return pricePerUnit * totalResource;
    }

    public static toNearestBase(number: number, zeros: number): number {
        const base: number = Math.pow(10, zeros);
        if (number % base === 0) {
            return number;
        }
        return (number / base) * base;
    }
}

