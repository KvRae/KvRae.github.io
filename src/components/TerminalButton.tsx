import { useState } from "react";
import CrackTerminal from "./windows/desktop/CrackTerminal.tsx";

export default function TerminalButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="
                    flex justify-center items-center
                    w-12 h-12 sm:w-16 sm:h-16
                    bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600
                    border-2 border-yellow-800/50
                    rounded-full
                    shadow-[0_0_15px_rgba(255,215,0,0.6)]
                    transition-transform transform hover:scale-110
                    focus:outline-none
                "
                aria-label="Open Terminal"
            >
                <img
                    src="/img/password.png"
                    alt="Terminal Icon"
                    className="w-6 h-6 sm:w-8 sm:h-8"
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
