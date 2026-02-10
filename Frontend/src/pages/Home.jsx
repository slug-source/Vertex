import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const getProblems = async () => {
            try {
                const res = await api.get("/problem");
                setProblems(res.data.result);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching problems");
            }
        };
        getProblems();
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-6 space-y-4 bg-black">
                <h1 className="text-2xl font-bold text-white">Problems</h1>

                {error && <p className="text-red-400">{error}</p>}

                <div className="space-y-2">
                    {problems.map((problem, index) => (
                        <div
                            key={problem._id}
                            onClick={() => navigate(`/problem/${problem._id}`)}
                            className="w-full p-4 mb-3 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 font-mono">
                                    {index + 1}.
                                </span>
                                
                                <h3 className="text-lg font-medium">
                                    {problem.title}
                                </h3>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default Home;