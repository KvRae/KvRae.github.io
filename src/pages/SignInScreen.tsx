import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import DesktopScreen from "./DesktopScreen.tsx";
import avatarImage from "../assets/avatar-pixels.png";
import PasswordInput from "../components/PasswordInput.tsx";
import TerminalButton from "../components/TerminalButton.tsx";
import CrackTerminal from "../components/windows/desktop/CrackTerminal.tsx";
import * as React from "react";

export default function SignInScreen() {
    const [authenticated, setAuthenticated] = useState(false);
    const [hrBypass, setHrBypass] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [terminalOpen, setTerminalOpen] = useState(false);
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

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        if (!authenticated) {
            document.body.style.overflow = 'hidden';
            document.body.style.overscrollBehavior = 'none';
            document.documentElement.style.overscrollBehavior = 'none';

            let lastTouchEnd = 0;
            const preventZoom = (e: TouchEvent) => {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) e.preventDefault();
                lastTouchEnd = now;
            };

            document.addEventListener('touchend', preventZoom, { passive: false });

            return () => {
                document.body.style.overflow = 'auto';
                document.body.style.overscrollBehavior = 'auto';
                document.documentElement.style.overscrollBehavior = 'auto';
                document.removeEventListener('touchend', preventZoom);
            };
        }
    }, [authenticated]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const letters = "KVRAEkvrae";
        const fontSize = window.innerWidth < 640 ? 12 : 16;
        const columns = Math.floor(width / fontSize);
        const drops = new Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(10, 10, 5, 0.08)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "rgba(255, 215, 0, 0.35)";
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

    if (authenticated) return <DesktopScreen hrBypass={hrBypass} />;

    return (
        <div className="relative h-screen w-screen inset-0 overflow-hidden bg-[#0b0b0d]">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full opacity-60 blur-[1px]"
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6">
                <img
                    src={avatarImage}
                    alt="Avatar"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-2 border border-yellow-400/40 shadow-[0_0_15px_rgba(255,215,0,0.2)] pointer-events-none select-none"
                />
                <div className="text-yellow-200 text-base sm:text-lg mb-4 sm:mb-6 tracking-wide drop-shadow-[0_0_6px_rgba(255,255,100,0.5)]">
                    Kvrae
                </div>

                <div
                    className="flex items-center space-x-2 mb-2 w-full max-w-[16rem]"
                    onKeyDown={handleKeyPress}
                >
                    <PasswordInput
                        password={password}
                        setPassword={(val) => {
                            setPassword(val);
                            setError("");
                        }}
                    />
                    <button
                        onClick={handleLogin}
                        className="px-2 py-2 bg-yellow-500 rounded hover:bg-yellow-400 active:bg-yellow-600 text-black font-semibold flex items-center justify-center transition shadow-[0_0_8px_rgba(255,215,0,0.5)] touch-manipulation shrink-0 cursor-pointer"
                        aria-label="Login"
                    >
                        <FiArrowRight size={20} />
                    </button>
                </div>

                {error && (
                    <div className="text-red-400 text-xs sm:text-sm mb-2 animate-pulse">
                        {error}
                    </div>
                )}

                <div className="text-gray-400 text-xs sm:text-sm cursor-pointer relative group mb-4 sm:mb-6 touch-manipulation">
                    Do you want a hint?
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity bg-gray-800 text-yellow-100 text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none">
                        look for a tool below...
                    </span>
                </div>

                {/* Terminal Button & HR Button */}
                <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
                    <TerminalButton onClick={() => setTerminalOpen(true)} />
                    <button
                        onClick={() => {
                            setHrBypass(true);
                            setAuthenticated(true);
                        }}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-black font-bold text-[14px] sm:text-xs flex flex-col items-center justify-center leading-tight transition shadow-[0_0_8px_rgba(255,215,0,0.5)] touch-manipulation cursor-pointer"
                        title="HR Portal - No password needed!">
                        <span>I'm</span>
                        <span>HR</span>
                    </button>
                </div>
            </div>

            {/* Terminal Modal */}
            {terminalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <CrackTerminal onClose={() => setTerminalOpen(false)} />
                </div>
            )}
        </div>
    );
}
