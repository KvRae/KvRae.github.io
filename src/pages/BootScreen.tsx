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
            {/* Subtle animated overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0d] via-[#091119] to-[#0d0f12] animate-gradientMove opacity-80" />

            <div className="text-[#00ffc8] relative z-10 flex flex-col items-center">
                <div className="text-lg mb-4">Booting KvR-OS...</div>

                <div className="w-3/4 bg-[#1f1f23] h-2 rounded overflow-hidden">
                    <div
                        className="bg-[#00ffc8] h-full transition-all duration-75"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-2 text-[#00ffc8] text-sm">{progress}%</div>

                <div className="mt-6 text-gray-400 text-xs text-center">
                    Checking drives...<br />
                    Initializing hardware...
                </div>
            </div>
        </div>
    );
}
