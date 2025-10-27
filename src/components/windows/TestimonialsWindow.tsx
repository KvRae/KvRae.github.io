import { useState } from "react";
import AddTestimonialForm from "./AddTestimonialFrom.tsx";
import testimonialsData from "../../data/testimonials.json";
import { FiPlus } from "react-icons/fi";

interface TestimonialsWindowProps {
    onClose: () => void;
}

export default function TestimonialsWindow({ onClose }: TestimonialsWindowProps) {
    const [showForm, setShowForm] = useState(false);
    const [status, setStatus] = useState(""); // To show success or error message

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50 p-4">
            <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white">
                {/* DraggableWindow header */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
                    <div className="flex items-center space-x-2">
                        <div
                            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                            onClick={onClose}
                        ></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="ml-2 font-semibold">Testimonials</span>
                    </div>
                    {!showForm && (
                        <button
                            className="text-white hover:text-yellow-400 flex items-center space-x-1"
                            onClick={() => setShowForm(true)}
                            title="Add Testimonial"
                        >
                            <FiPlus size={18} />
                            <p className="text-sm">Add yours</p>
                        </button>
                    )}
                </div>

                {/* Content */}
                {showForm ? (
                    <AddTestimonialForm
                        onCancel={() => setShowForm(false)}
                        onStatusChange={setStatus} // Pass status callback
                    />
                ) : (
                    <div className="p-4 space-y-4">
                        {status && <p className="text-green-400">{status}</p>}
                        {testimonialsData.map((t, i) => (
                            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-800 rounded p-3 space-y-2 sm:space-y-0 sm:space-x-4">
                                <img
                                    src={t.image || "/assets/img/avatar-placeholder.png"}
                                    alt={t.name}
                                    className="w-20 h-20 rounded-full border-2 border-yellow-400 flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <div className="font-bold text-yellow-400">{t.name}</div>
                                    <p className="text-gray-300 text-sm">{t.message}</p>
                                    <p className="text-gray-400 text-xs mt-1">{t.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
