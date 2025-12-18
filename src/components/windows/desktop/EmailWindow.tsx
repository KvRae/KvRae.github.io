import { type FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID } from "../../../utils/consts.ts";

interface EmailWindowProps {
    onClose: () => void;
    onMinimize?: () => void;
    isMinimized?: boolean;
    defaultRecipient?: string;
}

export default function EmailWindow({
                                        onClose,
                                        onMinimize,
                                        isMinimized = false,
                                        defaultRecipient = "karam.mannai@hotmail.com",
                                    }: EmailWindowProps) {
    const [sender, setSender] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const windowStyle = isMaximized ? { maxHeight: "calc(100vh - 110px)" } : undefined;

    const handleSend = (e: FormEvent) => {
        e.preventDefault();

        if (!sender || !subject || !message) {
            setStatus("⚠️ Please fill in all fields.");
            return;
        }

        const templateParams = {
            from_email: sender,
            to_email: defaultRecipient,
            subject,
            message,
        };

        emailjs
            .send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams, EMAIL_PUBLIC_KEY)
            .then(
                (response) => {
                    setStatus("✅ Message sent successfully!");
                    setSender("");
                    setSubject("");
                    setMessage("");
                    console.log("SUCCESS!", response.status, response.text);
                },
                (error) => {
                    setStatus("❌ Failed to send message. Try again later.");
                    console.error("FAILED...", error);
                }
            );
    };

    if (isMinimized) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
            <div className={`bg-[#0d0d0f]/95 border border-yellow-800/40 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full overflow-y-auto text-yellow-100 transition-all duration-300 ${
                isMaximized ? 'max-w-full h-full' : 'max-w-md max-h-[90vh]'
            }`} style={windowStyle}>

                {/* Header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-[#1a1a1d] border-b border-yellow-800/30 rounded-t-xl">
                    <div
                        className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition"
                        onClick={onClose}
                    />
                    <div
                        className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition"
                        onClick={onMinimize}
                    />
                    <div
                        className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
                        onClick={toggleMaximize}
                    />
                    <span className="ml-2 font-semibold text-yellow-200">Send Email</span>
                </div>

                {/* Form */}
                <form className="p-4 space-y-4" onSubmit={handleSend}>
                    <div>
                        <label className="block text-yellow-500 mb-1 font-medium">Your Email</label>
                        <input
                            type="email"
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full p-2 rounded border border-yellow-700/40 bg-[#141414] text-yellow-100 outline-none focus:border-yellow-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-yellow-500 mb-1 font-medium">Recipient</label>
                        <input
                            type="email"
                            value={defaultRecipient}
                            readOnly
                            className="w-full p-2 rounded border border-yellow-800/40 bg-[#1a1a1d] text-yellow-700 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-yellow-500 mb-1 font-medium">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject of your message"
                            className="w-full p-2 rounded border border-yellow-700/40 bg-[#141414] text-yellow-100 outline-none focus:border-yellow-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-yellow-500 mb-1 font-medium">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full p-2 rounded border border-yellow-700/40 bg-[#141414] text-yellow-100 outline-none resize-none h-32 focus:border-yellow-400 transition"
                        />
                    </div>

                    {status && (
                        <p className={`text-sm font-medium ${
                            status.includes("successfully")
                                ? "text-yellow-400"
                                : "text-red-400"
                        }`}>
                            {status}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition shadow-[0_0_10px_rgba(255,215,0,0.3)]"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}