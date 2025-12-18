import { useState } from "react";
import experience from "../../../data/experience.json";

interface ExperienceWindowProps {
    onClose: () => void;
    onMinimize?: () => void;
    isMinimized?: boolean;
}

export default function ExperienceWindow({ onClose, onMinimize, isMinimized = false }: ExperienceWindowProps) {
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const windowStyle = isMaximized ? { maxHeight: "calc(100vh - 110px)" } : undefined;

    if (isMinimized) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className={`bg-[#0d0d0f]/95 border border-yellow-800/40 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full overflow-hidden flex flex-col text-yellow-100 transition-all duration-300 ${
                isMaximized ? 'max-w-full' : 'max-w-4xl max-h-[70vh]'
            }`} style={windowStyle}>

                {/* Header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-[#1a1a1d] border-b border-yellow-800/30 rounded-t-xl">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition" onClick={onClose} />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition" onClick={onMinimize} />
                    <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition" onClick={toggleMaximize} />
                    <span className="ml-2 font-semibold text-yellow-200">Experience</span>
                </div>

                {/* Scrollable Content */}
                <div className="p-4 overflow-y-auto flex-1 space-y-4">
                    {experience.map((exp, i) => (
                        <article
                            key={i}
                            className="p-3 bg-[#141414] border border-yellow-800/20 rounded hover:bg-[#1e1e1f] transition flex items-start space-x-4 shadow-[0_0_5px_rgba(255,215,0,0.1)]"
                        >
                            {/* Company Logo */}
                            <div className="flex-shrink-0 w-12 h-12">
                                <img
                                    src={exp.logoUrl}
                                    alt={`${exp.company} logo`}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>

                            {/* Role & Details */}
                            <div className="flex-1 flex flex-col">
                                <h3 className="font-bold text-yellow-400 break-words">
                                    {exp.role} @ {exp.company}
                                </h3>

                                <p className="text-yellow-300 text-xs mb-2 break-words">{exp.period}</p>

                                <ul className="list-disc list-inside text-yellow-100 text-sm space-y-1">
                                    {exp.description.map((line, j) => (
                                        <li key={j} className="break-words">{line}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
