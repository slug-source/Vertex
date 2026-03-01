import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios"
import { getRole } from "../utils/auth";
import { motion } from "framer-motion";

const Problem = () => {
  const { id } = useParams();
  const role = getRole();
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

      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-indigo-600 opacity-15 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-purple-600 opacity-15 blur-[130px] rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
              {error}
            </div>
          )}

          {role === "creator" && problem && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden"
            >

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-white/10">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {problem.title}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Creator view • Manage your problem
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const ok = window.confirm(
                        "Delete this problem permanently? This cannot be undone."
                      );
                      if (ok) handleDelete(problem._id);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 transition font-semibold shadow-lg"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>


              <div className="px-6 py-6 space-y-8">
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

                <section>
                  <h2 className="text-lg font-semibold mb-3">Visible Test Cases</h2>

                  {problem?.visiblecases?.length ? (
                    <div className="space-y-4">
                      {problem.visiblecases.map((tc, index) => (
                        <div
                          key={tc._id || index}
                          className="rounded-2xl bg-black/30 border border-white/10 p-5"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">
                              Testcase {String(index + 1).padStart(2, "0")}
                            </h3>
                            <span className="text-xs text-gray-400">Visible</span>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-400 mb-2">Input</p>
                              <pre className="rounded-xl bg-black/60 border border-white/10 p-4 overflow-auto text-sm font-mono">
                                {tc.input}
                              </pre>
                            </div>

                            <div>
                              <p className="text-sm text-gray-400 mb-2">Output</p>
                              <pre className="rounded-xl bg-black/60 border border-white/10 p-4 overflow-auto text-sm font-mono">
                                {tc.output}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-black/30 border border-white/10 p-5 text-gray-400">
                      No visible test cases added.
                    </div>
                  )}
                </section>

                <section>
                  <h2 className="text-lg font-semibold mb-3">Hidden Test Cases</h2>

                  {problem?.hiddencases?.length ? (
                    <div className="space-y-4">
                      {problem.hiddencases.map((tc, index) => (
                        <div
                          key={tc._id || index}
                          className="rounded-2xl bg-black/30 border border-white/10 p-5"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">
                              Testcase {String(index + 1).padStart(2, "0")}
                            </h3>
                            <span className="text-xs text-gray-400">Hidden</span>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-400 mb-2">Input</p>
                              <pre className="rounded-xl bg-black/60 border border-white/10 p-4 overflow-auto text-sm font-mono">
                                {tc.input}
                              </pre>
                            </div>

                            <div>
                              <p className="text-sm text-gray-400 mb-2">Output</p>
                              <pre className="rounded-xl bg-black/60 border border-white/10 p-4 overflow-auto text-sm font-mono">
                                {tc.output}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-black/30 border border-white/10 p-5 text-gray-400">
                      No hidden test cases added.
                    </div>
                  )}
                </section>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default Problem;