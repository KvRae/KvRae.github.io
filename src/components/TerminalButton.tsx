import { useState } from "react";
import CrackTerminal from "./windows/desktop/CrackTerminal.tsx";

export default function TerminalButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="absolute bottom-4 left-4 bg-gray-800 hover:bg-gray-700 p-3 rounded-full text-white"
            >
                <img src="/img/password.png" alt="Terminal Icon" className="w-8 h-8"/>

            </button>

            {open && (
                <div className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-50">
                    <CrackTerminal onClose={() => setOpen(false)} />
                </div>
            )}
        </>
    );
}
