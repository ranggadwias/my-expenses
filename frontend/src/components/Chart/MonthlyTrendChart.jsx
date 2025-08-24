import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyTrendChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Expense",
        data: data.map((item) => item.total),
        backgroundColor: "#FF6384",
        borderRadius: 2,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 15,
        right: 15,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        position: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MonthlyTrendChart;
