import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios.js"

const SolveProblem = () => {
    const { id } = useParams();
    const [code, setCode] = useState("");
    const [tab, setTab] = useState("custominput");
    const [submitResult, setSubmitResult] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [problem, setProblem] = useState([]);
    const [error, setError] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [runOutput, setRunOutput] = useState("");
    const [passedCount, setPassedCount] = useState(null);
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
    const runCode = async () => {
        try {
            if (!code.trim()) {
                console.error("Code doesn't exist")
                return;
            }
            let input = customInput
            const payload = { code, language, input }
            const res = await api.post(`/problem/run`, payload);
            setRunOutput(Array.isArray(res.data.result)
                ? res.data.result.join("\n")
                : res.data.result);
            setTab("results");

        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || "Error fetching problems");
        }
    }
    const submitCode = async () => {
        try {
            if (!code.trim()) {
                console.error("Code doesn't exist")
                return;
            }
            const payload = { code, language }
            const res = await api.post(`/problem/${id}/submit`, payload);
            console.log(res.data.result)
            setSubmitResult(res.data.result);
            setTab("results");
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || "Error fetching problems");
        }
    }
    return (
        <>
            <div className="h-screen flex bg-black text-white">

                <div className="w-1/2 border-r t p-6 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
                    <p className="whitespace-pre-line mb-4">{problem.problemstatement}</p>
                    <h3 className="font-semibold mt-4">Constraints</h3>
                    <p className="whitespace-pre-line">{problem.constraints}</p>
                    <h3 className="font-semibold mt-4">Test Cases</h3>
                    <div>
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
                </div>

                <div className="w-1/2 flex flex-col">

                    <div className="flex-1 p-4 flex flex-col border-b">
                        <div className="flex items-center justify-left mb-2">
                            <span className="text-sm text-gray-600p pr-3">Language</span>

                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="border rounded px-2 py-1 text-sm bg-gray-100 text-black"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="cpp">C++</option>
                            </select>
                        </div>

                        <textarea
                            className="flex-1 input font-mono caret-white text-sm p-0 border focus:outline-none p-1"
                            placeholder={`Write your ${language} solution here...`}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                        <div className="flex gap-2 mt-3">
                            <button onClick={runCode} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-500 hover:scale-102">
                                Run
                            </button>
                            <button onClick={submitCode} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:scale-102">
                                Submit
                            </button>
                        </div>
                    </div>


                    <div className="h-56 border-t flex flex-col">
                        <div className="flex border-b">
                            <button
                                onClick={() => setTab("custominput")}
                                className={`px-4 py-2 ${tab === "custominput" ? "border-b-2 border-black font-medium bg-gray-300 text-black" : ""
                                    }`}
                            >
                                Custom Input
                            </button>
                            <button
                                onClick={() => setTab("results")}
                                className={`px-4 py-2 ${tab === "results" ? "border-b-2 border-black font-medium bg-gray-300 text-black" : ""
                                    }`}
                            >
                                Results
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {tab === "custominput" && (<div>
                                <h3>Custom Input</h3>
                                <textarea
                                    placeholder="Enter your custom input here..."
                                    value={customInput}
                                    onChange={(e) => setCustomInput(e.target.value)}
                                    rows={3}
                                    className="border w-full"
                                />
                            </div>
                            )}

                            {tab === "results" && (
                                <div>
                                    {runOutput && (
                                        <div>
                                            <b>Output:</b>
                                            <pre className="border w-full p-2 overflow-auto max-h-80 whitespace-pre">{runOutput}</pre>
                                        </div>
                                    )}

                                    {submitResult && (
                                        <div style={{ marginTop: "10px" }}>
                                            <div>
                                                <b>Verdict:</b>{" "}
                                                <span
                                                    style={{
                                                        color: submitResult.verdict === "Accepted" ? "green" : "red",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {submitResult.verdict}
                                                </span>
                                            </div>

                                            <div>
                                                <b>Testcases Passed:</b>{" "}
                                                {submitResult.passed} 
                                            
                                            {submitResult?.total && (<span>/{submitResult.total}</span>)}
                                            </div>

                                            {submitResult.error && submitResult.error.length > 0 && (
                                                <div style={{ marginTop: "10px" }}>
                                                    <b>Error:</b>
                                                    <pre className="border w-full p-2 overflow-auto max-h-60 whitespace-pre-wrap break-words bg-red-50 text-red-700">
                                                        {submitResult.error.join("\n")}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {!runOutput && !submitResult && (
                                        <p>No results yet. Run or Submit your code.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SolveProblem;