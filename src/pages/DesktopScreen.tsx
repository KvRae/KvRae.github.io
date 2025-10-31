import { useEffect, useRef, useState } from "react";
import TerminalWindow from "../components/windows/desktop/TerminalWindow.tsx";
import DockBar from "../components/DockBar";
import DraggableWindow from "../components/windows/desktop/DraggableWindow.tsx";

import terminalIcon from "../assets/terminal-icon.png";
import DesktopImage from "../assets/desktop-background.gif";
import EmailIcon from "../assets/email.png";
import FolderIcon from "../assets/folder-icon.png";
import AvatarIcon from "../assets/avatar-pixels.png";
import PacmanIcon from "../assets/pacman-icon.png";
import ProjectsWindow from "../components/windows/desktop/ProjectWindow.tsx";
import ExperienceWindow from "../components/windows/desktop/ExperienceWindow.tsx";
import TestimonialsWindow from "../components/windows/desktop/TestimonialsWindow.tsx";
import EmailWindow from "../components/windows/desktop/EmailWindow.tsx";

import TestimonialsIcon from "../assets/rating.png";
import backgroundAudio from "../assets/audio.mp3";
import AboutWindow from "../components/windows/desktop/AboutWindow.tsx";
import PacmanWindow from "../components/windows/games/PacmanWindow.tsx";

