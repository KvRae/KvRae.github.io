import {useEffect, useRef, useState} from "react";
import TerminalWindow from "../components/TerminalWindow.tsx";
import DockBar from "../components/DockBar";
import Window from "../components/Window";
import terminalIcon from '../assets/terminal-icon.png';
import DesktopImage from '../assets/desktop-background.gif';
import FolderIcon from '../assets/folder-icon.png';
import ProjectsWindow from "../components/ProjectWindow.tsx";
import ExperienceWindow from "../components/ExperienceWindow";
import backgroundAudio from '../assets/audio.mp3';

export default function DesktopScreen() {
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [windows, setWindows] = useState<{id: string, title: string, url: string}[]>([]);

    const [projectsOpen, setProjectsOpen] = useState(false);
    const [experienceOpen, setExperienceOpen] = useState(false);

    const [musicPlaying, setMusicPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (musicPlaying) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [musicPlaying]);

    const handleLogout = () => {
        window.location.reload();
    };

    const handleOpenProfile = (profile: string) => {
        let url = '';
        if (profile === 'linkedin') url = 'https://www.linkedin.com/in/karam-mannai';
        else if (profile === 'github') url = 'https://github.com/KvRae';
        else if (profile === 'medium') url = 'https://medium.com/@KvRae';
        window.open(url, '_blank');
    }

    const handleCloseWindow = (id: string) => {
        setWindows(prev => prev.filter(win => win.id !== id));
    };

    return (
        <div className="bg-blue-600 h-screen w-screen relative flex flex-col justify-between">
            <audio ref={audioRef} src={backgroundAudio} loop />
            {/* DesktopScreen area */}
            <div
                className="flex-1 relative bg-cover bg-center"
                style={{ backgroundImage: `url(${DesktopImage})` }}
            >
                {/* Left-side stacked icons */}
                <div className="absolute top-10 left-10 flex flex-col space-y-6">
                    {/* Terminal Icon */}
                    <button
                        onClick={() => setTerminalOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={terminalIcon} alt="CMD Icon" className="w-16 h-16" />
                        <span className="text-white text-center mt-1">Terminal</span>
                    </button>

                    {/* Projects Folder */}
                    <button
                        onClick={() => setProjectsOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={FolderIcon} alt="Projects Folder" className="w-16 h-16" />
                        <span className="text-white text-center mt-1">Projects</span>
                    </button>

                    {/* Experience Folder */}
                    <button
                        onClick={() => setExperienceOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={FolderIcon} alt="Experience Folder" className="w-16 h-16" />
                        <span className="text-white text-center mt-1">Experience</span>
                    </button>
                </div>

                {/* Windows */}
                {terminalOpen && <TerminalWindow onClose={() => setTerminalOpen(false)} />}
                {projectsOpen && <ProjectsWindow onClose={() => setProjectsOpen(false)} />}
                {experienceOpen && <ExperienceWindow onClose={() => setExperienceOpen(false)} />}

                {/* Profile Iframe Windows */}
                {windows.map(win => (
                    <Window
                        key={win.id}
                        title={win.title}
                        url={win.url}
                        onClose={() => handleCloseWindow(win.id)}
                    />
                ))}
            </div>

            {/* DockBar */}
            <DockBar
                onToggleMusic={() => setMusicPlaying(prev => !prev)}
                musicPlaying={musicPlaying}
                onLogout={handleLogout}
                onOpenProfile={handleOpenProfile}
            />
        </div>
    );
}
