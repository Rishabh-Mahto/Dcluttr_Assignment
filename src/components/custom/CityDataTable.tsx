import { useEffect, useState } from "react";
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
import { executeQuery } from "@/fetchUtil";
import refConfig from "@/assets/req.json";

interface CityApiItem {
  "blinkit_insights_city.name": string;
  "blinkit_insights_city.sales_mrp_sum": string;
}

interface CityRow {
  id: string;
  name: string;
  sales: string;
  percentShare: string;
  monthOverMonthChange: number;
}

interface Totals {
  overallSales: string;
  overallPercentage: string;
  overallChange: number;
}

const CityTable = () => {
  const [cityRows, setCityRows] = useState<CityRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState<Totals>({
    overallSales: "",
    overallPercentage: "",
    overallChange: 0,
  });

  const loadCityData = async () => {
    try {
      setLoading(true);
      const configCard = refConfig.cards.find(
        (card: any) => card.id === "blinkit-insights-city"
      );

      if (!configCard || !configCard.query) {
        console.error("Missing configuration for the city insights.");
        return;
      }

      const queryConfig = JSON.parse(configCard.query);
      const [currentMonth, previousMonth] = await executeQuery(queryConfig);

      const currentData: CityApiItem[] = currentMonth.data;
      const previousData: CityApiItem[] = previousMonth.data;

      const overallSalesValue = currentData.reduce(
        (acc, item) =>
          acc + Number(item["blinkit_insights_city.sales_mrp_sum"]),
        0
      );

      const rows = currentData.map((item, idx) => {
        const currentSales = Number(
          item["blinkit_insights_city.sales_mrp_sum"]
        );
        const percentShare = ((currentSales / overallSalesValue) * 100).toFixed(
          1
        );
        const matchingPrev = previousData.find(
          (prev) =>
            prev["blinkit_insights_city.name"] ===
            item["blinkit_insights_city.name"]
        );
        const prevSales = matchingPrev
          ? Number(matchingPrev["blinkit_insights_city.sales_mrp_sum"])
          : 0;

        const changeValue = prevSales
          ? ((currentSales - prevSales) / prevSales) * 100
          : 0;

        return {
          id: idx.toString(),
          name: item["blinkit_insights_city.name"],
          sales: `₹${(currentSales / 100000).toFixed(1)}L`,
          percentShare: `${Number(percentShare).toFixed(1)}%`,
          monthOverMonthChange: parseFloat(changeValue.toFixed(1)),
        };
      });

      const aggregatedChange = rows.reduce(
        (sum, city) => sum + (city.monthOverMonthChange || 0),
        0
      );

      setTotals({
        overallSales: `₹${(overallSalesValue / 100000).toFixed(1)}L`,
        overallPercentage: "100%",
        overallChange: parseFloat(aggregatedChange.toFixed(1)),
      });

      setCityRows(rows);
    } catch (err) {
      console.error("Failed to load city data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCityData();
  }, []);

  return (
    <div className="mt-[40px]">
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
          className="flex w-[109px] h-[40px] items-center gap-2 bg-[#027056] text-white rounded-[10px] text-sm font-medium hover:bg-[#027056] hover:text-white"
        >
          Filters(1) <ChevronDown size={25} />
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 w-full shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
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
              <TableRow>
                <TableHead>
                  <div className="flex justify-center  items-center gap-1">
                    <p className="text-[15px] font-semibold text-[#013025] leading-4">
                      Sales
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] text-[#013025] font-semibold leading-4">
                      Percentage
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex justify-center items-center gap-1">
                    <p className="text-[15px] text-[#013025] font-semibold leading-4">
                      Change
                    </p>
                    <ChevronDown size={14} className="text-[#031B15]" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            {!loading ? (
              <TableBody>
                {cityRows.slice(0, 4).map((city) => (
                  <TableRow key={city.id}>
                    <TableCell className="border-r border-[#F1F1F1]">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          defaultChecked
                          className="data-[state=checked]:bg-[#027056] data-[state=checked]:border-[#027056]"
                        />
                        {city.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-[#4E5E5A] text-sm font-medium">
                      {city.sales}
                    </TableCell>
                    <TableCell className="text-center text-[#4E5E5A] text-sm font-medium">
                      {city.percentShare}
                    </TableCell>
                    <TableCell className="text-center text-[#4E5E5A] text-sm font-medium">
                      {city.monthOverMonthChange}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold bg-[#FFFFFF">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-center">
                    {totals.overallSales}
                  </TableCell>
                  <TableCell className="text-center">
                    {totals.overallPercentage}
                  </TableCell>
                  <TableCell className="text-center">
                    {totals.overallChange}
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CityTable;
