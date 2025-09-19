import experience from "../data/experience.json";

interface ExperienceWindowProps {
    onClose: () => void;
}

export default function ExperienceWindow({ onClose }: ExperienceWindowProps) {
    return (
        // Centered overlay to prevent overflow on small screens
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-4xl max-h-[60vh] overflow-hidden flex flex-col text-white">
                {/* Window header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose} />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="ml-2 font-semibold">Experience</span>
                </div>

                {/* Scrollable content */}
                <div className="p-4 overflow-y-auto flex-1 space-y-4">
                    {experience.map((exp, i) => (
                        <article
                            key={i}
                            className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition flex flex-col"
                        >
                            <h3 className="font-bold text-yellow-400 break-words">
                                {exp.role} @ {exp.company}
                            </h3>

                            <p className="text-gray-400 text-xs mb-2 break-words">{exp.period}</p>

                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                {exp.description.map((line, j) => (
                                    <li key={j} className="break-words">{line}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
