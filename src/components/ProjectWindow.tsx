import projects from "../data/projects.json";

interface ProjectsWindowProps {
    onClose: () => void;
}

export default function ProjectsWindow({ onClose }: ProjectsWindowProps) {
    return (
        <div className="absolute top-24 left-24 bg-gray-900 rounded-xl shadow-lg w-3/4 h-3/4 flex flex-col text-white">
            {/* Window header */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800">
                <div
                    className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                    onClick={onClose}
                ></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 font-semibold">Projects</span>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 overflow-y-auto flex-1">
                <ul className="space-y-4">
                    {projects.map((proj, i) => (
                        <li
                            key={i}
                            className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition"
                        >
                            <div className="font-bold text-yellow-400">{proj.name}</div>
                            <div className="text-gray-300 text-sm mb-2">{proj.description}</div>
                            <a
                                href={proj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                View Project
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
