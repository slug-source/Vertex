import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios"

const Problem = () => {
    const { id } = useParams();
    const role = localStorage.getItem("user")
    const [problem, setProblem] = useState([]);
    const [error, setError] = useState("");

    let navigate = useNavigate();


    useEffect(() => {
        const getProblemById = async () => {
            try {
                const res = await api.get(`/problem/${id}`);
                setProblem(res.data.result);
                console.log(problem)
            } catch (err) {
                console.log(err)
                setError(err.response?.data?.message || "Error fetching problems");
                navigate('/home');
            }
        }; getProblemById()
    }, []);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this problem?")) return;

        try {
            const res = await api.delete(`/problem/${id}`);
            console.log(res)
            alert("Problem deleted successfully!");
            navigate('/home');
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            alert("Failed to delete problem");
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6 space-y-4 bg-black min-h-screen flex flex-col text-white">
                {error && <p className="text-red-400">{error}</p>}

                {role === "creator" && (<div className="space-y-2">

                    <div className="p-6 overflow-y-auto">
                        <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
                        <p className="whitespace-pre-line mb-4">{problem.problemstatement}</p>
                        {problem?.constraints && (<><h3 className="font-semibold mt-4">Constraints</h3>
                        <p className="whitespace-pre-line">{problem.constraints}</p></>)
                        }
                        {problem?.visiblecases && (<div>
                        <h3 className="font-semibold mt-4">Visible Test Cases</h3>
                            {problem.visiblecases?.map((tc, index) => (
                                <div key={tc._id} className="border m-5 p-5">
                                    <h4>Testcase {index + 1}</h4>

                                    <div>
                                        <strong>Input:</strong>
                                        <pre>{tc.input}</pre>
                                    </div>

                                    <div>
                                        <strong>Output:</strong>
                                        <pre>{tc.output}</pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                        {problem?.hiddencases && (<div>
                        <h3 className="font-semibold mt-4">Visible Test Cases</h3>
                            {problem.hiddencases?.map((tc, index) => (
                                <div key={tc._id} className="border m-5 p-5">
                                    <h4>Testcase {index + 1}</h4>

                                    <div>
                                        <strong>Input:</strong>
                                        <pre>{tc.input}</pre>
                                    </div>

                                    <div>
                                        <strong>Output:</strong>
                                        <pre>{tc.output}</pre>
                                    </div>
                                </div>
                            ))}
                        </div>)}
                    </div>
                </div>)}
                {problem && (
                <div className="flex justify-center">
                    <button
                        onClick={() => handleDelete(problem._id)}
                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 text-white"
                    >
                        Delete
                    </button>
                </div>)}
            </div >
        </>
    );
}

export default Problem;