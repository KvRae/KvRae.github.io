// src/StartDrawer.tsx
import { useState } from "react";
import { FiPower } from "react-icons/fi";

interface StartDrawerProps {
    onLogout: () => void;
    buttonSize?: "sm" | "md";
}

export default function StartDrawer({ onLogout, buttonSize = "md" }: StartDrawerProps) {
    const [open, setOpen] = useState(false);

    const sizeClass = buttonSize === "sm" ? "w-10 h-10 text-xl" : "w-12 h-12 text-2xl";

    return (
        <div className="relative">
            {/* Logo button */}
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center justify-center ${sizeClass} bg-gray-800 rounded mr-2 border-2 border-yellow-400`}
            >
                <span className="font-bold text-yellow-400 relative">
                    K
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-yellow-400 rounded"></span>
                </span>
            </button>

            {/* Drawer */}
            {open && (
                <div className="absolute bottom-16 left-0 w-64 md:w-72 bg-gray-900 rounded shadow-lg p-4 flex flex-col space-y-4 z-50">
                    <div className="text-white font-semibold text-sm md:text-base">Credits</div>
                    <div className="text-gray-300 text-xs md:text-sm">
                        Hello! I put a lot of effort into this portfolio in terms of both development and design.
                        If you appreciate the work, please star the repository on GitHub. Dive in, explore,
                        and learn—don’t just copy the code without understanding it.
                    </div>

                    {/* GitHub button */}
                    <a
                        href="https://github.com/KvRae/KvRae.github.io"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-start space-x-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white text-xs md:text-sm"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297a12 12 0 00-3.8 23.4c.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.062-3.338.724-4.042-1.61-4.042-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.746.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.333-5.466-5.933 0-1.31.468-2.38 1.236-3.222-.124-.303-.536-1.524.118-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.656 1.652.244 2.873.12 3.176.77.842 1.236 1.912 1.236 3.222 0 4.61-2.804 5.625-5.475 5.922.43.37.823 1.096.823 2.21 0 1.595-.015 2.88-.015 3.27 0 .322.216.697.825.58A12 12 0 0012 .297z"/>
                        </svg>
                        <span>GitHub Repo</span>
                    </a>

                    {/* Logout button */}
                    <button
                        onClick={onLogout}
                        className="flex items-center justify-start space-x-2 px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white text-xs md:text-sm cursor-pointer"
                    >
                        <FiPower size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}
