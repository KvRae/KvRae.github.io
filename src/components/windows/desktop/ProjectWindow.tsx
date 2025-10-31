import projects from "../../../data/projects.json";

interface ProjectsWindowProps {
    onClose: () => void;
}

export default function ProjectsWindow({ onClose }: ProjectsWindowProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-[#0d0d0f]/95 border border-yellow-800/40 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full max-w-4xl max-h-[70vh] overflow-hidden flex flex-col text-yellow-100">

                {/* Header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-[#1a1a1d] border-b border-yellow-800/30 rounded-t-xl">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose} />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="ml-2 font-semibold text-yellow-200">Projects</span>
                </div>

                {/* Scrollable Content */}
                <div className="p-4 overflow-y-auto flex-1 space-y-4">
                    {projects.map((proj, i) => (
                        <article
                            key={i}
                            className="p-3 bg-[#141414] border border-yellow-800/20 rounded hover:bg-[#1e1e1f] transition flex flex-col space-y-2 shadow-[0_0_5px_rgba(255,215,0,0.1)]"
                        >
                            {/* Project Name */}
                            <h3 className="font-bold text-yellow-400 break-words text-lg">
                                {proj.name}
                            </h3>

                            {/* Description */}
                            <p className="text-yellow-100 text-sm whitespace-normal break-words">
                                {proj.description}
                            </p>

                            {/* Project Links */}
                            <div className="flex flex-wrap items-center space-x-4 pt-1">
                                {proj.link && (
                                    <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-yellow-700 hover:text-yellow-500 break-all max-w-full text-sm font-medium"
                                    >
                                        Visit Site
                                    </a>
                                )}
                                {proj.github && (
                                    <a
                                        href={proj.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-yellow-700 hover:text-yellow-500 break-all max-w-full text-sm font-medium"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {proj.playstore && (
                                    <a
                                        href={proj.playstore}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-yellow-700 hover:text-yellow-500 break-all max-w-full text-sm font-medium"
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
