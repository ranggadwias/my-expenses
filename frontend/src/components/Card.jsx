const Card = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px] max-h-[300px] w-full shadow-[0_0_20px_rgba(0,0,0,0.2)] px-5 rounded-md">
      {children}
    </div>
  );
};

export default Card;
