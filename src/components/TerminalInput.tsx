import { useState, type KeyboardEvent } from "react";

interface TerminalInputProps {
    onEnter: (cmd: string) => void;
}

export default function TerminalInput({ onEnter }: TerminalInputProps) {
    const [input, setInput] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onEnter(input.trim().toLowerCase());
            setInput("");
        }
    };

    return (
        <div className="flex items-center">
            {/* Terminal prompt */}
            <span className="pr-2 text-yellow-400 font-mono drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]">
                kvrae@kvrae:~$
            </span>

            {/* Input field */}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none text-yellow-300 flex-1 font-mono caret-yellow-400 placeholder-yellow-700"
                autoFocus
                spellCheck={false}
            />
        </div>
    );
}
