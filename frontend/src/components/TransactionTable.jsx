const TransactionTable = ({ transactions }) => {
  const hasData = transactions && transactions.length > 0;

  return hasData ? (
    <table className="w-2/3 border-collapse mt-6 text-sm mb-3">
      <thead>
        <tr>
          <th className="border-t border-gray-300 p-2 text-left">Date</th>
          <th className="border-t border-gray-300 p-2 text-left">
            Description
          </th>
          <th className="border-t border-gray-300 p-2 text-left">Category</th>
          <th className="border-t border-gray-300 p-2 text-left">Amount</th>
          <th className="border-t border-gray-300 p-2 text-left">Type</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td className="border-t border-gray-300 p-2">
              {new Date(transaction.date).toISOString().slice(0, 10)}
            </td>
            <td className="border-t border-gray-300 p-2 capitalize">
              {transaction.note}
            </td>
            <td className="border-t border-gray-300 p-2 capitalize">
              {transaction.category}
            </td>
            <td
              className={`border-t border-gray-300 p-2 ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {transaction.type === "income"
                ? `Rp ${Number(transaction.amount).toLocaleString("id-ID")}`
                : `-Rp ${Number(transaction.amount).toLocaleString("id-ID")}`}
            </td>
            <td className="border-t border-gray-300 p-2 capitalize">
              {transaction.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="flex items-center justify-center h-full text-sm">
      No transactions found.
    </div>
  );
};

export default TransactionTable;
