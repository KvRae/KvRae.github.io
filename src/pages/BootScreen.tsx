import { useEffect, useState } from "react";

interface BootScreenProps {
    onFinish: () => void;
}

export default function BootScreen({ onFinish }: BootScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
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

    return (
        <div className="relative h-screen w-screen flex flex-col items-center justify-center font-mono overflow-hidden bg-[#0b0b0d]">
            {/* Animated background gradient (subtle dark gold tone) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0d] via-[#1a1508] to-[#0f0c05] animate-gradientMove opacity-80" />

            <div className="text-yellow-300 relative z-10 flex flex-col items-center">
                <div className="text-lg mb-4 drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]">
                    Booting KvR-OS...
                </div>

                <div className="w-3/4 bg-[#1f1f23] h-2 rounded overflow-hidden shadow-inner">
                    <div
                        className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 h-full transition-all duration-75 shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-2 text-yellow-400 text-sm drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">
                    {progress}%
                </div>

                <div className="mt-6 text-gray-400 text-xs text-center">
                    Checking drives...<br />
                    Initializing hardware...
                </div>
            </div>
        </div>
    );
}
