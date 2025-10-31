import { useState, useRef, useEffect } from "react";
import commandsData from "../../../data/commands.json";
import TerminalInput from "../../TerminalInput.tsx";

interface TerminalWindowProps {
    onClose: () => void;
}

interface Command {
    description: string;
    output: string;
}

export default function TerminalWindow({ onClose }: TerminalWindowProps) {
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

    const terminalRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-[#0d0d0f]/95 border border-yellow-700/40 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full max-w-4xl max-h-[70vh] flex flex-col text-yellow-100 font-mono">

                {/* Header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-800/30 border-b border-yellow-700/30 rounded-t-xl">
                    <div
                        className="w-3 h-3 bg-red-600 rounded-full cursor-pointer hover:bg-red-700 transition"
                        onClick={onClose}
                    ></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="ml-2 font-semibold text-yellow-300 select-none">Terminal</span>
                </div>

                {/* Terminal Content */}
                <div
                    ref={terminalRef}
                    className="p-4 flex-1 overflow-y-auto whitespace-pre-wrap text-xs sm:text-sm md:text-base lg:text-lg"
                >
                    {history.map((line, i) => (
                        <div key={i} className={i === 0 ? "hidden sm:block" : ""}>
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
