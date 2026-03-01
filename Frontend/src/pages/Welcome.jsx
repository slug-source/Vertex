// import react from 'react-dom';
// import { useNavigate } from 'react-router-dom';



// const Welcome = () => {

//     const navigate = useNavigate();

//     return (
//         <div className="relative min-h-screen flex flex-col bg-black">
//             {/* Navbar */}
//             <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4">
//                 <div className="text-xl font-bold text-white">Vertex</div>
//                 <button onClick={() => { navigate('/login') }} className="px-4 py-2 text-white rounded-lg bg-gray-800 hover:bg-gray-700">Login</button>
//             </header>


//             {/* Background Image */}
//             <div
//                 className="flex-1 bg-cover bg-center flex items-center"
//                 style={{ backgroundImage: "url('')" }}
//             >
//                 <div className="ml-16 max-w-xl">
//                     <h1 className="text-4xl font-bold mb-4 text-white">Practice. Compete. Improve.</h1>
//                     <p className="text-gray-300 mb-6">
//                         Solve coding problems, prepare for interviews, and track your progress.
//                     </p>
//                     <button onClick={() => { navigate('/signup') }} className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-black font-semibold">
//                         Get Started
//                     </button>
//                 </div>
//             </div>


//             {/* Footer */}
//             <footer className="text-center text-sm text-gray-400 py-4 bg-gray-950">
//                 © {new Date().getFullYear()} Vertex. All rights reserved.
//             </footer>
//         </div>
//     )
// }

// export default Welcome;


import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

            
            <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-600 opacity-20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>

            
            <header className="relative z-10 flex items-center justify-between px-10 py-6">
                <div className="text-2xl font-semibold tracking-wide">
                    Vertex
                </div>
                <div>
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 mx-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-2 mx-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition"
                >
                    Signup
                </button>
                </div>
            </header>

    
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-16 py-20">

                
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl"
                >
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Practice. Compete. <span className="text-indigo-400">Improve.</span>
                    </h1>

                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Solve real interview-level problems, track your progress,
                        and sharpen your coding skills with a powerful editor and
                        structured challenges.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/home")}
                        className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg transition"
                    >
                        Get Started
                    </motion.button>
                </motion.div>

            
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 lg:mt-0"
                >
                    <img
                        src="https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Coding workspace"
                        className="rounded-2xl shadow-2xl w-[500px] object-cover border border-white/10"
                    />
                </motion.div>
            </div>

            
            <footer className="relative z-10 text-center text-sm text-gray-500 py-8 border-t border-white/10">
                © {new Date().getFullYear()} Vertex. All rights reserved.
            </footer>
        </div>
    );
};

export default Welcome;