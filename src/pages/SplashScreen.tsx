// src/SplashScreen.tsx
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Desktop from "./Desktop";
import avatarImage from '../assets/avatar-pixels.png';
import PasswordInput from "../components/PasswordInput.tsx";

export default function SplashScreen() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const correctPassword = "Kvrae"; // password is your name

    const handleLogin = () => {
        if (password === correctPassword) {
            setAuthenticated(true);
        } else {
            setError("Incorrect password");
            setPassword("");
        }
    };

    if (authenticated) return <Desktop />;

    return (
        <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center">
            <img src={avatarImage} alt="Avatar" className="w-32 h-32 rounded-full mb-2" />
            <div className="text-white text-lg mb-6">Kvrae</div>

            <div className="flex items-center space-x-2 mb-2">
                <PasswordInput
                    password={password}
                    setPassword={(val) => { setPassword(val); setError(""); }}
                />
                <button
                    onClick={handleLogin}
                    className="px-2 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white flex items-center justify-center"
                >
                    <FiArrowRight size={20} />
                </button>
            </div>

            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

            <div className="text-gray-400 text-sm cursor-pointer relative group">
                Do you want a hint?
                <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1">
                    It's my username
                </span>
            </div>
        </div>
    );
}