import { useState } from "react";
import api from "../utils/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("user");
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const signup = async (payload) => {
        const res = await api.post("/user/signup", payload);
        return res.data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = form;

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setError("");
        setLoading(true);

        const payload = { name, email, password, role };

        try {
            const { result } = await signup(payload);
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", result.role);
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Signup Failed");
        } finally {
            setLoading(false);
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
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-md p-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl space-y-6"
            >
                <div className="relative flex bg-black/40 rounded-xl p-1 border border-white/10">
                    <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`absolute top-1 bottom-1 w-1/2 rounded-lg bg-indigo-600`}
                        style={{ left: role === "user" ? "4px" : "50%" }}
                    />
                    <button
                        type="button"
                        onClick={() => setRole("user")}
                        className="relative z-10 w-1/2 py-2 text-sm font-medium"
                    >
                        User
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("creator")}
                        className="relative z-10 w-1/2 py-2 text-sm font-medium"
                    >
                        Creator
                    </button>
                </div>

                <h2 className="text-3xl font-semibold text-center tracking-wide">
                    Create Account
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

                {["name", "email", "password", "confirmPassword"].map((field) => (
                    <div key={field} className="relative">
                        <input
                            name={field}
                            type={field.toLowerCase().includes("password") ? "password" : field === "email" ? "email" : "text"}
                            required
                            onChange={handleChange}
                            className="peer w-full bg-transparent border border-white/20 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:border-indigo-500"
                        />
                        <label className="absolute left-4 top-2 text-xs text-gray-400 transition-all 
                    peer-placeholder-shown:top-4 
                    peer-placeholder-shown:text-sm 
                    peer-placeholder-shown:text-gray-500 
                    peer-focus:top-2 
                    peer-focus:text-xs 
                    peer-focus:text-indigo-400">
                            {field === "confirmPassword"
                                ? "Confirm Password"
                                : field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                    </div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold shadow-lg disabled:opacity-70"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </motion.button>

                <div className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition"
                    >
                        Login
                    </button>
                </div>
            </motion.form>
        </div>
    );
}


export default Signup;