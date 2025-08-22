const Input = ({ label, id, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-9 w-full text-[13px] border-[1.5px] flex border-gray-300/50 rounded-lg focus:outline-none focus:border-blue-400 px-3 py-1.5"
      />
    </div>
  );
};

export default Input;
