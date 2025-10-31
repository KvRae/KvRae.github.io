import StartDrawer from "./StartDrawer";
import { useEffect, useState } from "react";
import { FiMusic, FiMapPin } from "react-icons/fi";
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

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-[#0c0c0e]/95 backdrop-blur-sm border-t border-yellow-700/30 h-12 w-full flex items-center justify-between px-2 md:px-4 text-yellow-100 shadow-[0_-1px_6px_rgba(255,215,0,0.15)]">
            {/* Left side start drawer */}
            <StartDrawer onLogout={onLogout} buttonSize="sm" />

            {/* Center dock icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
                <img
                    src={linkedinLogo}
                    alt="LinkedIn"
                    className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]"
                    onClick={() => onOpenProfile("linkedin")}
                />
                <img
                    src={githubLogo}
                    alt="GitHub"
                    className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]"
                    onClick={() => onOpenProfile("github")}
                />
                <img
                    src={mediumLogo}
                    alt="Medium"
                    className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]"
                    onClick={() => onOpenProfile("medium")}
                />
            </div>

            {/* Right side info */}
            <div className="flex items-center space-x-3 md:space-x-4 text-yellow-300 text-sm md:text-base">
                <FiMusic
                    size={20}
                    className={`cursor-pointer transition-colors ${
                        musicPlaying
                            ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]"
                            : "text-yellow-600"
                    }`}
                    onClick={onToggleMusic}
                />

                <div className="flex items-center space-x-1">
                    <FiMapPin className="text-yellow-400" size="1em" />
                    <span className="sm:hidden text-yellow-300">Tun</span>
                    <span className="hidden sm:inline text-yellow-300">Tunisia</span>
                </div>

                <div className="text-yellow-200 font-mono">
                    {time.toLocaleTimeString("en-US", {
                        timeZone: "Africa/Tunis",
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </div>
    );
}
