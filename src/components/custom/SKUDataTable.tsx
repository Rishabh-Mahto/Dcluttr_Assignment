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
import React, { useEffect, useState } from "react";
import { executeQuery } from "@/fetchUtil";
import refConfig from "@/assets/req.json";

interface SKUData {
  id: string;
  name: string;
  sales: string;
  outOfStock: string;
  totalInventory: string;
  averageRank: number;
  estTraffic: number;
  estImpressions: number;
}

interface RawSKUItem {
  "blinkit_insights_sku.id": string;
  "blinkit_insights_sku.name": string;
  "blinkit_insights_sku.sales_mrp_sum": string;
  "blinkit_insights_sku.qty_sold": string;
  "blinkit_insights_sku.drr_7": string;
  "blinkit_insights_sku.drr_14": string;
  "blinkit_insights_sku.drr_30": string;
  "blinkit_insights_sku.sales_mrp_max": string;
  "blinkit_insights_sku.month_to_date_sales": string;
  "blinkit_insights_sku.be_inv_qty": string;
  "blinkit_insights_sku.fe_inv_qty": string;
  "blinkit_insights_sku.inv_qty": string;
  "blinkit_insights_sku.days_of_inventory_14": string;
  "blinkit_insights_sku.days_of_inventory_max": string;
  "blinkit_scraping_stream.on_shelf_availability": string | null;
  "blinkit_scraping_stream.rank_avg": string | null;
  "blinkit_scraping_stream.selling_price_avg": string | null;
  "blinkit_scraping_stream.discount_avg": string | null;
}

const SKUTable: React.FC = () => {
  const [data, setData] = useState<SKUData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const buildQuery = () => {
    const config = refConfig.cards.find(
      (c: any) => c.id === "blinkit-insights-sku"
    );
    return config?.query ? JSON.parse(config.query) : null;
  };

  const transformApiData = (rawData: RawSKUItem[]): SKUData[] => {
    return rawData.map((item) => ({
      id: item["blinkit_insights_sku.id"],
      name: item["blinkit_insights_sku.name"],
      sales: `₹${Number(
        item["blinkit_insights_sku.sales_mrp_sum"]
      ).toLocaleString()}`,
      outOfStock: item["blinkit_scraping_stream.on_shelf_availability"]
        ? `${(
            100 - Number(item["blinkit_scraping_stream.on_shelf_availability"])
          ).toFixed(2)}%`
        : "N/A",
      totalInventory: item["blinkit_insights_sku.inv_qty"],
      averageRank: item["blinkit_scraping_stream.rank_avg"]
        ? Number(item["blinkit_scraping_stream.rank_avg"])
        : 0,
      estTraffic: Number(item["blinkit_insights_sku.qty_sold"]),
      estImpressions: Number(item["blinkit_insights_sku.month_to_date_sales"]),
    }));
  };

  const getSKUData = async () => {
    try {
      setLoading(true);
      const query = buildQuery();
      if (!query) return console.error("Query not found in config");

      const response = await executeQuery(query);
      const transformed = transformApiData(response[0].data);
      setData(transformed);
    } catch (error) {
      console.error("Failed to load SKU data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSKUData();
  }, []);

  const totalSales = data.reduce(
    (acc, item) => acc + Number(item.sales.replace(/[^0-9.-]+/g, "")),
    0
  );
  const totalOutOfStock = data.reduce(
    (acc, item) => acc + parseFloat(item.outOfStock.replace("%", "")) || 0,
    0
  );
  const totalInventory = data.reduce(
    (acc, item) => acc + Number(item.totalInventory || 0),
    0
  );
  const totalAverageRank = data.reduce(
    (acc, item) => acc + item.averageRank,
    0
  );
  const totalTraffic = data.reduce((acc, item) => acc + item.estTraffic, 0);
  const totalImpressions = data.reduce(
    (acc, item) => acc + item.estImpressions,
    0
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[20px] leading-6 font-bold text-[#031B15]">
            SKU level data
          </h2>
          <p className="text-sm font-normal text-[#4F4D55]">
            Analytics for all your SKUs
          </p>
        </div>
        <Button
          variant="outline"
          className="flex w-[109px] h-[40px] items-center gap-2 bg-[#027056] text-white rounded-[10px] text-sm font-medium hover:bg-[#027056] hover:text-white"
        >
          Filters(1) <ChevronDown size={25} />
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 w-full overflow-x-auto shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                rowSpan={2}
                className="w-1/6 border-r border-[#F1F1F1]"
              >
                <div className="flex items-center justify-center gap-1">
                  <ChartLine size={20} className="text-[#031B15]" />
                  <p>SKU Name</p>
                </div>
              </TableHead>
              <TableHead
                colSpan={3}
                className="text-center font-bold border-r border-[#F1F1F1]"
              >
                Availability
              </TableHead>
              <TableHead colSpan={4} className="text-center font-bold">
                Visibility
              </TableHead>
            </TableRow>
            <TableRow>
              {[
                "Sales",
                "Out of Stock",
                "Total Inventory",
                "Avg. Rank",
                "Est. Traffic",
                "Est. Impressions",
              ].map((label, i) => (
                <TableHead
                  key={i}
                  className={`text-center${
                    label === "Total Inventory"
                      ? " border-r border-[#F1F1F1]"
                      : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-1">
                    <p className="font-semibold text-[15px] text-[#013025]">
                      {label}
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="border-r border-[#F1F1F1]">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      defaultChecked
                      className="data-[state=checked]:bg-[#027056] data-[state=checked]:border-[#027056]"
                    />
                    {item.name}
                  </div>
                </TableCell>
                <TableCell className="text-center text-[#4E5E5A] text-sm font-medium">
                  {item.sales}
                </TableCell>
                <TableCell className="text-center text-[#4E5E5A] text-sm font-medium">
                  {item.outOfStock}
                </TableCell>
                <TableCell className="text-center text-[#4E5E5A] text-sm font-medium border-r border-[#F1F1F1]">
                  {item.totalInventory}
                </TableCell>
                <TableCell className="text-center text-[#4E5E5A] text-sm font-medium">
                  {item.averageRank.toFixed(1)}
                </TableCell>
                <TableCell className="text-center text-[#4E5E5A] text-sm font-medium">
                  {item.estTraffic}
                </TableCell>
                <TableCell className="text-center text-[#4E5E5A] text-sm font-medium">
                  {item.estImpressions}
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="bg-[#FFFFFF] font-semibold">
              <TableCell>Total</TableCell>
              <TableCell className="text-center">₹{totalSales}</TableCell>
              <TableCell className="text-center">
                {totalOutOfStock.toFixed(2)}%
              </TableCell>
              <TableCell className="text-center border-r border-[#F1F1F1]">
                {totalInventory}
              </TableCell>
              <TableCell className="text-center">
                {(totalAverageRank / data.length).toFixed(1)}
              </TableCell>
              <TableCell className="text-center">{totalTraffic}</TableCell>
              <TableCell className="text-center">{totalImpressions}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SKUTable;
