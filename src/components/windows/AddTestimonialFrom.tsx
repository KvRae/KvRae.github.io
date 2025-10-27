import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, TESTM_TEMPLATE_ID} from "../../utils/consts.ts";

interface AddTestimonialFormProps {
    onCancel: () => void;
    onStatusChange?: (status: string) => void; // optional callback to parent
}

export default function AddTestimonialForm({ onCancel, onStatusChange }: AddTestimonialFormProps) {
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
            onStatusChange?.("Testimonial sent! It will be added soon!");
            setImageLink("")
            setName("");
            setMessage("");
            onCancel(); // hide form after successful send
        } catch (error) {
            console.error(error);
            onStatusChange?.("Failed to send. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <form className="p-4 space-y-4 bg-gray-800 rounded" onSubmit={handleSubmit}>
            <div>
                <label className="block text-gray-400 mb-1">Image url (we use cdn images)</label>
                <input
                    type="text"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    placeholder="Your avatar image URL"
                    className="w-full p-2 rounded border border-gray-700 bg-gray-900 text-white outline-none"
                    disabled={sending}
                />
            </div>
            <div>
                <label className="block text-gray-400 mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full p-2 rounded border border-gray-700 bg-gray-900 text-white outline-none"
                    disabled={sending}
                />
            </div>
            <div>
                <label className="block text-gray-400 mb-1">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your testimonial..."
                    className="w-full p-2 rounded border border-gray-700 bg-gray-900 text-white outline-none resize-none h-24"
                    disabled={sending}
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 text-white"
                    disabled={sending}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
                    disabled={sending}
                >
                    {sending ? "Sending..." : "Send"}
                </button>
            </div>
        </form>
    );
}
