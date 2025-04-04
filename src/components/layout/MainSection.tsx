import { DatePickerWithRange } from "../custom/DatePicker";
import CustomLineChart from "../custom/LineChart";
import CityStats from "../custom/PieChart";
import SkuTable from "../custom/SKUDataTable";
import TabSelect from "../custom/TabSelect";
import { ChartLine } from "lucide-react";
import { Switch } from "../ui/switch";
import blinkit_icon from "@/assets/blinkit_icon.png";
import zepto_icon from "@/assets/zepto_icon.png";
import swiggy_icon from "@/assets/swiggy_icon.png";
import { useState } from "react";
import CityTable from "../custom/CityDataTable";

interface SelectionSectionProps {
  setShowGraph: (value: boolean) => void;
  showGraph: boolean;
}

const SelectionSection: React.FC<SelectionSectionProps> = ({
  setShowGraph,
  showGraph,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-[100%] justify-between items-center px-6 py-3 border-b-1 border-[#EBEBEB]">
        <p className="text-sm">Quick Commerce</p>

        <div className="flex gap-2 items-center w-[358px]">
          <div className="flex justify-center items-center gap-2 border-1 border-[#D9D9D9] rounded-[10px]  w-[80px] h-[40px] ">
            <ChartLine className="w-5 h-5 text-[#031B15]" />
            <Switch
              className="data-[state=checked]:bg-[#02694B] w-5 h-[12.5px] default:checked"
              checked={showGraph}
              onCheckedChange={setShowGraph}
            />
          </div>
          <div className="w-[270px] h-[40px]">
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center h-[64px] px-4 py-3 border-b-1 border-[#EBEBEB]">
        <TabSelect
          tabs={[
            {
              label: "Blinkit",
              icon: blinkit_icon,
              value: "blinkit",
              bgColor: "#DFEAE8",
              textColor: "#027056",
            },
            {
              label: "Zepto",
              icon: zepto_icon,
              value: "zepto",
              bgColor: "#E5DFF7",
              textColor: "#5D3FD3",
            },
            {
              label: "Instamart",
              icon: swiggy_icon,
              value: "instamart",
              bgColor: "#FFE5D1",
              textColor: "#FF7F3F",
            },
          ]}
          onChange={(value) => console.log("Selected Tab:", value)}
        />
      </div>
    </div>
  );
};

const AnalyticsSection = () => {
  return (
    <div className="flex w-full gap-2 mb-8">
      <CustomLineChart title={"Sales (MRP)"} />
      <CustomLineChart title={"Total Quantity Sold"} />
      <CityStats />
    </div>
  );
};

export default function MainSection() {
  const [showGraph, setShowGraph] = useState<boolean>(true);
  return (
    <div className="m-5 border-1 border-[#EBEBEB] rounded-[10px] w-full">
      <SelectionSection setShowGraph={setShowGraph} showGraph={showGraph} />
      <div className="w-full bg-[#FAFAFA] p-5">
        {showGraph && <AnalyticsSection />}
        <SkuTable />
        <CityTable />
      </div>
    </div>
  );
}
