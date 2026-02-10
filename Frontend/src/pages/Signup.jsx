import { useState } from "react";
import api from "../utils/axios";

export default function Signup() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = form;

        // Client-side validation
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
            const { token } = await api.post("/user/signup", payload);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("Signup successful:", data);
        } catch (err) {
            console.log(err)
            setError("Network error, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-xl w-full max-w-md space-y-6"
            >
                {/* Role Toggle */}
                <div className="flex bg-black rounded-lg overflow-hidden border border-zinc-700">
                    <button
                        type="button"
                        onClick={() => setRole("user")}
                        className={`w-1/2 py-2 text-sm font-medium transition ${role === "user"
                            ? "bg-white text-black"
                            : "text-gray-400 hover:bg-zinc-800"
                            }`}
                    >
                        User
                    </button>

                    <button
                        type="button"
                        onClick={() => setRole("creator")}
                        className={`w-1/2 py-2 text-sm font-medium transition ${role === "creator"
                            ? "bg-white text-black"
                            : "text-gray-400 hover:bg-zinc-800"
                            }`}
                    >
                        Creator
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-center">
                    Sign Up as {role === "creator" ? "Creator" : "User"}
                </h2>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <input
                    name="name"
                    placeholder="Name"
                    className="input"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input"
                    onChange={handleChange}
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="input"
                    onChange={handleChange}
                />

                <button
                    className="w-full bg-white text-black py-3 rounded font-semibold"
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}
