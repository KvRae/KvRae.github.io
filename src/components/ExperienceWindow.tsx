import experience from "../data/experience.json";

interface ExperienceWindowProps {
    onClose: () => void;
}

export default function ExperienceWindow({ onClose }: ExperienceWindowProps) {
    return (
        <div className="absolute top-28 left-28 bg-gray-900 rounded-xl shadow-lg w-3/4 h-3/4 flex flex-col text-white">
            {/* Window header */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800">
                <div
                    className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                    onClick={onClose}
                ></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 font-semibold">Experience</span>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 overflow-y-auto flex-1">
                <ul className="space-y-4">
                    {experience.map((exp, i) => (
                        <li
                            key={i}
                            className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition"
                        >
                            <div className="font-bold text-yellow-400">
                                {exp.role} @ {exp.company}
                            </div>
                            <div className="text-gray-400 text-xs mb-2">{exp.period}</div>
                            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                {exp.description.map((line, j) => (
                                    <li key={j}>{line}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
