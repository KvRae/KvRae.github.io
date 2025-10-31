import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

interface PasswordInputProps {
    password: string;
    setPassword: (val: string) => void;
    error?: string;
}

export default function PasswordInput({ password, setPassword }: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative w-full max-w-md">
            <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                    p-2 pr-10 w-full rounded-lg
                    bg-[#0b0b0d] border border-yellow-800/40
                    text-yellow-100 placeholder-yellow-500
                    focus:outline-none focus:ring-2 focus:ring-yellow-400
                    transition-colors
                "
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="
                    absolute right-2 top-1/2 transform -translate-y-1/2
                    text-yellow-400 hover:text-yellow-200 transition-colors
                "
            >
                {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
        </div>
    );
}
