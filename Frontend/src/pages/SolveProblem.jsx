import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios.js"
import { getRole, getToken } from "../utils/auth.js";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";

// const SolveProblem = () => {
//     const { id } = useParams();
//     const role = getRole();

//     const [code, setCode] = useState("");
//     const [tab, setTab] = useState("custominput");
//     const [submitResult, setSubmitResult] = useState("");
//     const [language, setLanguage] = useState("javascript");
//     const [problem, setProblem] = useState([]);
//     const [error, setError] = useState("");
//     const [customInput, setCustomInput] = useState("");
//     const [runOutput, setRunOutput] = useState("");
//     const [passedCount, setPassedCount] = useState(null);

//     useEffect(() => {
//         const getProblemById = async () => {
//             try {
//                 const res = await api.get(`/problem/${id}`);
//                 setProblem(res.data.result);
//             } catch (err) {
//                 console.log(err)
//                 setError(err.response?.data?.message || "Error fetching problems");
//             }
//         }; getProblemById()
//     }, []);
//     const runCode = async () => {
//         try {
//             if (!code.trim()) {
//                 console.error("Code doesn't exist")
//                 return;
//             }
//             let input = customInput
//             const payload = { code, language, input }
//             const res = await api.post(`/problem/run`, payload);
//             setRunOutput(Array.isArray(res.data.result)
//                 ? res.data.result.join("\n")
//                 : res.data.result);
//             setTab("results");

//         } catch (err) {
//             console.log(err)
//             setError(err.response?.data?.message || "Error fetching problems");
//         }
//     }
//     const submitCode = async () => {
//         try {
//             if (!code.trim()) {
//                 console.error("Code doesn't exist")
//                 return;
//             }
//             const payload = { code, language }
//             const res = await api.post(`/problem/${id}/submit`, payload);
//             console.log(res.data.result)
//             setSubmitResult(res.data.result);
//             setTab("results");
//         } catch (err) {
//             console.log(err)
//             setError(err.response?.data?.message || "Error fetching problems");
//         }
//     }
//     return (
//         <>
//             <div className="h-screen flex bg-black text-white">

//                 <div className="w-1/2 border-r t p-6 overflow-y-auto">
//                     <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
//                     <p className="whitespace-pre-line mb-4">{problem.problemstatement}</p>
//                     <h3 className="font-semibold mt-4">Constraints</h3>
//                     <p className="whitespace-pre-line">{problem.constraints}</p>
//                     <h3 className="font-semibold mt-4">Test Cases</h3>
//                     <div>
//                         {problem.visiblecases?.map((tc, index) => (
//                             <div key={tc._id} className="border m-5 p-5">
//                                 <h4>Testcase {index + 1}</h4>

//                                 <div>
//                                     <strong>Input:</strong>
//                                     <pre>{tc.input}</pre>
//                                 </div>

//                                 <div>
//                                     <strong>Output:</strong>
//                                     <pre>{tc.output}</pre>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="w-1/2 flex flex-col">

//                     <div className="flex-1 p-4 flex flex-col border-b">
//                         <div className="flex items-center justify-left mb-2">
//                             <span className="text-sm text-gray-600p pr-3">Language</span>

//                             <select
//                                 value={language}
//                                 onChange={(e) => setLanguage(e.target.value)}
//                                 className="border rounded px-2 py-1 text-sm bg-gray-100 text-black"
//                             >
//                                 <option value="javascript">JavaScript</option>
//                                 <option value="python">Python</option>
//                                 <option value="cpp">C++</option>
//                             </select>
//                         </div>

//                         <textarea
//                             className="flex-1 input font-mono caret-white text-sm p-0 border focus:outline-none p-1"
//                             placeholder={`Write your ${language} solution here...`}
//                             value={code}
//                             onChange={(e) => setCode(e.target.value)}
//                         />

//                         <div className="flex gap-2 mt-3">
//                             <button onClick={runCode} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-500 hover:scale-102">
//                                 Run
//                             </button>
//                             <button onClick={submitCode} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:scale-102">
//                                 Submit
//                             </button>
//                         </div>
//                     </div>


//                     <div className="h-56 border-t flex flex-col">
//                         <div className="flex border-b">
//                             <button
//                                 onClick={() => setTab("custominput")}
//                                 className={`px-4 py-2 ${tab === "custominput" ? "border-b-2 border-black font-medium bg-gray-300 text-black" : ""
//                                     }`}
//                             >
//                                 Custom Input
//                             </button>
//                             <button
//                                 onClick={() => setTab("results")}
//                                 className={`px-4 py-2 ${tab === "results" ? "border-b-2 border-black font-medium bg-gray-300 text-black" : ""
//                                     }`}
//                             >
//                                 Results
//                             </button>
//                         </div>

