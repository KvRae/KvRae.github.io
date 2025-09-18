import { FiEye, FiEyeOff } from "react-icons/fi";
import {useState} from "react";

interface PasswordInputProps {
    password: string;
    setPassword: (val: string) => void;
    error?: string;
}

export default function PasswordInput({ password, setPassword}: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative w-full">
            <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 pr-10 rounded border border-gray-700 bg-gray-800 text-white outline-none w-full"
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
                {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
        </div>
    );
}
