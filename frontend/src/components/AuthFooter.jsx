import { Link } from "react-router-dom";

const AuthFooter = ({ message, linkTo, linkText }) => {
  return (
    <div>
      <p className="text-sm text-center tracking-wide">
        {message}{" "}
        <Link
          to={linkTo}
          className="text-blue-400 hover:underline font-semibold"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooter;
