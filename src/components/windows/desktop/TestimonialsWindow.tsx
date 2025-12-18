import { useState } from "react";
import AddTestimonialForm from "./AddTestimonialFrom.tsx";
import testimonialsData from "../../../data/testimonials.json";
import { FiPlus } from "react-icons/fi";

interface TestimonialsWindowProps {
    onClose: () => void;
    onMinimize?: () => void;
    isMinimized?: boolean;
}

export default function TestimonialsWindow({ onClose, onMinimize, isMinimized = false }: TestimonialsWindowProps) {
    const [showForm, setShowForm] = useState(false);
    const [status, setStatus] = useState(""); // To show success or error message
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const windowStyle = isMaximized ? { maxHeight: "calc(100vh - 110px)" } : undefined;

    if (isMinimized) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
            <div className={`bg-[#0d0d0f]/95 border border-yellow-700/30 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full overflow-y-auto text-yellow-100 transition-all duration-300 ${
                isMaximized ? 'max-w-full h-full' : 'max-w-4xl max-h-[90vh]'
            }`} style={windowStyle}>

                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a1d] border-b border-yellow-800/30 rounded-t-xl">
                    <div className="flex items-center space-x-2">
                        <div
                            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition"
                            onClick={onClose}
                        ></div>
                        <div
                            className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition"
                            onClick={onMinimize}
                        ></div>
                        <div
                            className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
                            onClick={toggleMaximize}
                        ></div>
                        <span className="ml-2 font-semibold text-yellow-200">
                            Testimonials
                        </span>
                    </div>

                    {!showForm && (
                        <button
                            className="text-yellow-300 hover:text-yellow-400 flex items-center space-x-1 transition"
                            onClick={() => setShowForm(true)}
                            title="Add Testimonial"
                        >
                            <FiPlus size={18} />
                            <p className="text-sm font-medium">Add yours</p>
                        </button>
                    )}
                </div>

                {/* Content */}
                {showForm ? (
                    <AddTestimonialForm
                        onCancel={() => setShowForm(false)}
                        onStatusChange={setStatus}
                    />
                ) : (
                    <div className="p-4 space-y-4">
                        {status && (
                            <p className="text-yellow-400 font-medium drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]">
                                {status}
                            </p>
                        )}

                        {testimonialsData.map((t, i) => (
                            <div
                                key={i}
                                className="flex flex-col sm:flex-row items-center sm:items-start bg-[#141414] border border-yellow-800/40 rounded-lg p-3 space-y-3 sm:space-y-0 sm:space-x-4 shadow-[0_0_6px_rgba(255,215,0,0.05)] hover:shadow-[0_0_10px_rgba(255,215,0,0.1)] transition"
                            >
                                <img
                                    src={t.image || "/assets/img/avatar-placeholder.png"}
                                    alt={t.name}
                                    className="w-20 h-20 rounded-full border-2 border-yellow-500/50 shadow-[0_0_8px_rgba(255,215,0,0.4)] flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <div className="font-bold text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]">
                                        {t.name}
                                    </div>
                                    <p className="text-yellow-100/80 text-sm leading-relaxed">
                                        {t.message}
                                    </p>
                                    <p className="text-yellow-700 text-xs mt-1 italic">
                                        {t.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
