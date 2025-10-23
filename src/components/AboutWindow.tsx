
interface AboutWindowProps {
    onClose: () => void;
    avatar?: string
    fullName?: string;
    aboutMe?: string;
}

export default function AboutWindow({ onClose,
                                        avatar = "/img/avatar-pixels.png",
                                        fullName = "Karam Mannai",
                                        aboutMe = "I am a passionate developer with experience in creating interactive UIs, building projects, and collaborating on professional software development. I love learning new technologies and improving my coding skills."
                                    }: AboutWindowProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50 p-4">
            <div className="bg-gray-900 rounded-xl shadow-lg w-full max-w-sm max-h-[80vh] overflow-y-auto text-white">
                {/* Window header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose}></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 font-semibold">About Me</span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col items-center space-y-4">
                    <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                    <h2 className="text-xl font-bold">{fullName}</h2>
                    <p className="text-gray-300 text-center">{aboutMe}</p>
                </div>
            </div>
        </div>
    );
}
