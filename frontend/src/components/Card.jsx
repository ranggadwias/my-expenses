const Card = ({ children, title }) => {
  return (
    <div className="flex flex-col items-center min-h-[200px] max-h-[300px] w-full shadow-[0_0_20px_rgba(0,0,0,0.2)] px-5 pt-4 rounded-md">
      {title && <h2 className="text-xl font-medium">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
