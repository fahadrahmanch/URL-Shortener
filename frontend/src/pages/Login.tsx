import React, { useState } from "react";
import { Link } from "react-router-dom";
import { emailValidation } from "../ validation/authValidation";
import { passwordValidation } from "../ validation/authValidation";
import { loginAPI } from "../api/axios/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<{ email: string | null, password: string | null }>({ email: null, password: null });
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailErr = emailValidation(email);
        const passwordErr = passwordValidation(password);

        setError({ email: emailErr, password: passwordErr });

        if (emailErr || passwordErr) {
            return;
        }
        try {
            const res = await loginAPI(email, password);
            console.log(res.data);
            localStorage.setItem(
                "accessToken",
                res.data.accessToken
            );
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        }
    };
    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {

        setEmail(e.target.value);

        setError({ ...error, email: emailValidation(e.target.value) });
    }
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        setError({ ...error, password: passwordValidation(e.target.value) });
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
            <div className="bg-white border border-gray-200 rounded-xl p-10 w-full max-w-md shadow-lg box-border">
                <h2 className="text-[28px] font-bold text-center text-gray-900 m-0 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-8 text-[15px] m-0">Sign in to continue to your dashboard</p>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"

                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-[15px] outline-none transition-all hover:border-gray-400 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/15 w-full box-border"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                        />
                        {error.email && <span className="text-red-500 text-xs mt-0.5">{error.email}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-[15px] outline-none transition-all hover:border-gray-400 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/15 w-full box-border"
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                        />
                        {error.password && <span className="text-red-500 text-xs mt-0.5">{error.password}</span>}
                    </div>
                    <button type="submit" className="bg-orange-600 hover:bg-blue-700 active:bg-blue-800 text-white border-none rounded-lg py-3.5 px-4 text-[15px] font-semibold cursor-pointer mt-2 transition-colors">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?
                    <Link to="/register" className="text-blue-600 font-medium ml-1 hover:text-blue-800 hover:underline">Create one</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;