export default function DesktopScreen() {
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [windows, setWindows] = useState<{ id: string; title: string; url: string }[]>([]);

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

    // Prevent unwanted scroll behaviors
    useEffect(() => {
        // Prevent pull-to-refresh and overscroll on mobile
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
            document.body.style.overscrollBehavior = 'auto';
            document.documentElement.style.overscrollBehavior = 'auto';
            document.removeEventListener('touchend', preventZoom);
        };
    }, []);

    const handleLogout = () => window.location.reload();

    const handleOpenProfile = (profile: string) => {
        let url = "";
        if (profile === "linkedin") url = "https://www.linkedin.com/in/karam-mannai";
        else if (profile === "github") url = "https://github.com/KvRae";
        else if (profile === "medium") url = "https://medium.com/@karammannai";
        window.open(url, "_blank");
    };

    const handleCloseWindow = (id: string) => {
        setWindows((prev) => prev.filter((win) => win.id !== id));
    };

    return (
        <div className="bg-[#0b0b0d] h-screen w-screen fixed inset-0 overflow-hidden flex flex-col text-yellow-100">
            <audio ref={audioRef} src={backgroundAudio} loop />

            {/* Desktop Area */}
            <div
                className="flex-1 relative bg-cover bg-center overflow-y-auto overflow-x-hidden"
                style={{
                    backgroundImage: `url(${DesktopImage})`,
                    filter: "brightness(0.85) contrast(1.1)",
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {/* Icons Grid - Responsive layout */}
                <div className="absolute top-4 sm:top-10 left-4 sm:left-10 grid grid-cols-2 sm:grid-rows-4 sm:grid-flow-col gap-4 sm:gap-x-16 sm:gap-y-8 pb-24 sm:pb-0">
                    {/* Terminal */}
                    <button
                        onClick={() => setTerminalOpen(true)}
                        className="flex flex-col items-center bg-transparent hover:scale-105 active:scale-95 transition-transform focus:outline-none touch-manipulation"
                    >
                        <img
                            src={terminalIcon}
                            alt="Terminal Icon"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] pointer-events-none"
                        />
                        <span className="text-yellow-200 text-xs sm:text-sm md:text-base mt-1">
                            Terminal
                        </span>
                    </button>

                    {/* About */}
                    <button
                        onClick={() => setAboutOpen(true)}
                        className="flex flex-col items-center bg-transparent hover:scale-105 active:scale-95 transition-transform focus:outline-none touch-manipulation"
                    >
                        <img
                            src={AvatarIcon}
                            alt="About Icon"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] pointer-events-none"
                        />
                        <span className="text-yellow-200 text-xs sm:text-sm md:text-base mt-1">About Me</span>
                    </button>

                    {/* Projects */}
                    <button
                        onClick={() => setProjectsOpen(true)}
                        className="flex flex-col items-center bg-transparent hover:scale-105 active:scale-95 transition-transform focus:outline-none touch-manipulation"
                    >
                        <img
                            src={FolderIcon}
                            alt="Projects Folder"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)] pointer-events-none"
                        />
                        <span className="text-yellow-200 text-xs sm:text-sm md:text-base mt-1">
                            Projects
                        </span>
                    </button>

                    {/* Experience */}
                    <button
                        onClick={() => setExperienceOpen(true)}
                        className="flex flex-col items-center bg-transparent hover:scale-105 active:scale-95 transition-transform focus:outline-none touch-manipulation"
                    >
                        <img
                            src={FolderIcon}
                            alt="Experience Folder"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)] pointer-events-none"
                        />
                        <span className="text-yellow-200 text-xs sm:text-sm md:text-base mt-1">
                            Experience
                        </span>
                    </button>

                    {/* Testimonials */}
                    <button
                        onClick={() => setTestimonialsOpen(true)}
                        className="flex flex-col items-center bg-transparent hover:scale-105 active:scale-95 transition-transform focus:outline-none touch-manipulation"
                    >
                        <img
                            src={TestimonialsIcon}
                            alt="Testimonials Folder"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)] pointer-events-none"
                        />
                        <span className="text-yellow-200 text-xs sm:text-sm md:text-base mt-1">
                            Testimonials
                        </span>
                    </button>

                    {/* Email */}
                    <button
                        onClick={() => setEmailOpen(true)}
                        className="flex flex-col items-center bg-transparent hover:scale-105 active:scale-95 transition-transform focus:outline-none touch-manipulation"
                    >
                        <img
                            src={EmailIcon}
                            alt="Email Icon"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)] pointer-events-none"
                        />
                        <span className="text-yellow-200 text-xs sm:text-sm md:text-base mt-1">
                            Mailing
                        </span>
                    </button>

                    {/* Pacman */}
                    <button
                        onClick={() => setPacmanOpen(true)}
                        className="flex flex-col items-center bg-transparent hover:scale-105 active:scale-95 transition-transform focus:outline-none touch-manipulation"
                    >
                        <img
                            src={PacmanIcon}
                            alt="Kav-Man Icon"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)] pointer-events-none"
                        />
                        <span className="text-yellow-200 text-xs sm:text-sm md:text-base mt-1">
                            Kav-Man
                        </span>
                    </button>
                </div>

                {/* Windows */}
                {terminalOpen && <TerminalWindow onClose={() => setTerminalOpen(false)} />}
                {aboutOpen && <AboutWindow onClose={() => setAboutOpen(false)} />}
                {projectsOpen && <ProjectsWindow onClose={() => setProjectsOpen(false)} />}
                {experienceOpen && <ExperienceWindow onClose={() => setExperienceOpen(false)} />}
                {testimonialsOpen && <TestimonialsWindow onClose={() => setTestimonialsOpen(false)} />}
                {emailOpen && <EmailWindow onClose={() => setEmailOpen(false)} />}
                {pacmanOpen && <PacmanWindow onClose={() => setPacmanOpen(false)} />}

                {/* External links */}
                {windows.map((win) => (
                    <DraggableWindow
                        key={win.id}
                        title={win.title}
                        url={win.url}
                        onClose={() => handleCloseWindow(win.id)}
                    />
                ))}
            </div>

            {/* Dock Bar - Fixed at bottom */}
            {/* DockBar - fixed bottom */}
            <div  className="fixed bottom-0 left-0 w-full z-20" >
                <DockBar
                onToggleMusic={() => setMusicPlaying((prev) => !prev)}
                musicPlaying={musicPlaying}
                onLogout={handleLogout}
                onOpenProfile={handleOpenProfile}
                />
            </div>
        </div>
    );
}