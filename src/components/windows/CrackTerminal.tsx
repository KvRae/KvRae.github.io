// src/components/CrackTerminalModal.tsx
import { useEffect, useRef, useState } from "react";
import TerminalInput from "../TerminalInput.tsx";

type Props = {
    onClose: () => void;
};

export default function CrackTerminalModal({ onClose }: Props) {
    const [history, setHistory] = useState<string[]>([
        "██╗  ██╗██╗   ██╗      ██████╗  ██████╗ ██╗  ██╗    \n" +
        "██║ ██╔╝██║   ██║      ██╔══██╗██╔═══██╗╚██╗██╔╝    \n" +
        "█████╔╝ ██║   ██║█████╗██████╔╝██║   ██║ ╚███╔╝     \n" +
        "██╔═██╗ ╚██╗ ██╔╝╚════╝██╔══██╗██║   ██║ ██╔██╗     \n" +
        "██║  ██╗ ╚████╔╝       ██████╔╝╚██████╔╝██╔╝ ██╗    \n" +
        "╚═╝  ╚═╝  ╚═══╝        ╚═════╝  ╚═════╝ ╚═╝  ╚═╝    \n" +
        "                                                    ",
        "Password Cracking Utility v3.14.15",
        "Developed by Kvrae for ethical hacking simulations.",
        "                                                 ",
        "Initializing brute-force protocol...",
        "Type 'help' for available commands.",
        ""
    ]);
    const [foundHash, setFoundHash] = useState<string | null>(null);
    const [state, setState] = useState<"idle" | "scanning" | "ready" | "decrypting">("idle");
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [history]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const push = (...lines: string[]) => setHistory(prev => [...prev, ...lines]);

    const makeFakeHash = () => {
        const chars = "abcdef0123456789";
        let h = "";
        for (let i = 0; i < 64; i++) h += chars[Math.floor(Math.random() * chars.length)];
        return h;
    };

    const simulatedDecrypt = () =>
        new Promise<string>((resolve) => {
            setTimeout(() => resolve("Kvrae"), 900 + Math.random() * 1100);
        });

    const handleCommand = async (raw: string) => {
        const cmd = raw.trim();
        if (!cmd) return;
        push(`kv-box@kvrae:~$ ${cmd}`);

        const [base, ...args] = cmd.split(/\s+/);
        const lower = base.toLowerCase();

        if (lower === "help") {
            push(
                "Available commands:",
                "  scan            Scan for candidate password hashes",
                "  decrypt <hash>  Attempt to decrypt a found hash",
                "  clear           Clear terminal",
                "  exit            Close window",
                ""
            );
            return;
        }

        if (lower === "exit") {
            onClose();
            return;
        }

        if (lower === "clear") {
            setHistory([]);
            return;
        }

        if (lower === "scan") {
            if (state === "scanning") {
                push("Scan already in progress...");
                return;
            }
            setState("scanning");
            push("Scanning target filesystem for credential artifacts...");
            for (let i = 1; i <= 4; i++) {
                await new Promise<void>((res) =>
                    setTimeout(() => { push(`  scanning sector ${i * 128}...`); res(); }, 200 * i)
                );
            }
            const h = makeFakeHash();
            setFoundHash(h);
            setState("ready");
            push("", `Scan complete. Found candidate hash: ${h}`, "Use `decrypt <hash>` to attempt decryption.", "");
            return;
        }

        if (lower === "decrypt") {
            if (args.length === 0) {
                push("Usage: decrypt <hash>");
                return;
            }
            const target = args[0];
            if (!foundHash) {
                push("No scanned hash available. Run `scan` first.");
                return;
            }
            if (target !== foundHash) {
                push("Provided hash not recognized. Did you copy it exactly?");
                return;
            }
            if (state === "decrypting") {
                push("Already decrypting...");
                return;
            }

            setState("decrypting");
            push("Attempting decryption...", "  allocating resources...");
            await new Promise(r => setTimeout(r, 400));
            push("  running crypto routines...");
            await new Promise(r => setTimeout(r, 650));
            push("  checking common keys...");
            await new Promise(r => setTimeout(r, 500));

            try {
                const password = await simulatedDecrypt();
                push("", "Decryption successful:", `  Decrypted password: ${password}`, "");
                push("", "Close the terminal and try the password", ``, "");
            } catch {
                push("Decryption failed: unknown error");
            } finally {
                setState("ready");
            }
            return;
        }

        push(`Command not found: ${lower}`);
    };

    return (
        // Overlay: dims background but does not replace it
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* dimmer */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden
            />

            {/* Modal window: centered panel only */}
            <div
                className="relative bg-black text-green-400 rounded-lg shadow-2xl w-[720px] max-w-[92%] h-[420px] max-h-[85%] flex flex-col z-60"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title bar */}
                <div className="flex items-center gap-3 px-3 py-2 bg-gray-800 rounded-t-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose} />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <div className="ml-3 text-sm text-gray-200 font-semibold">kv-box tool</div>
                    <div className="ml-auto text-xs text-gray-400 pr-2">password cracking</div>
                </div>

                {/* Content */}

                <div
                    ref={scrollRef}
                    className="p-4 font-mono flex-1 overflow-y-auto whitespace-pre-wrap text-xs sm:text-sm md:text-base"
                    style={{ background: "transparent" }}
                >
                    {history.map((line, i) => {
                        // Hide ASCII art lines on small screens
                        if (i === 0) {
                            return (
                                <div key={i} className="hidden sm:block">
                                    {line}
                                </div>
                            );
                        }
                        return <div key={i}>{line}</div>;
                    })}

                    <div className="mt-2">
                        <TerminalInput onEnter={handleCommand} />
                    </div>
                </div>


            </div>
        </div>
    );
}
