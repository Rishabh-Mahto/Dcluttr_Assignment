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

// Sample data for the chart
const data = [
  { day: "09", thisMonth: 5.0, lastMonth: 5.5 },
  { day: "10", thisMonth: 7.0, lastMonth: 2.5 },
  { day: "11", thisMonth: 6.0, lastMonth: 8.9 },
  { day: "12", thisMonth: 3.5, lastMonth: 3.1 },
  { day: "13", thisMonth: 1.5, lastMonth: 5.9 },
  { day: "14", thisMonth: 3.9, lastMonth: 3.5 },
  { day: "15", thisMonth: 7.2, lastMonth: 4.0 },
];

export default function CustomLineChart({ title }: { title: string }) {
  return (
    <div className="h-[292px] bg-[#FFFFFF] min-w-[349px] border-1 border-[#F1F1F1] rounded-[12px]">
      <div className="flex justify-between items-center h-[44px] w-full p-3 border-b-1 border-[#F1F1F1]">
        <p className="text-sm text-[#031B15]">{title}</p>
        <CircleHelp className="w-4 h-4 text-[#031B15]" />
      </div>
      <div className="flex justify-between w-full h-[36px] p-3 mb-3">
        <p className="text-[24px] text-[#031B15] leading-[35px] font-bold">
          125.65
        </p>
        <div className="flex flex-col text-right ">
          <div className="flex items-center justify-end">
            <MoveUp size={14} className="text-[#1D874F]" />
            <p className="text-[#1D874F] text-[15px] font-bold">2.45%</p>
          </div>
          <p className="text-[13px] text-[#031B1599] leading-4">
            vs 119.69 last month
          </p>
        </div>
      </div>
      <div className="w-full h-[160px] p-3 border-b-1 border-[#F1F1F1]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 0, right: 0, left: -40, bottom: 0 }}
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
              ticks={[1.5, 3.0, 4.5, 6.0]}
              tickCount={4}
              axisLine={false}
            />

            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#EDEDED"
            />

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
