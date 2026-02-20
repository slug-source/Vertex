import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const CreateProblem = () => {
    const navigate = useNavigate(); 
    const [form, setForm] = useState({
        title: "",
        problemstatement: "",
        constraints: "",
        visiblecases: "",
        hiddencases: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            visibleCases: JSON.parse(form.visiblecases || "[]"),
            hiddenCases: JSON.parse(form.hiddencases || "[]")
        };
        console.log(payload)
        await api.post('/problem', payload);
        navigate("/home");
    };

    return (
        <>
        <Navbar />
        <div className="bg-black">
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto p-8 rounded-xl shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-white text-center">Create New Problem</h2>

                {/* Title */}
                <div>
                    <label className="text-white mb-1 block">Title</label>
                    <input
                        name="title"
                        placeholder="Enter problem title"
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-gray-400"
                        required
                    />
                </div>

                {/* Problem Statement */}
                <div>
                    <label className="text-white mb-1 block">Problem Statement</label>
                    <textarea
                        name="problemstatement"
                        placeholder="Describe the problem"
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-gray-400 resize-none"
                        rows={4}
                        required
                    />
                </div>

                {/* Constraints */}
                <div>
                    <label className="text-white mb-1 block">Constraints</label>
                    <textarea
                        name="constraints"
                        placeholder="Enter constraints (one per line)"
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-gray-400 resize-none"
                        rows={2}
                    />
                </div>

                {/* Visible Test Cases */}
                <div>
                    <label className="text-white mb-1 block">Visible Cases (JSON)</label>
                    <textarea
                        name="visiblecases"
                        placeholder='[{"input":"...","output":"..."}]'
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-gray-400 font-mono resize-none"
                        rows={3}
                    />
                </div>

                {/* Hidden Test Cases */}
                <div>
                    <label className="text-white mb-1 block">Hidden Cases (JSON)</label>
                    <textarea
                        name="hiddencases"
                        placeholder='[{"input":"...","output":"..."}]'
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-gray-400 font-mono resize-none"
                        rows={3}
                    />
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
                    >
                        Create Problem
                    </button>
                </div>
            </form>
        </div>
        </>
    );
}

export default CreateProblem;
