import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import api from "../utils/axios";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const login = async (email, password) => {
        const res = await api.post("/user/login", { email, password });
        return res.data;
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                setError("All fields are required");
                return;
            }
            if (password.trim().length < 6) {
                setError("Password must be greater 6 chars");
                return;
            }

            setError("");
            console.log({ email, password });
            const { result } = await login(email, password);
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", result.role);
            navigate("/home");
        } catch (err) {
            console.log("error", err, err.response?.data?.message)
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (


        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

            <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-600 opacity-20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>

            <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleLogin}
                className="relative z-10 w-full max-w-md p-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl space-y-6"
            >
                <h2 className="text-3xl font-semibold text-center tracking-wide">
                    Welcome Back
                </h2>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm text-center"
                    >
                        {error}
                    </motion.p>
                )}

                <div className="relative">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer w-full bg-transparent border border-white/20 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-indigo-500"
                    />
                    <label className="absolute left-4 top-2 text-xs text-gray-400 transition-all 
                peer-placeholder-shown:top-4 
                peer-placeholder-shown:text-sm 
                peer-placeholder-shown:text-gray-500 
                peer-focus:top-2 
                peer-focus:text-xs 
                peer-focus:text-indigo-400">
                        Email
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer w-full bg-transparent border border-white/20 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-indigo-500"
                    />
                    <label className="absolute left-4 top-2 text-xs text-gray-400 transition-all 
                peer-placeholder-shown:top-4 
                peer-placeholder-shown:text-sm 
                peer-placeholder-shown:text-gray-500 
                peer-focus:top-2 
                peer-focus:text-xs 
                peer-focus:text-indigo-400">
                        Password
                    </label>
                </div>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold shadow-lg"
                >
                    Login
                </motion.button>
                <div className="text-center text-sm text-gray-400">
                    New to Vertex?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition"
                    >
                        Create an account
                    </button>
                </div>
            </motion.form>

        </div>
    );
}

export default Login;