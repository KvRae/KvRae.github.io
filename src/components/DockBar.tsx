import StartDrawer from "./StartDrawer";
import { useEffect, useState } from "react";
import { FiMusic, FiMapPin, FiMenu, FiX } from "react-icons/fi";
import linkedinLogo from "../assets/linkedin-logo.png";
import githubLogo from "../assets/github-logo.png";
import mediumLogo from "../assets/medium-logo.png";

interface DockBarProps {
    onLogout: () => void;
    onOpenProfile: (profile: string) => void;
    onToggleMusic: () => void;
    musicPlaying: boolean;
}

export default function DockBar({
                                    onLogout,
                                    onOpenProfile,
                                    onToggleMusic,
                                    musicPlaying,
                                }: DockBarProps) {
    const [time, setTime] = useState(new Date());
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [drawerOpen]);

    return (
        <>
            {/* Dock Bar */}
            <div className="bg-[#0c0c0e]/95 backdrop-blur-sm border-t border-yellow-700/30 h-12 w-full flex items-center justify-between px-2 md:px-4 text-yellow-100 shadow-[0_-1px_6px_rgba(255,215,0,0.15)] relative z-40">
                {/* Left side - Desktop: Start Drawer, Mobile: Menu Button */}
                <div className="flex items-center">
                    {/* Desktop Start Drawer */}
                    <div className="hidden md:block">
                        <StartDrawer onLogout={onLogout} buttonSize="sm" />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="md:hidden p-2 hover:bg-yellow-500/10 rounded transition-colors touch-manipulation"
                        aria-label="Open menu"
                    >
                        <FiMenu size={20} className="text-yellow-400" />
                    </button>
                </div>

                {/* Center dock icons */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <img
                        src={linkedinLogo}
                        alt="LinkedIn"
                        className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 active:scale-95 transition-transform drop-shadow-[0_0_6px_rgba(255,215,0,0.4)] touch-manipulation"
                        onClick={() => onOpenProfile("linkedin")}
                    />
                    <img
                        src={githubLogo}
                        alt="GitHub"
                        className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 active:scale-95 transition-transform drop-shadow-[0_0_6px_rgba(255,215,0,0.4)] touch-manipulation"
                        onClick={() => onOpenProfile("github")}
                    />
                    <img
                        src={mediumLogo}
                        alt="Medium"
                        className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 active:scale-95 transition-transform drop-shadow-[0_0_6px_rgba(255,215,0,0.4)] touch-manipulation"
                        onClick={() => onOpenProfile("medium")}
                    />
                </div>

                {/* Right side info */}
                <div className="flex items-center space-x-2 md:space-x-4 text-yellow-300 text-xs md:text-base">
                    <FiMusic
                        size={18}
                        className={`cursor-pointer transition-colors touch-manipulation ${
                            musicPlaying
                                ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]"
                                : "text-yellow-600"
                        }`}
                        onClick={onToggleMusic}
                    />

                    <div className="hidden sm:flex items-center space-x-1">
                        <FiMapPin className="text-yellow-400" size={16} />
                        <span className="text-yellow-300">Tunisia</span>
                    </div>

                    <div className="text-yellow-200 font-mono text-xs md:text-sm">
                        {time.toLocaleTimeString("en-US", {
                            timeZone: "Africa/Tunis",
                            hour12: false,
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Slide-in Drawer (Right to Left) */}
            {drawerOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setDrawerOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-[#0c0c0e]/98 backdrop-blur-md border-l border-yellow-700/30 shadow-[-4px_0_12px_rgba(0,0,0,0.5)] z-50 flex flex-col animate-slide-in-right">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-4 border-b border-yellow-700/30">
                            <span className="text-yellow-300 font-semibold">Menu</span>
                            <button
                                onClick={() => setDrawerOpen(false)}
                                className="p-2 hover:bg-yellow-500/10 rounded transition-colors touch-manipulation"
                                aria-label="Close menu"
                            >
                                <FiX size={20} className="text-yellow-400" />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {/* Location Info */}
                            <div className="flex items-center space-x-2 mb-6 text-yellow-300">
                                <FiMapPin className="text-yellow-400" size={18} />
                                <span>Tunisia</span>
                            </div>

                            {/* Start Drawer Content */}
                            <div className="space-y-2">
                                <StartDrawer onLogout={onLogout} buttonSize="sm" />
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-4 border-t border-yellow-700/30">
                            <button
                                onClick={() => {
                                    onLogout();
                                    setDrawerOpen(false);
                                }}
                                className="w-full py-2 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded transition-colors touch-manipulation"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}

            <style>{`
                @keyframes slide-in-right {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                }
            `}</style>
        </>
    );
}