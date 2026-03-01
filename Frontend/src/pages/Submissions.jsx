import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { getRole } from "../utils/auth";
import { motion } from "framer-motion";

const Submissions = () => {
    const getVerdictStyles = (verdict) => {
        if (verdict === "Accepted") {
            return "bg-green-500/5 border-green-500/20 hover:bg-green-500/10";
        }
        return "bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10";
    };
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState("");
    const role = getRole();

    let navigate = useNavigate();

    useEffect(() => {

        const getSubmissions = async () => {
            try {
                const res = await api.get("/submission");
                setSubmissions(res.data.result);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching submissions");
            }

        };
        getSubmissions();
    }, []);

    return (

        <>
            <Navbar />

            <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

                <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-indigo-600 opacity-15 blur-[130px] rounded-full"></div>
                <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-purple-600 opacity-15 blur-[130px] rounded-full"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-10">

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                                Submissions
                            </h1>
                            <p className="text-gray-400 mt-2">
                                Track your progress.
                            </p>
                        </div>
                    </div>


                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
                            {error}
                        </div>
                    )}


                    <div className="space-y-3">
                        {submissions.length === 0 ? (
                            <div className="p-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center">
                                <p className="text-lg font-medium">No submissions yet.</p>
                            </div>
                        ) : (
                            submissions.map((submission, index) => (
                                <motion.div
                                    key={submission._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: index * 0.02 }}
                                    whileHover={{ scale: 1.01 }}
                                    className={`group cursor-pointer p-5 rounded-2xl backdrop-blur-xl border transition${getVerdictStyles(submission.verdict)}`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-400 font-mono text-sm w-8">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <div>
                                                <h3 className="text-lg font-medium group-hover:text-indigo-300 transition">
                                                    {submission.problemId}
                                                </h3>

                                                <p className="text-sm text-gray-400 mt-1">
                                                    {submission.verdict}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Submissions;