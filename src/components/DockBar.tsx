import StartDrawer from "./StartDrawer";
import { useEffect, useState } from "react";
import { FiMusic, FiMapPin } from "react-icons/fi";
import linkedinLogo from '../assets/linkedin-logo.png';
import githubLogo from '../assets/github-logo.png';
import mediumLogo from '../assets/medium-logo.png';

interface DockBarProps {
    onLogout: () => void;
    onOpenProfile: (profile: string) => void;
}

export default function DockBar({ onLogout, onOpenProfile }: DockBarProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gray-900 h-16 w-full flex items-center justify-between px-4">
            {/* Left side start drawer */}
            <StartDrawer onLogout={onLogout} />

            {/* Center dock icons */}
            <div className="flex items-center space-x-4">
                <img
                    src={linkedinLogo}
                    alt="LinkedIn"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => onOpenProfile('linkedin')}
                />
                <img
                    src={githubLogo}
                    alt="GitHub"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => onOpenProfile('github')}
                />
                <img
                    src={mediumLogo}
                    alt="Medium"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => onOpenProfile('medium')}
                />
            </div>

            {/* Right side info */}
            <div className="flex items-center space-x-4 text-gray-300">
                <FiMusic size={20} />

                <div className="flex items-center space-x-1"><FiMapPin /> <span>Tunisia</span></div>
                <div>{time.toLocaleTimeString('en-US', { timeZone: 'Africa/Tunis', hour12: false })}</div>
            </div>
        </div>
    );
}