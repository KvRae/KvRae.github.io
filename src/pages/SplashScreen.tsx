import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import DesktopScreen from "./DesktopScreen.tsx";
import avatarImage from "../assets/avatar-pixels.png";
import PasswordInput from "../components/PasswordInput.tsx";
import TerminalButton from "../components/TerminalButton.tsx";
import * as React from "react";

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

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleLogin();
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

                if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
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
        <div className="relative h-screen w-screen inset-0 overflow-hidden bg-[#0b0b0d]">
            {/* Animated Kvrae background */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full opacity-60 blur-[1px]"
            />

            {/* Login content - This container holds all the main login elements */}
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
                        className="px-2 py-2 bg-yellow-500 rounded hover:bg-yellow-400 active:bg-yellow-600 text-black font-semibold flex items-center justify-center transition shadow-[0_0_8px_rgba(255,215,0,0.5)] touch-manipulation shrink-0"
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

                <div className="text-gray-400 text-xs sm:text-sm cursor-pointer relative group touch-manipulation">
                    Do you want a hint?
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity bg-gray-800 text-yellow-100 text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none">
                look for a tool below...
            </span>
                </div>

                {/*
            NOTE: I removed the original empty div with mb-4/6 here
            because the TerminalButton is moving outside this container
        */}
            </div>

            {/* ✅ FIX APPLIED HERE:
        1. Changed 'absolute' to 'fixed'.
        2. Added 'z-20' to ensure it's on top of the background and content.
        3. Removed 'pb-[env(safe-area-inset-bottom)]' from the main content wrapper
           and adjusted the 'bottom' style here instead, making this element responsible
           for its own safe area spacing.

        This button will now stick to the viewport, respecting the safe area.
    */}
            <div
                className="w-full max-w-xs sm:max-w-sm mx-auto **fixed** left-0 right-0 **z-20** px-4"
                style={{ bottom: `calc(0.5rem + env(safe-area-inset-bottom))` }}
            >
                <TerminalButton />
            </div>
        </div>
    );
}
