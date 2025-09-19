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
                            className="p-3 bg-gray-800 rounded hover:bg-gray-700 transition flex flex-col"
                        >
                            <h3 className="font-bold text-yellow-400 break-words">{proj.name}</h3>

                            {/* make sure description wraps */}
                            <p className="text-gray-300 text-sm mb-2 whitespace-normal break-words">
                                {proj.description}
                            </p>

                            {/* links can be extremely long — force them to break instead of expanding container */}
                            {proj.link && (
                                <a
                                    href={proj.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline break-all max-w-full"
                                >
                                   visit project
                                </a>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
