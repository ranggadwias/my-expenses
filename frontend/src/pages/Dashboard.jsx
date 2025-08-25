import Card from "../components/Card";
import CardRowContainer from "../components/CardRowContainer";
import CategoryPieChart from "../components/Chart/CategoryPieChart";
import MonthlyTrendChart from "../components/Chart/MonthlyTrendChart";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import { useDashboard } from "../hooks/useDashboard";
import { formatRupiah } from "../utils/formatters";

const Dashboard = () => {
  const {
    recentTransactions,
    totalIncome,
    totalExpense,
    balance,
    user,
    expensePerCategory,
    monthlyExpenses,
    isMonthlyEmpty,
  } = useDashboard();

  return (
    <div>
      <Navbar />
      <div className="px-12 py-8 pt-22">
        <p className="text-3xl mb-5">
          Hello, <span className="font-medium">{user.name}</span>
        </p>

        <CardRowContainer>
          <SummaryCard title="Balance" amount={formatRupiah(balance)} />
          <SummaryCard title="Income" amount={formatRupiah(totalIncome)} />
          <SummaryCard title="Expense" amount={formatRupiah(totalExpense)} />
        </CardRowContainer>

        <CardRowContainer>
          <Card title="Expenses by Category">
            {expensePerCategory.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm">
                No transactions available
              </div>
            ) : (
              <CategoryPieChart data={expensePerCategory} />
            )}
          </Card>
          <Card title="Monthly Spending Trend">
            {isMonthlyEmpty ? (
              <div className="flex items-center justify-center h-full text-sm">
                No monthly data available
              </div>
            ) : (
              <MonthlyTrendChart data={monthlyExpenses} />
            )}
          </Card>
        </CardRowContainer>

        <CardRowContainer>
          <Card title="Recent Transactions">
            <TransactionTable transactions={recentTransactions} />
          </Card>
        </CardRowContainer>
      </div>
    </div>
  );
};

export default Dashboard;
