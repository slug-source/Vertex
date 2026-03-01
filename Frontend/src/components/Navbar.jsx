import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logout, getRole } from "../utils/auth";

export default function Navbar() {
    const navigate = useNavigate();
    const role = getRole();

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="sticky top-0 z-50 backdrop-blur-md dark:bg-black/50 border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-4">


                <div
                    onClick={() => navigate("/home")}
                    className="text-2xl font-semibold tracking-wide cursor-pointer text-white"
                >
                    Vertex
                </div>


                <div className="flex items-center gap-4 text-base">

                    <button
                        onClick={() => navigate("/home")}
                        className="px-4 py-2 rounded-lg font-medium text-white hover:bg-white/10 transition"
                    >
                        Problems
                    </button>
                    {role === "user" && (<button
                        onClick={() => navigate("/submissions")}
                        className="px-4 py-2 rounded-lg font-medium text-white hover:bg-white/10 transition"
                    >
                        My Submissions
                    </button>)}
                </div>


                <div className="flex items-center gap-4">
                    {!role && (
                        <>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition shadow-md"
                            >
                                Login
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => navigate("/signup")}
                                className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition text-sm font-semibold shadow-md"
                            >
                                Signup
                            </motion.button>
                        </>
                    )}
                    {role && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={logout}
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition shadow-md"
                        >
                            Logout
                        </motion.button>)
                    }
                </div>
            </div>
        </motion.header>
    );
}
