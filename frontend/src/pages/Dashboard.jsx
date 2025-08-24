import CardRowContainer from "../components/CardRowContainer";
import CategoryPieChart from "../components/Chart/CategoryPieChart";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import { useDashboard } from "../hooks/useDashboard";
import { formatRupiah } from "../utils/formatters";

const Dashboard = () => {
  const { totalIncome, totalExpense, balance, user } = useDashboard();

  return (
    <div>
      <Navbar />
      <div className="px-12 py-8">
        <p className="text-3xl mb-5">
          Hello, <span className="font-medium">{user.name}</span>
        </p>
        <CardRowContainer>
          <SummaryCard title="Balance" amount={formatRupiah(balance)} />
          <SummaryCard title="Income" amount={formatRupiah(totalIncome)} />
          <SummaryCard title="Expense" amount={formatRupiah(totalExpense)} />
        </CardRowContainer>
      </div>
    </div>
  );
};

export default Dashboard;