//                         <div className="flex-1 overflow-y-auto p-4">
//                             {tab === "custominput" && (<div>
//                                 <h3>Custom Input</h3>
//                                 <textarea
//                                     placeholder="Enter your custom input here..."
//                                     value={customInput}
//                                     onChange={(e) => setCustomInput(e.target.value)}
//                                     rows={3}
//                                     className="border w-full"
//                                 />
//                             </div>
//                             )}

//                             {tab === "results" && (
//                                 <div>
//                                     {runOutput && (
//                                         <div>
//                                             <b>Output:</b>
//                                             <pre className="border w-full p-2 overflow-auto max-h-80 whitespace-pre">{runOutput}</pre>
//                                         </div>
//                                     )}

//                                     {submitResult && (
//                                         <div style={{ marginTop: "10px" }}>
//                                             <div>
//                                                 <b>Verdict:</b>{" "}
//                                                 <span
//                                                     style={{
//                                                         color: submitResult.verdict === "Accepted" ? "green" : "red",
//                                                         fontWeight: "bold",
//                                                     }}
//                                                 >
//                                                     {submitResult.verdict}
//                                                 </span>
//                                             </div>

//                                             <div>
//                                                 <b>Testcases Passed:</b>{" "}
//                                                 {submitResult.passed} 

//                                             {submitResult?.total && (<span>/{submitResult.total}</span>)}
//                                             </div>

//                                             {submitResult.error && submitResult.error.length > 0 && (
//                                                 <div style={{ marginTop: "10px" }}>
//                                                     <b>Error:</b>
//                                                     <pre className="border w-full p-2 overflow-auto max-h-60 whitespace-pre-wrap break-words bg-red-50 text-red-700">
//                                                         {submitResult.error.join("\n")}
//                                                     </pre>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}

//                                     {!runOutput && !submitResult && (
//                                         <p>No results yet. Run or Submit your code.</p>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>

//     );
// }

// export default SolveProblem;



// ✅ Assumptions you can change quickly:
// - token stored in localStorage as "token"
// - role stored in localStorage as "role" ("user" | "creator" | null)
// - API base url in VITE_API_URL
// - endpoints:
//    GET  /api/problems/:id
//    POST /api/run
//    POST /api/submit
//    POST /api/review
//
// If your endpoints differ, just edit the fetch URLs + request bodies below.

