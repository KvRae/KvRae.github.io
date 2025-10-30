import { useEffect, useRef, useState } from "react";

interface BootScreenProps {
    onFinish: () => void;
}

export default function BootScreen({ onFinish }: BootScreenProps) {
    const [progress, setProgress] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    onFinish();
                    return 100;
                }
                return prev + 2;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [onFinish]);

    // Matrix background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        const letters = "01";
        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops = new Array(columns).fill(1);

        const draw = () => {
            // Slightly more opaque to dim the background
            ctx.fillStyle = "rgba(10, 20, 10, 0.1)";
            ctx.fillRect(0, 0, width, height);

            // Softer green
            ctx.fillStyle = "rgba(0, 255, 120, 0.4)";
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

        const intervalId = setInterval(draw, 33);

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

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a]">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full opacity-60 blur-[1px]"
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-[#9effb0] font-mono">
                <div className="text-lg mb-4 tracking-wide">Booting KvR-OS...</div>
                <div className="w-3/4 bg-[#1a1a1a] h-2 rounded overflow-hidden shadow-md">
                    <div
                        className="bg-[#00ff99] h-full transition-all duration-75"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-2 text-sm text-[#8affb0]">{progress}%</div>
                <div className="mt-6 text-[#70ff98]/70 text-xs text-center">
                    Checking drives...<br />
                    Initializing hardware...
                </div>
            </div>
        </div>
    );
}
