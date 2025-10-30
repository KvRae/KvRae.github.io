import { useEffect, useRef, useState } from "react";

interface BootScreenProps {
    onFinish: () => void;
}

export default function BootScreen({ onFinish }: BootScreenProps) {
    const [progress, setProgress] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Progress logic
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

    // Glowing grid animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const gridSize = 40;
        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(10, 20, 10, 0.9)";
            ctx.fillRect(0, 0, width, height);

            for (let x = 0; x < width; x += gridSize) {
                for (let y = 0; y < height; y += gridSize) {
                    const brightness =
                        Math.sin((x + time) * 0.02) * Math.cos((y + time) * 0.02);
                    const glow = Math.floor(100 + 80 * brightness);
                    ctx.fillStyle = `rgba(0, ${glow + 100}, 80, 0.5)`;
                    ctx.fillRect(x, y, 2, 2);
                }
            }

            time += 2;
            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-black text-green-400 font-mono flex flex-col items-center justify-center">
            {/* Animated glowing grid background */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full opacity-70 blur-[1px]"
            />

            {/* Boot text and progress bar */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-lg mb-4">Booting KvR-OS...</div>

                <div className="w-3/4 bg-gray-800 h-2 rounded overflow-hidden shadow-inner">
                    <div
                        className="bg-green-400 h-full transition-all duration-75"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-2 text-sm">{progress}%</div>

                <div className="mt-6 text-gray-500 text-xs text-center">
                    Checking drives...<br />
                    Initializing hardware...
                </div>
            </div>
        </div>
    );
}
