import aboutData from "../../../data/about.json";

interface AboutWindowProps {
    onClose: () => void;
    avatar?: string;
    fullName?: string;
    aboutMe?: string;
}

export default function AboutWindow({
                                        onClose,
                                        avatar = aboutData.avatar,
                                        fullName = aboutData.fullName,
                                        aboutMe = aboutData.aboutMe,
                                    }: AboutWindowProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
            <div className="bg-[#0d0d0f]/95 border border-yellow-700/30 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full max-w-sm max-h-[80vh] overflow-y-auto text-yellow-100">
                {/* Header Bar */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-[#1a1a1d] border-b border-yellow-800/30 rounded-t-xl">
                    <div
                        className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                        onClick={onClose}
                    ></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 font-semibold text-yellow-200">
                        About Me
                    </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col items-center space-y-4">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500/50 shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                    />
                    <h2 className="text-xl font-bold text-yellow-300 drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]">
                        {fullName}
                    </h2>
                    <p className="text-yellow-100/90 text-center leading-relaxed">
                        {aboutMe}
                    </p>
                </div>
            </div>
        </div>
    );
}
