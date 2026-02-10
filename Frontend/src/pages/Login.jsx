import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../utils/axios";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); 

    const login = async (email, password) => {
        console.log("dfhvj")
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

            setError("");
            console.log({ email, password });
            const { token } = await login(email, password);
            localStorage.setItem("token", token);
            navigate("/home");
        } catch (err) {
            console.log("error",err,err.response?.data?.message)
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <form
                onSubmit={handleLogin}
                className="bg-zinc-900 p-8 rounded-xl w-full max-w-md space-y-5"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded bg-black border border-zinc-700 focus:outline-none focus:border-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 rounded bg-black border border-zinc-700 focus:outline-none focus:border-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-white text-black py-3 rounded font-semibold">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;