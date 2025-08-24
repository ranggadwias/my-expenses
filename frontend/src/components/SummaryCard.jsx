const SummaryCard = ({ title, amount }) => {
  return (
    <div className="flex flex-col w-full shadow-[0_0_20px_rgba(0,0,0,0.2)] p-5 rounded-md">
      <span className="font-medium">{title}</span>
      <span className="text-3xl">{amount}</span>
    </div>
  );
};

export default SummaryCard;