export default function SolvePage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const role = getRole();
    const token = getToken();
    const isUser = role === "user";


    const [problem, setProblem] = useState(null);
    const [error, setError] = useState("");

    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [tab, setTab] = useState("results");
    const [customInput, setCustomInput] = useState("");

    const [runLoading, setRunLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const [runOutput, setRunOutput] = useState("");
    const [submitResult, setSubmitResult] = useState(null);

    const [reviewText, setReviewText] = useState("");
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState("");

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
    }, [id]);
    const runCode = async () => {
        if (!problem) return;
        setRunLoading(true);
        setRunOutput("");
        setSubmitResult(null);
        setReviewText("");
        setReviewError("");

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
        } catch (e) {
            setRunOutput(e.message || "Run failed");
            setTab("results");
        } finally {
            setRunLoading(false);
        }
    };

    const submitCode = async () => {
        if (!problem || !isUser) return;
        setSubmitLoading(true);
        setSubmitResult(null);
        setRunOutput("");
        setReviewText("");
        setReviewError("");

        try {
            if (!code.trim()) {
                console.error("Code doesn't exist")
                return;
            }
            const payload = { code, language }
            const res = await api.post(`/problem/${id}/submit`, payload);
            setSubmitResult(res.data.result);
            setTab("results");
        } catch (e) {
            setSubmitResult({
                verdict: "Failed",
                passed: 0,
                total: problem?.hiddencases?.length || problem?.visiblecases?.length || undefined,
                error: [e.message || "Submit failed"],
            });
            setTab("results");
        } finally {
            setSubmitLoading(false);
        }
    };

    const reviewCode = async () => {
        if (!problem || !isUser) return;
        setReviewLoading(true);
        setReviewText("");
        setReviewError("");
        setRunOutput("");
        setSubmitResult(null);
        
        try {
            if (!code.trim()) {
                console.error("Code doesn't exist")
                return;
            }
            const payload = { code }
            const res = await api.post(`/problem/review`, payload);
            console.log(res)
            setReviewText(res.data.result);
            setTab("results");
        } 
        catch (e) {
            setReviewError(e.message || "Review failed");
            setTab("results");
        } finally {
            setReviewLoading(false);
        }
    };

    const Badge = ({ children }) => (
        <span className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10 text-gray-300">
            {children}
        </span>
    );

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
                <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-indigo-600 opacity-15 blur-[130px] rounded-full" />
                <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-purple-600 opacity-15 blur-[130px] rounded-full" />
                <div className="relative z-10 h-[calc(100vh-72px)] w-screen overflow-hidden">
                    {error && (
                        <div className="max-w-6xl mx-auto mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
                            {error}
                        </div>
                    )}

                    {!problem ? (
                        <div className="max-w-6xl mx-auto rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 text-gray-300">
                            Loading problem...
                        </div>
                    ) : (
                        <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25 }}
                                className="h-full rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                            >
                                <div className="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4">
                                    <h1 className="text-2xl font-semibold tracking-tight">{problem.title}</h1>
                                </div>

                                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                                    <section>
                                        <h2 className="text-lg font-semibold mb-3">Problem Statement</h2>
                                        <div className="rounded-2xl bg-black/30 border border-white/10 p-5 text-gray-200 leading-relaxed whitespace-pre-line">
                                            {problem.problemstatement}
                                        </div>
                                    </section>

                                    {problem?.constraints && (
                                        <section>
                                            <h2 className="text-lg font-semibold mb-3">Constraints</h2>
                                            <div className="rounded-2xl bg-black/30 border border-white/10 p-5 text-gray-200 whitespace-pre-line">
                                                {problem.constraints}
                                            </div>
                                        </section>
                                    )}

                                    {problem?.visiblecases?.length ? (
                                        <section>
                                            <div className="flex items-center justify-between mb-3">
                                                <h2 className="text-lg font-semibold">Visible Test Cases</h2>
                                            </div>

                                            <div className="space-y-4">
                                                {problem.visiblecases.map((tc, index) => (
                                                    <div
                                                        key={tc._id || index}
                                                        className="rounded-2xl bg-black/30 border border-white/10 p-5"
                                                    >
                                                        <div className="flex items-center justify-between mb-4">
                                                            <p className="font-semibold">
                                                                Testcase {String(index + 1).padStart(2, "0")}
                                                            </p>
                                                        </div>

                                                        <div className="grid sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-xs text-gray-400 mb-2">Input</p>
                                                                <pre className="rounded-xl bg-black/60 border border-white/10 p-4 overflow-auto text-sm font-mono whitespace-pre">
                                                                    {tc.input}
                                                                </pre>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-gray-400 mb-2">Output</p>
                                                                <pre className="rounded-xl bg-black/60 border border-white/10 p-4 overflow-auto text-sm font-mono whitespace-pre">
                                                                    {tc.output}
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    ) : (
                                        <section>
                                            <h2 className="text-lg font-semibold mb-3">Visible Test Cases</h2>
                                            <div className="rounded-2xl bg-black/30 border border-white/10 p-5 text-gray-400">
                                                No visible testcases.
                                            </div>
                                        </section>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: 0.05 }}
                                className="h-full rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                            >
                                <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-300">Language</span>
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                                        >
                                            <option value="javascript">JavaScript</option>
                                            <option value="python">Python</option>
                                            <option value="cpp">C++</option>
                                        </select>
                                    </div>

                                    {!isUser && (
                                        <span className="text-xs text-gray-400">
                                            Login as a user to <b className="text-gray-300">Submit</b> or get <b className="text-gray-300">AI Review</b>.
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 px-6 py-6 flex flex-col gap-4 border-b border-white/10">
                                    <textarea
                                        className="flex-1 rounded-2xl bg-black/40 border border-white/10 p-4 text-sm font-mono text-gray-100 focus:outline-none focus:border-indigo-500 resize-none"
                                        placeholder={`Write your ${language} solution here...`}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />

                                    <div className="flex flex-wrap gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={runCode}
                                            disabled={runLoading}
                                            className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition font-semibold disabled:opacity-60"
                                        >
                                            {runLoading ? "Running..." : "Run"}
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: isUser ? 1.03 : 1 }}
                                            whileTap={{ scale: isUser ? 0.97 : 1 }}
                                            onClick={submitCode}
                                            disabled={!isUser || submitLoading}
                                            title={!isUser ? "Login as a user to submit." : ""}
                                            className={`px-5 py-3 rounded-xl font-semibold shadow-lg transition disabled:opacity-70
                        ${isUser
                                                    ? "bg-indigo-600 hover:bg-indigo-500"
                                                    : "bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            {submitLoading ? "Submitting..." : "Submit"}
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: isUser ? 1.03 : 1 }}
                                            whileTap={{ scale: isUser ? 0.97 : 1 }}
                                            onClick={reviewCode}
                                            disabled={!isUser || reviewLoading}
                                            title={!isUser ? "Login as a user for AI Review." : ""}
                                            className={`px-5 py-3 rounded-xl font-semibold shadow-lg transition disabled:opacity-70
                        ${isUser
                                                    ? "bg-purple-600 hover:bg-purple-500"
                                                    : "bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            {reviewLoading ? "Reviewing..." : "AI Review"}
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="h-64 flex flex-col">
                                    <div className="flex border-b border-white/10">
                                        <button
                                            onClick={() => setTab("custominput")}
                                            className={`px-5 py-3 text-sm font-medium transition ${tab === "custominput"
                                                ? "bg-white/10 text-white"
                                                : "text-gray-400 hover:bg-white/5"
                                                }`}
                                        >
                                            Custom Input
                                        </button>
                                        <button
                                            onClick={() => setTab("results")}
                                            className={`px-5 py-3 text-sm font-medium transition ${tab === "results"
                                                ? "bg-white/10 text-white"
                                                : "text-gray-400 hover:bg-white/5"
                                                }`}
                                        >
                                            Results
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto px-6 py-5">
                                        {tab === "custominput" && (
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">Custom Input</h3>
                                                </div>
                                                <textarea
                                                    placeholder={`Type input exactly like stdin:\n5\n1 2 3 4 5`}
                                                    value={customInput}
                                                    onChange={(e) => setCustomInput(e.target.value)}
                                                    rows={6}
                                                    className="w-full rounded-2xl bg-black/40 border border-white/10 p-4 text-sm font-mono text-gray-100 focus:outline-none focus:border-indigo-500 resize-none"
                                                />
                                            </div>
                                        )}

                                        {tab === "results" && (
                                            <div className="space-y-5">
                                                {runOutput && (
                                                    <div className="rounded-2xl bg-black/30 border border-white/10 p-5">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <b>Output</b>
                                                        </div>
                                                        <pre className="rounded-xl bg-black/60 border border-white/10 p-4 overflow-auto max-h-64 whitespace-pre text-sm font-mono">
                                                            {runOutput}
                                                        </pre>
                                                    </div>
                                                )}

                                                {submitResult && (
                                                    <div className="rounded-2xl bg-black/30 border border-white/10 p-5">
                                                        <div className="flex items-center justify-between">
                                                            <b>Submission</b>
                                                        </div>

                                                        <div className="mt-3 space-y-2 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">Verdict:</span>
                                                                <span
                                                                    className={`font-semibold ${submitResult.verdict === "Accepted"
                                                                        ? "text-green-400"
                                                                        : "text-rose-400"
                                                                        }`}
                                                                >
                                                                    {submitResult.verdict}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">Passed:</span>
                                                                <span className="font-semibold text-gray-200">
                                                                    {submitResult.passed}
                                                                    {submitResult?.total ? `/${submitResult.total}` : ""}
                                                                </span>
                                                            </div>

                                                            {submitResult.error && submitResult.error.length > 0 && (
                                                                <div className="mt-3">
                                                                    <div className="text-gray-300 font-semibold mb-2">Error</div>
                                                                    <pre className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 overflow-auto max-h-52 whitespace-pre-wrap break-words text-sm font-mono text-rose-200">
                                                                        {Array.isArray(submitResult.error) ? submitResult.error.join("\n") : String(submitResult.error)}
                                                                    </pre>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {(reviewText || reviewError) && (
                                                    <div className="rounded-2xl bg-black/30 border border-white/10 p-5">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <b>AI Review</b>
                                                        </div>

                                                        {reviewError ? (
                                                            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-sm">
                                                                {reviewError}
                                                            </div>
                                                        ) : (
                                                            <textarea
                                                                value={reviewText}
                                                                readOnly
                                                                rows={8}
                                                                className="w-full rounded-2xl bg-black/40 border border-white/10 p-4 text-sm text-gray-200 resize-none"
                                                            />
                                                        )}
                                                    </div>
                                                )}

                                                {!runOutput && !submitResult && !reviewText && !reviewError && (
                                                    <div className="rounded-2xl bg-black/30 border border-white/10 p-6 text-gray-400">
                                                        No results yet. Run your code, submit for judging, or request an AI review.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}