import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import DesktopScreen from "./DesktopScreen.tsx";
import avatarImage from "../assets/avatar-pixels.png";
import PasswordInput from "../components/PasswordInput.tsx";
import TerminalButton from "../components/TerminalButton.tsx";

export default function SplashScreen() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const correctPassword = "Kvrae";

    const handleLogin = () => {
        if (password === correctPassword) {
            setAuthenticated(true);
        } else {
            setError("Incorrect password");
            setPassword("");
        }
    };

    // Kvrae letters background animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Use only K, V, R, A, E (uppercase & lowercase for variation)
        const letters = "KVRAEkvrae";
        const fontSize = 16;
        const columns = Math.floor(width / fontSize);
        const drops = new Array(columns).fill(1);

        const draw = () => {
            // Soft, cool background overlay
            ctx.fillStyle = "rgba(10, 20, 25, 0.08)";
            ctx.fillRect(0, 0, width, height);

            // Gentle teal-blue color for the falling letters
            ctx.fillStyle = "rgba(0, 255, 200, 0.35)";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const intervalId = setInterval(draw, 50);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (authenticated) return <DesktopScreen />;

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-[#0b0b0d]">
            {/* Animated Kvrae background */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full opacity-60 blur-[1px]"
            />

            {/* Login content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <img
                    src={avatarImage}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full mb-2 border border-[#00bcd4]/30 shadow-lg"
                />
                <div className="text-[#ccfaff] text-lg mb-6 tracking-wide">Kvrae</div>

                <div className="flex items-center space-x-2 mb-2">
                    <PasswordInput
                        password={password}
                        setPassword={(val) => {
                            setPassword(val);
                            setError("");
                        }}
                    />
                    <button
                        onClick={handleLogin}
                        className="px-2 py-2 bg-[#007bff] rounded hover:bg-[#006ae0] text-white flex items-center justify-center transition"
                    >
                        <FiArrowRight size={20} />
                    </button>
                </div>

                {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

                <div className="text-gray-400 text-sm cursor-pointer relative group">
                    Do you want a hint?
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1">
            look for a tool below...
          </span>
                </div>

                <TerminalButton />
            </div>
        </div>
    );
}
