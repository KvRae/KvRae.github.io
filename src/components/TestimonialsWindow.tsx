import testimonials from "../data/testimonials.json";

interface TestimonialsWindowProps {
    onClose: () => void;
}

export default function TestimonialsWindow({ onClose }: TestimonialsWindowProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50 p-4">
            <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white">
                {/* Window header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800">
                    <div
                        className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                        onClick={onClose}
                    ></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 font-semibold">Testimonials</span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {testimonials.map((t, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-800 rounded p-3 space-y-2 sm:space-y-0 sm:space-x-4">
                            <img
                                src={t.image}
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
            </div>
        </div>
    );
}
