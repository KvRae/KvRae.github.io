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
                return prev + 2; // Adjust speed here
            });
        }, 80); // 80ms * 50 steps ≈ 4 seconds

        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <div className="h-screen w-screen bg-gray-900  flex flex-col items-center justify-center text-green-400 font-mono">
            <div className="text-lg mb-4">Booting KvR-OS...</div>
            <div className="w-3/4 bg-gray-700 h-2 rounded overflow-hidden">
                <div
                    className="bg-green-400 h-full transition-all duration-75"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-2 text-sm">{progress}%</div>
            <div className="mt-6 text-gray-500 text-xs">
                Checking drives...<br />
                Initializing hardware...
            </div>
        </div>
    );
}
