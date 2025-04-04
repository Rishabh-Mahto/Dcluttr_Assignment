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
import React from "react";

interface SubRow {
  name: string;
  sales: string;
  outOfStock: string;
  totalInventory: string;
  avgRank: number;
  estTraffic: number;
  estImpressions: number;
}

interface SkuData {
  name: string;
  sales: string;
  outOfStock: string;
  totalInventory: string;
  avgRank: string;
  estTraffic: string;
  estImpressions: string;
  subRows?: SubRow[];
}

const skuData: SkuData[] = [
  {
    name: "Protein Bar 100g",
    sales: "₹93,132.12",
    outOfStock: "1.68%",
    totalInventory: "931.9",
    avgRank: "3.2",
    estTraffic: "12,303",
    estImpressions: "25,005",
    subRows: [
      {
        name: "Choco Bar 100g",
        sales: "₹8,526.32",
        outOfStock: "6.79%",
        totalInventory: "679",
        avgRank: 7,
        estTraffic: 3005,
        estImpressions: 4231,
      },
      {
        name: "",
        sales: "₹7,012.72",
        outOfStock: "3.28%",
        totalInventory: "328",
        avgRank: 4,
        estTraffic: 2960,
        estImpressions: 3657,
      },
    ],
  },
  {
    name: "SKU 3",
    sales: "₹9313",
    outOfStock: "1.68%",
    totalInventory: "931.9",
    avgRank: "11",
    estTraffic: "1931.9",
    estImpressions: "931.9",
  },
  {
    name: "SKU 4",
    sales: "₹0",
    outOfStock: "0%",
    totalInventory: "0",
    avgRank: "-",
    estTraffic: "₹0",
    estImpressions: "₹0",
  },
];

export default function SKUTable() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[20px] leading-6 font-bold text-[#031B15]">
            SKU level data
          </h2>
          <p className="text-sm font-normal leading-4.5 text-[#4F4D55]">
            Analytics for all your SKUs
          </p>
        </div>
        <Button
          variant="outline"
          className="flex w-[109px] h-[40px] items-center gap-2 bg-[#027056] text-white rounded-[10px] text-sm font-medium"
        >
          Filters(1) <ChevronDown size={25} />
        </Button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200  w-full">
        {/* Table with Divided Sections */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {/* First header row for grouping */}
              <TableRow>
                {/* SKU Name spans two rows */}
                <TableHead
                  rowSpan={2}
                  className="w-1/6 border-r border-[#F1F1F1]"
                >
                  <div className="flex items-center justify-center gap-1">
                    {" "}
                    <ChartLine size={20} className="text-[#031B15]" />
                    <p>SKU Name</p>
                  </div>
                </TableHead>
                {/* Availability group */}
                <TableHead
                  colSpan={3}
                  className="text-center text-[15px] font-bold border-r border-[#F1F1F1]"
                >
                  Availability
                </TableHead>
                {/* Visibility group */}
                <TableHead
                  colSpan={4}
                  className="text-center text-[15px] font-bold"
                >
                  Visibility
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
                <TableHead className="text-center">
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] font-semibold leading-4">
                      Out of Stock
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
                <TableHead className="border-r border-[#F1F1F1]">
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] font-semibold leading-4">
                      Total Inventory
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] font-semibold leading-4">
                      Avg. Rank
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] font-semibold leading-4">
                      Est. Traffic
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] font-semibold leading-4">
                      Est. Impressions
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {skuData.map((sku, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <TableRow>
                    <TableCell className=" border-r border-[#F1F1F1]">
                      <div className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        {sku.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{sku.sales}</TableCell>
                    <TableCell className="text-center">
                      {sku.outOfStock}
                    </TableCell>
                    <TableCell className="text-center border-r border-[#F1F1F1]">
                      {sku.totalInventory}
                    </TableCell>
                    <TableCell className="text-center">{sku.avgRank}</TableCell>
                    <TableCell className="text-center">
                      {sku.estTraffic}
                    </TableCell>
                    <TableCell className="text-center">
                      {sku.estImpressions}
                    </TableCell>
                  </TableRow>

                  {/* Sub Rows if Available */}
                  {sku.subRows &&
                    sku.subRows.map((subRow, subIndex) => (
                      <TableRow key={subIndex} className="bg-gray-50">
                        <TableCell className="pl-8  border-r border-[#F1F1F1]">
                          {subRow.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {subRow.sales}
                        </TableCell>
                        <TableCell className="text-center">
                          {subRow.outOfStock}
                        </TableCell>
                        <TableCell className="text-center  border-r border-[#F1F1F1]">
                          {subRow.totalInventory}
                        </TableCell>
                        <TableCell className="text-center">
                          {subRow.avgRank}
                        </TableCell>
                        <TableCell className="text-center">
                          {subRow.estTraffic}
                        </TableCell>
                        <TableCell className="text-center">
                          {subRow.estImpressions}
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}

              {/* Total Row */}
              <TableRow className="font-semibold bg-gray-100">
                <TableCell>Total</TableCell>
                <TableCell className="text-center">₹2,93,132.12</TableCell>
                <TableCell className="text-center">16%</TableCell>
                <TableCell className="text-center border-r border-[#F1F1F1]">
                  2931
                </TableCell>
                <TableCell className="text-center">8.3</TableCell>
                <TableCell className="text-center">61,985</TableCell>
                <TableCell className="text-center">2,61,768</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
