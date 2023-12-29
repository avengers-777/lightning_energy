import { IconBolt } from "@douyinfe/semi-icons";
export function Copyright(){
    return (
        <div className="flex flex-row justify-center items-center lg:py-4 py-2">
          <IconBolt size="large" style={{ marginRight: "8px" }} />
          <span className="text-sm lg:text-base">Copyright © 2019 LightningEnergy. All Rights Reserved. </span>
        </div>
    )
}