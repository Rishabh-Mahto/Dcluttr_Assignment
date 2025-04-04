import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChartLine, ChevronDown } from "lucide-react";

export interface CityData {
  cityName: string;
  sales: string;
  percentage: string;
  change: string;
  subRows?: CityData[];
}

const cityData: CityData[] = [
  {
    cityName: "Mumbai",
    sales: "₹0.9L",
    percentage: "0.9%",
    change: "+22.8%",
    subRows: [
      {
        cityName: "Mumbai Sub Region",
        sales: "₹0.4L",
        percentage: "0.4%",
        change: "+11.2%",
      },
    ],
  },
  {
    cityName: "Bengaluru",
    sales: "₹0.8L",
    percentage: "0.8%",
    change: "-11.7%",
  },
  {
    cityName: "Delhi",
    sales: "₹0.5L",
    percentage: "0.5%",
    change: "+12.5%",
  },
];

const totals = {
  totalSales: "₹2.2L",
  totalPercentage: "2.2%",
  totalChange: "+23.6%",
};

const CityTable: React.FC = () => {
  return (
    <div className="">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[20px] leading-6 font-bold text-[#031B15]">
            City level data
          </h2>
          <p className="text-sm font-normal leading-4.5 text-[#4F4D55]">
            Analytics for all cities
          </p>
        </div>
        <Button
          variant="outline"
          className="flex w-[109px] h-[40px] items-center gap-2 bg-[#027056] text-white rounded-[10px] text-sm font-medium"
        >
          Filters(1) <ChevronDown size={25} />
        </Button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-gray-200 w-full">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {/* First header row */}
              <TableRow>
                <TableHead
                  rowSpan={2}
                  className="w-1/6 border-r border-[#F1F1F1]"
                >
                  <div className="flex items-center justify-center gap-1">
                    <ChartLine size={20} className="text-[#031B15]" />
                    <p>City Name</p>
                  </div>
                </TableHead>
                <TableHead
                  colSpan={3}
                  className="text-center text-[15px] font-bold"
                >
                  Sales Metrics
                </TableHead>
              </TableRow>

              {/* Second header row with sub-columns */}
              <TableRow>
                <TableHead>
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] font-semibold leading-4">Sales</p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] font-semibold leading-4">
                      Percentage
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] font-semibold leading-4">
                      Change
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cityData.map((city, index) => (
                <React.Fragment key={index}>
                  {/* Main City Row */}
                  <TableRow>
                    <TableCell className="border-r border-[#F1F1F1]">
                      <div className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        {city.cityName}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{city.sales}</TableCell>
                    <TableCell className="text-center">
                      {city.percentage}
                    </TableCell>
                    <TableCell className="text-center">{city.change}</TableCell>
                  </TableRow>

                  {/* Sub Rows if available */}
                  {city.subRows &&
                    city.subRows.map((subRow, subIndex) => (
                      <TableRow key={subIndex} className="bg-gray-50">
                        <TableCell className="pl-8 border-r border-[#F1F1F1]">
                          {subRow.cityName}
                        </TableCell>
                        <TableCell className="text-center">
                          {subRow.sales}
                        </TableCell>
                        <TableCell className="text-center">
                          {subRow.percentage}
                        </TableCell>
                        <TableCell className="text-center">
                          {subRow.change}
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}

              {/* Totals Row */}
              <TableRow className="font-semibold bg-gray-100">
                <TableCell>Total</TableCell>
                <TableCell className="text-center">
                  {totals.totalSales}
                </TableCell>
                <TableCell className="text-center">
                  {totals.totalPercentage}
                </TableCell>
                <TableCell className="text-center">
                  {totals.totalChange}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CityTable;
