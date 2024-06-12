import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

// Register the controllers and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  LineController,
  BarController
);

const ChartComponent = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allData = [] } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/data");
      return res.data;
    },
  });

  const [selectedTradeCode, setSelectedTradeCode] = useState("");
  const [filteredData, setFilteredData] = useState(allData);

  useEffect(() => {
    if (selectedTradeCode) {
      const filtered = allData.filter(
        (item) => item.trade_code === selectedTradeCode
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(allData);
    }
  }, [selectedTradeCode, allData]);

  const tradeCodes = Array.from(
    new Set(allData.map((item) => item.trade_code))
  );

  if (!allData) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const chartData = {
    labels: filteredData.map((item) => item.date).sort(),
    datasets: [
      {
        type: "line",
        label: "Close",
        data: filteredData.map((item) => item.close),
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        yAxisID: "y1",
      },
      {
        type: "bar",
        label: "Volume",
        data: filteredData.map((item) => item.volume),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="mb-10">
      <div className="flex justify-center mb-4">
        <select
          value={selectedTradeCode}
          onChange={(e) => setSelectedTradeCode(e.target.value)}
          className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Trade Code</option>
          {tradeCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
      <Chart data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
