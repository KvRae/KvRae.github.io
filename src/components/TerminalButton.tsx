import { useState } from "react";
import {FiLock} from "react-icons/fi";
import CrackTerminal from "./windows/CrackTerminal";

export default function TerminalButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="absolute bottom-4 left-4 bg-gray-800 hover:bg-gray-700 p-3 rounded-full text-white"
            >
                <FiLock size={24} />
            </button>

            {open && (
                <div className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-50">
                    <CrackTerminal onClose={() => setOpen(false)} />
                </div>
            )}
        </>
    );
}
