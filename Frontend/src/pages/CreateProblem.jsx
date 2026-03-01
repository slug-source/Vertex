import { useState, useMemo } from "react";
import api from "../utils/axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const emptyTC = () => ({ input: "", output: "" });

export default function CreateProblem() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        problemstatement: "",
        constraints: "",
    });

    const [visible, setVisible] = useState([emptyTC()]);
    const [hidden, setHidden] = useState([emptyTC()]);
    const [advanced, setAdvanced] = useState(false);

    const [visibleJson, setVisibleJson] = useState("");
    const [hiddenJson, setHiddenJson] = useState("");

    const visibleBuilt = useMemo(() => visible.filter(tc => tc.input.trim() || tc.output.trim()), [visible]);
    const hiddenBuilt = useMemo(() => hidden.filter(tc => tc.input.trim() || tc.output.trim()), [hidden]);

    const onField = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const updateTC = (setFn, index, key, value) => {
        setFn((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [key]: value };
            return copy;
        });
    };

    const addTC = (setFn) => setFn((prev) => [...prev, emptyTC()]);
    const removeTC = (setFn, index) =>
        setFn((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== index));

    const parseJsonSafe = (text) => {
        if (!text.trim()) return [];
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error("JSON must be an array.");
        return parsed.map((x) => ({ input: String(x.input ?? ""), output: String(x.output ?? "") }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let visiblecases = visibleBuilt;
        let hiddencases = hiddenBuilt;

        const payload = {
            ...form,
            visiblecases,
            hiddencases,
        };

        await api.post('/problem', payload);
        navigate("/home");
    };

    const TestcaseSection = ({ title, subtitle, data, setData, badge }) => (
        <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10 text-gray-300">
                            {badge}
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => addTC(setData)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold shadow-lg"
                >
                    + Add
                </motion.button>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {data.map((tc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-2xl bg-black/30 border border-white/10 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm text-gray-300">
                                    Testcase {String(idx + 1).padStart(2, "0")}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => removeTC(setData, idx)}
                                    className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-gray-200"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400">Input</label>
                                    <textarea
                                        value={tc.input}
                                        onChange={(e) => updateTC(setData, idx, "input", e.target.value)}
                                        rows={4}
                                        className="mt-2 w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono focus:outline-none focus:border-indigo-500 resize-none"
                                        placeholder="e.g. 5\n1 2 3 4 5"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400">Expected Output</label>
                                    <textarea
                                        value={tc.output}
                                        onChange={(e) => updateTC(setData, idx, "output", e.target.value)}
                                        rows={4}
                                        className="mt-2 w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono focus:outline-none focus:border-indigo-500 resize-none"
                                        placeholder="e.g. 15"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );

    return (
        <>
            <Navbar />

            <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
                <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-indigo-600 opacity-15 blur-[130px] rounded-full" />
                <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-purple-600 opacity-15 blur-[130px] rounded-full" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-10">
                    <motion.form
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        onSubmit={handleSubmit}
                        className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="px-6 py-5 border-b border-white/10">
                            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                                Create New Problem
                            </h2>
                        </div>

                        <div className="px-6 py-6 space-y-6">
                            <div className="rounded-2xl bg-black/30 border border-white/10 p-5">
                                <label className="text-sm text-gray-300">Title</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={onField}
                                    required
                                    placeholder="Enter problem title"
                                    className="mt-2 w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            
                            <div className="rounded-2xl bg-black/30 border border-white/10 p-5">
                                <label className="text-sm text-gray-300">Problem Statement</label>
                                <textarea
                                    name="problemstatement"
                                    value={form.problemstatement}
                                    onChange={onField}
                                    required
                                    rows={6}
                                    placeholder="Describe the problem clearly. Include input/output format if needed."
                                    className="mt-2 w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 focus:outline-none focus:border-indigo-500 resize-none"
                                />
                            </div>

                            <div className="rounded-2xl bg-black/30 border border-white/10 p-5">
                                <label className="text-sm text-gray-300">Constraints (optional)</label>
                                <textarea
                                    name="constraints"
                                    value={form.constraints}
                                    onChange={onField}
                                    rows={3}
                                    placeholder="e.g. 1 ≤ N ≤ 2e5"
                                    className="mt-2 w-full rounded-xl bg-black/50 border border-white/10 px-4 py-3 focus:outline-none focus:border-indigo-500 resize-none"
                                />
                            </div>

                            <div className="grid gap-6">
                                <TestcaseSection
                                    title="Visible Test Cases"
                                    subtitle="Shown to users while solving."
                                    badge={`${visibleBuilt.length} cases`}
                                    data={visible}
                                    setData={setVisible}
                                />

                                <TestcaseSection
                                    title="Hidden Test Cases"
                                    subtitle="Used for final judging (not shown to users)."
                                    badge={`${hiddenBuilt.length} cases`}
                                    data={hidden}
                                    setData={setHidden}
                                />
                            </div>

                            <div className="flex items-center justify-center gap-3 pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="submit"
                                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold shadow-lg"
                                >
                                    Create Problem
                                </motion.button>
                            </div>
                        </div>
                    </motion.form>
                </div>
            </div>
        </>
    );
}