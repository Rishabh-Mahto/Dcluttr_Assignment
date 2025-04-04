import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { CircleHelp } from "lucide-react";
import { executeQuery } from "@/fetchUtil";
import reqConfig from "@/assets/req.json";

interface City {
  name: string;
  value: string;
  percentage: number;
  change: number;
  color: string;
}

interface ResponseData {
  "blinkit_insights_city.name": string;
  "blinkit_insights_city.sales_mrp_sum": string;
}

const Colors = ["#6C4FED", "#EA6153", "#F7C245", "#D9D9D9"];

const CitiesChart: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [total, setTotal] = useState<string>("");
  const [totalChange, setTotalChange] = useState<number>(0);

  const fetchData = async () => {
    try {
      const cardConfig = reqConfig.cards.find(
        (card: any) => card.id === "blinkit-insights-city-sales_mrp_sum"
      );

      if (!cardConfig || !cardConfig.query) {
        console.error("Card config or query not found");
        return;
      }

      const queryObject = JSON.parse(cardConfig.query);
      const response = await executeQuery(queryObject);

      const thisMonthData: ResponseData[] = response?.[0]?.data;
      const lastMonthData: ResponseData[] = response?.[1]?.data;

      const totalSales = thisMonthData.reduce(
        (sum: number, item: ResponseData) =>
          sum + Number(item["blinkit_insights_city.sales_mrp_sum"]),
        0
      );

      const lastMonthTotalSales = lastMonthData.reduce(
        (sum: number, item: ResponseData) =>
          sum + Number(item["blinkit_insights_city.sales_mrp_sum"]),
        0
      );

      const change =
        ((totalSales - lastMonthTotalSales) / lastMonthTotalSales) * 100;

      const formattedData: City[] = thisMonthData.map(
        (item: ResponseData, index: number) => {
          const sales = Number(item["blinkit_insights_city.sales_mrp_sum"]);
          const percentageValue = Number(
            ((sales / totalSales) * 100).toFixed(1)
          );
          const lastMonthItem = lastMonthData.find(
            (lastItem: ResponseData) =>
              lastItem["blinkit_insights_city.name"] ===
              item["blinkit_insights_city.name"]
          );
          const lastMonthSales = lastMonthItem
            ? Number(lastMonthItem["blinkit_insights_city.sales_mrp_sum"])
            : 0;
          const cityChange =
            lastMonthSales !== 0
              ? ((sales - lastMonthSales) / lastMonthSales) * 100
              : 0;
          return {
            name: item["blinkit_insights_city.name"],
            value: (sales / 100000).toFixed(1) + "L",
            percentage: percentageValue, // keep this as number
            change: parseFloat(cityChange.toFixed(1)),
            color: Colors[index % Colors.length],
          };
        }
      );

      setTotal((totalSales / 100000).toFixed(1) + "L");
      setTotalChange(parseFloat(change.toFixed(1)));
      setCities(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1 bg-white rounded-lg border border-[#F1F1F1] min-w-[350px] h-[292px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
      {/* Header */}
      <div className="flex p-3 border-b border-[#F1F1F1] items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Top Cities</h2>
        <CircleHelp size={16} className="text-gray-500" />
      </div>

      {/* Chart Section */}
      <div className="relative flex justify-center">
        <PieChart width={200} height={120}>
          <Pie
            data={cities}
            dataKey="percentage"
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            outerRadius={100}
            innerRadius={80}
          >
            {cities.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        {/* Centered Total Value */}
        <div className="absolute top-[40%] text-center">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-lg font-semibold">₹{total}</p>
          <p
            className={`text-sm font-medium ${
              totalChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalChange >= 0 ? "↑" : "↓"} {Math.abs(totalChange)}%
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-2 p-3">
        {cities.map((city, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <div className="flex items-center">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: city.color }}
              ></span>
              <span className="ml-1.5 text-[#7D7D7E] text-[13px] font-normal leading-4">
                {city.name}
              </span>
            </div>
            <div className="text-[13px] text-[#000000] font-bold leading-4">
              {city.value}
              <span className="ml-1.5 bg-[#F7F7F7] text-[13px] text-[#7D7D7E] font-normal leading-4">
                {city.percentage}%
              </span>
              <span
                className={`ml-1.5 ${
                  city.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {city.change >= 0 ? "↑" : "↓"} {Math.abs(city.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesChart;
