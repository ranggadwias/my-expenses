import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  return (
    <nav className="flex justify-between items-center text-white bg-blue-500 min-w-full px-12 py-4">
      <Link to="/" className="text-2xl font-semibold">
        MyExpenses
      </Link>
      <ul className="flex gap-12">
        <li>
          <Link to="/" className="hover:font-semibold">
            Home
          </Link>
        </li>
        <li>
          <Link to="/transactions" className="hover:font-semibold">
            Transactions
          </Link>
        </li>
        <li>
          <Link to="/add-transaction" className="hover:font-semibold">
            Add
          </Link>
        </li>
      </ul>
      <button
        className="cursor-pointer hover:font-semibold"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </nav>
  );
};

export default Navbar;
