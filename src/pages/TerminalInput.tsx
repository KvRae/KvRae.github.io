// src/TerminalInput.tsx
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
        <div className="flex">
            <span className="pr-2 text-green-400 font-mono">kvrae@kvrae:~$</span>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-black outline-none text-green-400 flex-1 font-mono"
                autoFocus
            />
        </div>
    );
}
