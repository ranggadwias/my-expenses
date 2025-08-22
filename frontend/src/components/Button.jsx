const Button = ({ children }) => {
  return (
    <button className="bg-blue-400 text-white p-2 rounded-lg mt-2 cursor-pointer hover:bg-blue-500 transition duration-300">
      {children}
    </button>
  );
};

export default Button;
