import StartDrawer from "./StartDrawer";
import { useEffect, useState } from "react";
import { FiMusic, FiMapPin } from "react-icons/fi";
import linkedinLogo from '../assets/linkedin-logo.png';
import githubLogo from '../assets/github-logo.png';
import mediumLogo from '../assets/medium-logo.png';

interface DockBarProps {
    onLogout: () => void;
    onOpenProfile: (profile: string) => void;
    onToggleMusic: () => void;
    musicPlaying: boolean;
}

export default function DockBar({ onLogout, onOpenProfile, onToggleMusic, musicPlaying }: DockBarProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gray-900 h-12 w-full flex items-center justify-between px-2 md:px-4">
            {/* Left side start drawer */}
            <StartDrawer onLogout={onLogout} buttonSize="sm" />

            {/* Center dock icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
                <img
                    src={linkedinLogo}
                    alt="LinkedIn"
                    className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
                    onClick={() => onOpenProfile('linkedin')}
                />
                <img
                    src={githubLogo}
                    alt="GitHub"
                    className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
                    onClick={() => onOpenProfile('github')}
                />
                <img
                    src={mediumLogo}
                    alt="Medium"
                    className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
                    onClick={() => onOpenProfile('medium')}
                />
            </div>

            {/* Right side info */}
            <div className="flex items-center space-x-2 md:space-x-4 text-gray-300 text-sm md:text-base">
                <FiMusic
                    size={20}
                    className={`cursor-pointer ${musicPlaying ? "text-green-400" : "text-gray-400"}`}
                    onClick={onToggleMusic}
                />

                <div className="flex items-center space-x-1">
                    <FiMapPin size={16} />
                    <span>Tun</span>
                </div>

                <div>{time.toLocaleTimeString('en-US', { timeZone: 'Africa/Tunis', hour12: false, hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        </div>
    );
}