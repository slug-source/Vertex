import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="w-full flex items-center justify-between px-8 py-4 bg-transparent">
            <div>
                <button onClick={() => { navigate('/home') }} className="px-4 py-2 rounded-lg hover:bg-gray-700">Problems</button>
            </div>
            <div>
                <button onClick={() => { navigate('/profile') }} className="px-4 py-2 rounded-lg hover:bg-gray-700">My Profile</button>
                <button onClick={logout} className="px-4 py-2 rounded-lg hover:bg-gray-700"> LogOut </button>
            </div>
        </header>
    )
}



