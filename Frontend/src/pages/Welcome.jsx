import react from 'react-dom';
import { useNavigate } from 'react-router-dom';



const Welcome = () => {

    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex flex-col bg-black">
            {/* Navbar */}
            <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4">
                <div className="text-xl font-bold text-white">Vertex</div>
                <button onClick={() => { navigate('/login') }} className="px-4 py-2 text-white rounded-lg bg-gray-800 hover:bg-gray-700">Login</button>
            </header>


            {/* Background Image */}
            <div
                className="flex-1 bg-cover bg-center flex items-center"
                style={{ backgroundImage: "url('')" }}
            >
                <div className="ml-16 max-w-xl">
                    <h1 className="text-4xl font-bold mb-4 text-white">Practice. Compete. Improve.</h1>
                    <p className="text-gray-300 mb-6">
                        Solve coding problems, prepare for interviews, and track your progress.
                    </p>
                    <button onClick={() => { navigate('/signup') }} className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-black font-semibold">
                        Get Started
                    </button>
                </div>
            </div>


            {/* Footer */}
            <footer className="text-center text-sm text-gray-400 py-4 bg-gray-950">
                © {new Date().getFullYear()} Vertex. All rights reserved.
            </footer>
        </div>
    )
}

export default Welcome;