import { useState } from "react";
import commandsData from "../../data/commands.json";
import TerminalInput from "../TerminalInput.tsx";

interface TerminalWindowProps {
    onClose: () => void;
}

interface Command {
    description: string;
    output: string;
}

export default function TerminalWindow({ onClose }: TerminalWindowProps) {
    const [history, setHistory] = useState<string[]>([
        "██╗  ██╗██╗   ██╗██████╗        ██████╗ ███████╗\n" +
        "██║ ██╔╝██║   ██║██╔══██╗      ██╔═══██╗██╔════╝\n" +
        "█████╔╝ ██║   ██║██████╔╝█████╗██║   ██║███████╗\n" +
        "██╔═██╗ ╚██╗ ██╔╝██╔══██╗╚════╝██║   ██║╚════██║\n" +
        "██║  ██╗ ╚████╔╝ ██║  ██║      ╚██████╔╝███████║\n" +
        "╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝       ╚═════╝ ╚══════╝\n" +
        "                                                ",
        "Welcome to my custom console. Type 'help' to display all the commands."
    ]);
    const commands: Record<string, Command> = commandsData;

    const handleCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase();

        // Special commands
        if (lowerCmd === "exit") {
            onClose();
            return;
        }
        if (lowerCmd === "logout") {
            window.location.reload();
            return;
        }

        // Check normal commands
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
        <div className="absolute top-4 left-4 right-4 bottom-4 bg-black rounded-xl shadow-lg max-w-[90%] max-h-[90%] min-w-[300px] min-h-[200px] flex flex-col">
            {/* Mac-style window frame */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800">
                <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose}></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            {/* Terminal content */}
            <div className="p-4 text-green-400 font-mono flex-1 overflow-y-auto whitespace-pre-wrap text-xs sm:text-sm md:text-base lg:text-lg">
                {history.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
                <TerminalInput onEnter={handleCommand} />
            </div>
        </div>

    );
}
