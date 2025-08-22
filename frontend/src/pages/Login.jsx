import { useState } from "react";
import { userLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthFooter from "../components/AuthFooter";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userLogin(form);
      localStorage.setItem("token", user.token);
      setForm({
        email: "",
        password: "",
      });
      setErrorMessage("");
      navigate("/dashboard");
    } catch (error) {
      const apiError = error.response.data.error;
      setErrorMessage(apiError);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="min-w-md flex flex-col rounded-md p-8 gap-y-4 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
          <span className="text-3xl font-medium">Login</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <Input
              label="Email"
              id="email"
              placeholder="johndoe@example.com"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
            <Input
              label="Password"
              id="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              type="password"
            />

            {errorMessage && (
              <div className="text-red-500 text-sm bg-red-100 px-3 py-2 rounded">
                {errorMessage}
              </div>
            )}

            <Button children="Login" />

            <AuthFooter
              message="Don't have an account?"
              linkTo="/register"
              linkText="Register"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
