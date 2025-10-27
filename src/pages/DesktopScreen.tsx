import {useEffect, useRef, useState} from "react";
import TerminalWindow from "../components/windows/TerminalWindow.tsx";
import DockBar from "../components/DockBar";
import DraggableWindow from "../components/windows/DraggableWindow.tsx";
import terminalIcon from '../assets/terminal-icon.png';
import DesktopImage from '../assets/desktop-background.gif';
import EmailIcon from '../assets/email.png'
import FolderIcon from '../assets/folder-icon.png';
import AvatarIcon from '../assets/avatar-pixels.png'
import PacmanIcon from '../assets/pacman-icon.png'
import ProjectsWindow from "../components/windows/ProjectWindow.tsx";
import ExperienceWindow from "../components/windows/ExperienceWindow.tsx";
import TestimonialsWindow from "../components/windows/TestimonialsWindow.tsx";
import EmailWindow from "../components/windows/EmailWindow.tsx";

import TestimonialsIcon from "../assets/rating.png";
import backgroundAudio from '../assets/audio.mp3';
import AboutWindow from "../components/windows/AboutWindow.tsx";
import PacmanWindow from "../components/games/PacmanWindow.tsx";

export default function DesktopScreen() {
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [windows, setWindows] = useState<{id: string, title: string, url: string}[]>([]);

    const [aboutOpen, setAboutOpen] = useState(false);
    const [projectsOpen, setProjectsOpen] = useState(false);
    const [experienceOpen, setExperienceOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [testimonialsOpen, setTestimonialsOpen] = useState(false);

    const [pacmanOpen, setPacmanOpen] = useState(false);

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
        else if (profile === 'medium') url = 'https://medium.com/@karammannai';
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
                <div className="absolute top-10 left-10 grid grid-rows-4 grid-flow-col gap-x-16 gap-y-8">
                    {/* Terminal Icon */}
                    <button
                        onClick={() => setTerminalOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={terminalIcon} alt="CMD Icon"
                             className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"/>
                        <span className="text-white text-xs sm:text-sm md:text-base mt-1">Terminal</span>
                    </button>

                    {/* About Icon */}
                    <button
                        onClick={() => setAboutOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={AvatarIcon} alt="About Icon" className="w-16 h-16"/>
                        <span className="text-white text-center mt-1">About Me</span>
                    </button>

                    {/* Projects Folder */}
                    <button
                        onClick={() => setProjectsOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={FolderIcon} alt="Projects Folder"
                             className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"/>
                        <span className="text-white text-xs sm:text-sm md:text-base mt-1">Projects</span>
                    </button>

                    {/* Experience Folder */}
                    <button
                        onClick={() => setExperienceOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={FolderIcon} alt="Experience Folder"
                             className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"/>
                        <span className="text-white text-xs sm:text-sm md:text-base mt-1">Experience</span>
                    </button>

                    {/* Testimonials Folder */}
                    <button
                        onClick={() => setTestimonialsOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={TestimonialsIcon} alt="Testimonials Folder"
                             className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"/>
                        <span className="text-white text-xs sm:text-sm md:text-base mt-1">Testimonials</span>
                    </button>

                    {/* Email icon */}
                    <button
                        onClick={() => setEmailOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={EmailIcon} alt="Email Icon"
                             className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"/>
                        <span className="text-white text-xs sm:text-sm md:text-base mt-1">Mailing</span>
                    </button>
                    {/* Pacman icon */}
                    <button
                        onClick={() => setPacmanOpen(true)}
                        className="flex flex-col items-center bg-transparent border-none focus:outline-none"
                    >
                        <img src={PacmanIcon} alt="Email Icon"
                             className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"/>
                        <span className="text-white text-xs sm:text-sm md:text-base mt-1">Kav-Man</span>
                    </button>


                </div>

                {/* Windows */}
                {terminalOpen && <TerminalWindow onClose={() => setTerminalOpen(false)} />}
                {aboutOpen && <AboutWindow onClose={() => setAboutOpen(false)} />}
                {projectsOpen && <ProjectsWindow onClose={() => setProjectsOpen(false)} />}
                {experienceOpen && <ExperienceWindow onClose={() => setExperienceOpen(false)} />}
                {testimonialsOpen && (<TestimonialsWindow onClose={() => setTestimonialsOpen(false)} />)}
                {emailOpen && <EmailWindow onClose={() => setEmailOpen(false)} />}
                {pacmanOpen && (<PacmanWindow onClose={() => setPacmanOpen(false)} />)}

                {/* Profile Iframe Windows */}
                {windows.map(win => (
                    <DraggableWindow
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
