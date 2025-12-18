import { useState } from "react";

interface PacmanWindowProps {
    onClose: () => void;
    onMinimize?: () => void;
    isMinimized?: boolean;
}

export default function PacmanWindow({ onClose, onMinimize, isMinimized = false }: PacmanWindowProps) {
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    if (isMinimized) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50 p-0">

            {/* Main Window Container */}
            <div className={`bg-[#0d0d0e]/95 shadow-[0_0_8px_rgba(255,215,0,0.1)] text-yellow-100 flex flex-col border border-yellow-700/30 rounded-lg transition-all duration-300 ${
                isMaximized ? 'w-full h-full' : 'w-full h-full'
            }`}>

                {/* Header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-800/30 flex-shrink-0 rounded-t-lg">
                    <div
                        className="w-3 h-3 bg-red-600 rounded-full cursor-pointer hover:bg-red-700 transition"
                        onClick={onClose}
                    ></div>
                    <div
                        className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition"
                        onClick={onMinimize}
                    ></div>
                    <div
                        className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
                        onClick={toggleMaximize}
                    ></div>
                    <span className="ml-2 font-semibold text-yellow-300">Kav-Man</span>
                </div>

                {/* Content Area */}
                <div className="p-0 flex-grow">
                    <iframe
                        src="https://kvrae.github.io/Kav-man/"
                        title="Embedded Website"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        className="bg-[#121212] rounded-b-lg"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
