import { useState, useEffect } from "react";
import { CircleHelp, MoveUp } from "lucide-react";
import {
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
} from "recharts";
import { executeQuery } from "@/fetchUtil";
import reqConfig from "@/assets/req.json";

interface SalesData {
  "blinkit_insights_sku.created_at.day": string;
  "blinkit_insights_sku.created_at": string;
  "blinkit_insights_sku.sales_mrp_sum": string;
  "time.day": string;
}

interface ChartData {
  value: number;
  lastValue: number;
  date: string;
}

interface ResultData {
  query: {
    measures: ["blinkit_insights_sku.sales_mrp_sum"];
    timeDimensions: [
      {
        dimension: "blinkit_insights_sku.created_at";
        granularity: "day";
        dateRange: string[];
      }
    ];
  };
  data: SalesData[];
  lastRefreshTime: string;
  annotation: {
    measures: {
      "blinkit_insights_sku.sales_mrp_sum": {
        title: string;
        shortTitle: string;
        type: string;
        meta: {
          format: string;
          metricCategory: string;
        };
        drillMembers: string[];
        drillMembersGrouped: {
          measures: string[];
          dimensions: string[];
        };
      };
    };
    dimensions: object;
    segments: object;
    timeDimensions: {
      "blinkit_insights_sku.created_at.day": {
        title: string;
        shortTitle: string;
        type: string;
        granularity: {
          name: string;
          title: string;
          interval: string;
        };
      };
      "blinkit_insights_sku.created_at": {
        title: string;
        shortTitle: string;
        type: string;
      };
    };
    dataSource: string;
    dbType: string;
    extDbType: string;
    external: boolean;
    slowQuery: boolean;
    total: number | null;
  };
}

const processSalesData = (data: ResultData[]): ChartData[] => {
  return data[1].data.map((item: SalesData, index: number) => ({
    value: Number(item["blinkit_insights_sku.sales_mrp_sum"]),
    lastValue: Number(
      data[0]?.data[index]?.["blinkit_insights_sku.sales_mrp_sum"] ?? 0
    ),
    date: new Date(item["blinkit_insights_sku.created_at"]).toLocaleDateString(
      "en-US",
      { day: "numeric" }
    ),
  }));
};

export default function SalesLineChart({ title }: { title: string }) {
  const [loading, setLoading] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [lastMonthTotalQuantity, setLastMonthTotalQuantity] = useState(0);
  const [change, setChange] = useState(0);
  const [data, setData] = useState<ChartData[]>([]);

  const fetchQuantityData = async () => {
    setLoading(true);
    try {
      const cardConfig = reqConfig.cards.find(
        (card: any) => card.id === "blinkit-insights-sku-sales_mrp"
      );

      if (!cardConfig || !cardConfig.query) {
        console.error("Card config or query not found");
        return;
      }

      const queryObject = JSON.parse(cardConfig.query);
      const response = await executeQuery(queryObject);
      const processedData = processSalesData(response);
      setData(processedData);

      const total = processedData.reduce((sum, item) => sum + item.value, 0);
      const lastTotal = processedData.reduce(
        (sum, item) => sum + item.lastValue,
        0
      );

      setTotalQuantity(Number((total / 100000).toFixed(1)));
      setLastMonthTotalQuantity(Number((lastTotal / 100000).toFixed(1)));
      setChange(
        lastTotal
          ? Number((((total - lastTotal) / lastTotal) * 100).toFixed(1))
          : 0
      );
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuantityData();
  }, []);

  const chartData = data.map((item) => ({
    day: item.date,
    thisMonth: item.value,
    lastMonth: item.lastValue,
  }));

  return (
    <div className="flex-1 h-[292px] bg-[#FFFFFF] min-w-[349px] border border-[#F1F1F1] rounded-[12px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
      <div className="flex justify-between items-center h-[44px] w-full p-3 border-b border-[#F1F1F1]">
        <p className="text-sm text-[#031B15]">{title}</p>
        <CircleHelp className="w-4 h-4 text-[#031B15]" />
      </div>
      <div className="flex justify-between w-full h-[36px] p-3 mb-3">
        <p className="text-[24px] text-[#031B15] leading-[35px] font-bold">
          {loading ? "Loading..." : totalQuantity + " L"}
        </p>
        <div className="flex flex-col text-right">
          <div className="flex items-center justify-end">
            <MoveUp size={14} className="text-[#1D874F]" />
            <p className="text-[#1D874F] text-[15px] font-bold">
              {loading ? "" : `${change}%`}
            </p>
          </div>
          <p className="text-[13px] text-[#031B1599] leading-4">
            {loading ? "" : `vs ${lastMonthTotalQuantity} last month`}
          </p>
        </div>
      </div>
      <div className="w-full h-[160px] p-3 border-b border-[#F1F1F1]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
            className="m-0 p-0"
          >
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2EB76F" stopOpacity={1} />
                <stop offset="100%" stopColor="#2EB76F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              tick={{
                fontFamily: "Mulish",
                fontSize: 12,
                fontWeight: "500",
                color: "#6B7583",
              }}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              tick={{
                fontFamily: "Mulish",
                color: "#8C9198",
                fontWeight: "500",
                fontSize: "12px",
              }}
              tickCount={4}
              axisLine={false}
            />
            <CartesianGrid horizontal stroke="#EDEDED" vertical={false} />
            <Line
              type="linear"
              dataKey="thisMonth"
              stroke="#1D874F"
              strokeWidth={2}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="thisMonth"
              stroke="none"
              fill="url(#greenGradient)"
              fillOpacity={0.1}
            />
            <Line
              type="linear"
              dataKey="lastMonth"
              strokeDasharray="5 5"
              stroke="#DB3500CC"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 h-[40px] justify-start p-[12px] text-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1D874F]" />
          <span className="text-[13px] leading-4 font-normal text-[#7D7D7E]">
            This Month
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#DB3500CC]" />
          <span className="text-[13px] leading-4 font-normal text-[#7D7D7E]">
            Last Month
          </span>
        </div>
      </div>
    </div>
  );
}
