import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
    EMAIL_PUBLIC_KEY,
    EMAIL_SERVICE_ID,
    TESTM_TEMPLATE_ID,
} from "../../../utils/consts.ts";

interface AddTestimonialFormProps {
    onCancel: () => void;
    onStatusChange?: (status: string) => void; // optional callback to parent
}

export default function AddTestimonialForm({
                                               onCancel,
                                               onStatusChange,
                                           }: AddTestimonialFormProps) {
    const [imageLink, setImageLink] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name || !message || !imageLink) {
            onStatusChange?.("Please fill in all fields.");
            return;
        }

        const templateParams = {
            name,
            message,
            image: imageLink,
            date: new Date().toLocaleDateString("en-US"),
        };

        setSending(true);

        try {
            await emailjs.send(
                EMAIL_SERVICE_ID,
                TESTM_TEMPLATE_ID,
                templateParams,
                EMAIL_PUBLIC_KEY
            );
            onStatusChange?.("✨ Testimonial sent! It will be added soon!");
            setImageLink("");
            setName("");
            setMessage("");
            onCancel(); // hide form after successful send
        } catch (error) {
            console.error(error);
            onStatusChange?.("⚠️ Failed to send. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <form
            className="p-4 space-y-4 bg-[#0d0d0e]/95 rounded-lg border border-yellow-700/30 shadow-[0_0_8px_rgba(255,215,0,0.1)]"
            onSubmit={handleSubmit}
        >
            <div>
                <label className="block text-yellow-300 mb-1">
                    Image URL <span className="text-yellow-600 text-xs">(use a CDN link)</span>
                </label>
                <input
                    type="text"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    placeholder="Your avatar image URL"
                    className="w-full p-2 rounded border border-yellow-700/40 bg-[#121212] text-yellow-100 placeholder-yellow-700 outline-none focus:ring-1 focus:ring-yellow-500 disabled:opacity-60"
                    disabled={sending}
                />
            </div>

            <div>
                <label className="block text-yellow-300 mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full p-2 rounded border border-yellow-700/40 bg-[#121212] text-yellow-100 placeholder-yellow-700 outline-none focus:ring-1 focus:ring-yellow-500 disabled:opacity-60"
                    disabled={sending}
                />
            </div>

            <div>
                <label className="block text-yellow-300 mb-1">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your testimonial..."
                    className="w-full p-2 rounded border border-yellow-700/40 bg-[#121212] text-yellow-100 placeholder-yellow-700 outline-none focus:ring-1 focus:ring-yellow-500 disabled:opacity-60 resize-none h-24"
                    disabled={sending}
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded bg-yellow-800/40 hover:bg-yellow-700/50 text-yellow-200 transition disabled:opacity-60"
                    disabled={sending}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-[0_0_6px_rgba(255,215,0,0.4)] transition disabled:opacity-60"
                    disabled={sending}
                >
                    {sending ? "Sending..." : "Send"}
                </button>
            </div>
        </form>
    );
}
