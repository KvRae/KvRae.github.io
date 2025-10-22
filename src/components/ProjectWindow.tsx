import projects from "../data/projects.json";

interface ProjectsWindowProps {
    onClose: () => void;
}

export default function ProjectsWindow({ onClose }: ProjectsWindowProps) {
    return (
        // overlay that centers the window and prevents it from going off-screen
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-4xl max-h-[60vh] overflow-hidden flex flex-col text-white">
                {/* Header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose} />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="ml-2 font-semibold">Projects</span>
                </div>

                {/* Scrollable content */}
                <div className="p-4 overflow-y-auto flex-1 space-y-4">
                    {projects.map((proj, i) => (
                        <article
                            key={i}
                            className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition flex flex-col space-y-2"
                        >
                            {/* Project Name */}
                            <h3 className="font-bold text-yellow-400 break-words text-lg">
                                {proj.name}
                            </h3>

                            {/* Description (Guaranteed String) */}
                            <p className="text-gray-300 text-sm whitespace-normal break-words">
                                {proj.description}
                            </p>

                            {/* Project Links Section */}
                            <div className="flex flex-wrap items-center space-x-4 pt-1">

                                {/* 1. Primary Project Link (Visit Site) */}
                                {proj.link && (
                                    <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 hover:underline break-all max-w-full text-sm font-medium"
                                    >
                                        Visit Site
                                    </a>
                                )}

                                {/* 2. GitHub Link */}
                                {proj.github && (
                                    <a
                                        href={proj.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 break-all max-w-full text-sm font-medium"
                                    >
                                        GitHub
                                    </a>
                                )}

                                {/* 3. Play Store Link */}
                                {proj.playstore && (
                                    <a
                                        href={proj.playstore}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 break-all max-w-full text-sm font-medium"
                                    >
                                        Play Store
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
