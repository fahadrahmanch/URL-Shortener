import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: implement login logic
        console.log({ username, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
            <div className="bg-white border border-gray-200 rounded-xl p-10 w-full max-w-md shadow-lg box-border">
                <h2 className="text-[28px] font-bold text-center text-gray-900 m-0 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-8 text-[15px] m-0">Sign in to continue to your dashboard</p>
                
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Enter your username" 
                            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-[15px] outline-none transition-all hover:border-gray-400 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/15 w-full box-border"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
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
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-none rounded-lg py-3.5 px-4 text-[15px] font-semibold cursor-pointer mt-2 transition-colors">
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