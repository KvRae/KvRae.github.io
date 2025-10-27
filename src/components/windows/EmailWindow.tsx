// src/components/EmailWindow.tsx
import { type FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import {EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID} from "../../utils/consts.ts";

interface EmailWindowProps {
    onClose: () => void;
    defaultRecipient?: string;
}

export default function EmailWindow({
                                        onClose,
                                        defaultRecipient = "karam.mannai@hotmail.com",
                                    }: EmailWindowProps) {
    const [sender, setSender] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSend = (e: FormEvent) => {
        e.preventDefault();

        if (!sender || !subject || !message) {
            setStatus("Please fill in all fields.");
            return;
        }

        const templateParams = {
            from_email: sender,
            to_email: defaultRecipient,
            subject,
            message,
        };

        emailjs
            .send(
                EMAIL_SERVICE_ID,   // Replace with your EmailJS service ID
                EMAIL_TEMPLATE_ID,  // Replace with your EmailJS template ID
                templateParams,
                EMAIL_PUBLIC_KEY// Replace with your EmailJS public key
            )
            .then(
                (response) => {
                    setStatus("Message sent!");
                    setSender("");
                    setSubject("");
                    setMessage("");
                    console.log("SUCCESS!", response.status, response.text);
                },
                (error) => {
                    setStatus("Failed to send message. Try again later.");
                    console.error("FAILED...", error);
                }
            );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto text-white">
                {/* DraggableWindow Header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-t-xl">
                    <div
                        className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                        onClick={onClose}
                    />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="ml-2 font-semibold">Send Email</span>
                </div>

                {/* Form Content */}
                <form className="p-4 space-y-4" onSubmit={handleSend}>
                    <div>
                        <label className="block text-gray-400 mb-1">Your Email</label>
                        <input
                            type="email"
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">Recipient</label>
                        <input
                            type="email"
                            value={defaultRecipient}
                            readOnly
                            className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-gray-400 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject of your message"
                            className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white outline-none resize-none h-32"
                        />
                    </div>

                    {status && <p className="text-sm text-green-400">{status}</p>}

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white w-full"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
