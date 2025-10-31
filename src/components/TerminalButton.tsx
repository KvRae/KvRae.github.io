import { useState } from "react";
import CrackTerminal from "./windows/desktop/CrackTerminal.tsx";

export default function TerminalButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="
                    absolute bottom-4 left-4
                    bg-[#0b0b0d] hover:bg-[#1a1a10]
                    border border-yellow-800/40
                    p-3 rounded-full
                    shadow-[0_0_10px_rgba(255,215,0,0.2)]
                    transition-colors
                "
            >
                <img
                    src="/img/password.png"
                    alt="Terminal Icon"
                    className="w-8 h-8"
                />
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <CrackTerminal onClose={() => setOpen(false)} />
                </div>
            )}
        </>
    );
}
