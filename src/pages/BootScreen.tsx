import { useEffect, useState } from "react";

interface BootScreenProps {
    onFinish: () => void;
}

export default function BootScreen({ onFinish }: BootScreenProps) {
    const [progress, setProgress] = useState(0);

    // Prevent unwanted scroll behaviors
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehavior = 'none';
        document.documentElement.style.overscrollBehavior = 'none';

        // Prevent zoom on double tap on mobile
        let lastTouchEnd = 0;
        const preventZoom = (e: TouchEvent) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        };

        document.addEventListener('touchend', preventZoom, { passive: false });

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.overscrollBehavior = 'auto';
            document.documentElement.style.overscrollBehavior = 'auto';
            document.removeEventListener('touchend', preventZoom);
        };
    }, []);

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
        <div className="relative h-screen w-screen inset-0 flex flex-col items-center justify-center font-mono overflow-hidden bg-[#0b0b0d]">
            {/* Animated background gradient (subtle dark gold tone) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0d] via-[#1a1508] to-[#0f0c05] animate-gradientMove opacity-80" />

            <div className="text-yellow-300 relative z-10 flex flex-col items-center px-4 sm:px-6 w-full max-w-md">
                 <div className="glow-svg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="127"
        height="131"
        viewBox="0 0 127 131"
        fill="none"
      >
        <rect
          x="3.5"
          y="3.5"
          width="119.896"
          height="123.48"
          rx="10.5"
          fill="#090905"
        />
        <rect
          x="3.5"
          y="3.5"
          width="119.896"
          height="123.48"
          rx="10.5"
          stroke="#F4CE14"
          strokeWidth="7"
        />
        <path
          d="M36.92 23C39.1291 23 40.92 24.7909 40.92 27V41.3111C40.92 42.372 40.4986 43.3894 39.7484 44.1396L29.8284 54.0596C27.3086 56.5794 23 54.7948 23 51.2311V27C23 24.7909 24.7909 23 27 23H36.92ZM98.136 101.848C100.241 103.906 98.7836 107.48 95.8401 107.48H79.9127C79.0355 107.48 78.1881 107.162 77.528 106.584L51.8124 80.7531C50.2514 79.185 47.7138 79.1822 46.1492 80.7468L42.0916 84.8044C41.3414 85.5546 40.92 86.572 40.92 87.6329V103.48C40.92 105.689 39.1291 107.48 36.92 107.48H27C24.7909 107.48 23 105.689 23 103.48V80.2089C23 79.148 23.4214 78.1306 24.1716 77.3804L51.7548 49.7972C51.7838 49.7683 51.8 49.729 51.8 49.6881C51.8 49.6471 51.8164 49.6077 51.8454 49.5788L77.3816 24.1648C78.1312 23.4188 79.1457 23 80.2032 23H94.2391C97.8028 23 99.5874 27.3086 97.0676 29.8284L64.4795 62.4165C62.9193 63.9767 62.9171 66.5055 64.4745 68.0684L98.136 101.848Z"
          fill="#F4CE14"
        />
      </svg>
    </div>

                <div className="text-base sm:text-lg mb-3 sm:mb-4 drop-shadow-[0_0_6px_rgba(255,215,0,0.5)] text-center">
                    Booting KvR-OS...
                </div>

                <div className="w-full sm:w-3/4 bg-[#1f1f23] h-2 sm:h-2.5 rounded overflow-hidden shadow-inner">
                    <div
                        className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 h-full transition-all duration-75 shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-2 text-yellow-400 text-xs sm:text-sm drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">
                    {progress}%
                </div>

                <div className="mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
                    Checking drives...<br />
                    Initializing hardware...
                </div>
            </div>
        </div>
    );
}
