import { useState, useRef, useEffect } from "react";
import commandsData from "../../../data/commands.json";
import TerminalInput from "../../TerminalInput.tsx";

interface TerminalWindowProps {
    onClose: () => void;
    onMinimize?: () => void;
    isMinimized?: boolean;
}

interface Command {
    description: string;
    output: string;
}

export default function TerminalWindow({ onClose, onMinimize, isMinimized = false }: TerminalWindowProps) {
    const [history, setHistory] = useState<string[]>([
        `██╗  ██╗██╗   ██╗██████╗        ██████╗ ███████╗
██║ ██╔╝██║   ██║██╔══██╗      ██╔═══██╗██╔════╝
█████╔╝ ██║   ██║██████╔╝█████╗██║   ██║███████╗
██╔═██╗ ╚██╗ ██╔╝██╔══██╗╚════╝██║   ██║╚════██║
██║  ██╗ ╚████╔╝ ██║  ██║      ╚██████╔╝███████║
╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝       ╚═════╝ ╚══════╝`,
        "Welcome to my custom console. Type 'help' to display all the commands."
    ]);
    const commands: Record<string, Command> = commandsData;
    const [isMaximized, setIsMaximized] = useState(false);

    const terminalRef = useRef<HTMLDivElement>(null);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const maxHeightStyle = isMaximized
        ? { height: "calc(100vh - 110px)", maxHeight: "calc(100vh - 110px)" }
        : undefined;

    useEffect(() => {
        terminalRef.current?.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === "exit") {
            onClose();
            return;
        }
        if (lowerCmd === "logout") {
            window.location.reload();
            return;
        }

        if (lowerCmd in commands) {
            if (commands[lowerCmd].output === "__CLEAR__") {
                setHistory([]);
            } else {
                setHistory((prev) => [
                    ...prev,
                    `kvrae@kvrae:~$ ${lowerCmd}`,
                    commands[lowerCmd].output
                ]);
            }
        } else {
            setHistory((prev) => [...prev, `> ${lowerCmd}`, `Command not found: ${lowerCmd}`]);
        }
    };

    if (isMinimized) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Dimmer overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden
            />

            {/* Modal window */}
            <div
                className={`relative bg-[#0b0b0d] text-yellow-400 rounded-xl shadow-[0_0_25px_rgba(255,215,0,0.3)] w-full flex flex-col border border-yellow-800/40 font-mono transition-all duration-300 ${
                    isMaximized ? 'max-w-full' : 'max-w-4xl max-h-[70vh]'
                }`}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                style={maxHeightStyle}
            >
                {/* Header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a10] border-b border-yellow-800/40 rounded-t-xl">
                    <div
                        className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition"
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
                    <span className="ml-2 font-semibold text-yellow-200 select-none">Terminal</span>
                </div>

                {/* Terminal Content */}
                <div
                    ref={terminalRef}
                    className="p-4 flex-1 overflow-y-auto whitespace-pre-wrap text-xs sm:text-sm md:text-base lg:text-lg"
                    style={{ background: "transparent" }}
                >
                    {history.map((line, i) => (
                        <div key={i} className={i === 0 ? "hidden sm:block text-yellow-300" : ""}>
                            {line}
                        </div>
                    ))}
                    <div className="mt-2">
                        <TerminalInput onEnter={handleCommand} />
                    </div>
                </div>
            </div>
        </div>
    );
}
