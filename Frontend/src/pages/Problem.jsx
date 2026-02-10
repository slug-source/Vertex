import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios"

const Problem = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState([]);
    const [error, setError] = useState("");

    let navigate = useNavigate();


    useEffect(() => {
        const getProblemById = async () => {
            try {
                const res = await api.get(`/problem/${id}`);
                setProblem(res.data.result);
            } catch (err) {
                console.log(err)
                setError(err.response?.data?.message || "Error fetching problems");
            }
        }; getProblemById()
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-6 space-y-4 bg-black">
                <h1 className="text-2xl font-bold text-white">{problem.title}</h1>

                {error && <p className="text-red-400">{error}</p>}

                <div className="space-y-2">

                    <h2>Problem Statement</h2>
                    <p>{problem.problemStatement}</p>

                    <h2>Constraints</h2>
                    <p>{problem.constraints}</p>

                    {problem.visiblecases && problem.visiblecases.length > 0 && (
                        <div>
                            <h2> Sample Testcases</h2>
                            {problem.visiblecases.map((tc, i) => (
                                <div key={i}>
                                    <b>Input:</b> {tc.input}
                                    <br />
                                    <b>Output:</b> {tc.output}
                                </div>
                            ))}
                        </div>
                    )}

                    {problem.hiddencases && problem.hiddencases.length > 0 && (
                        <div>
                            <h2>Hidden Testcases</h2>
                            {problem.hiddencases.map((tc, i) => (
                                <div key={i}>
                                    <b>Input:</b> {tc.input}
                                    <br />
                                    <b>Output:</b> {tc.output}
                                </div>
                            ))}
                        </div>
                    )
                    }
                </div>
            </div >
        </>
    );
}

export default Problem;