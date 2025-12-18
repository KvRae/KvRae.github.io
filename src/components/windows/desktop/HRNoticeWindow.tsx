import avatarImage from "../../../assets/avatar-pixels.png";

interface HRNoticeWindowProps {
    onClose: () => void;
}

export default function HRNoticeWindow({ onClose }: HRNoticeWindowProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-[#0d0d0f]/95 border border-yellow-800/40 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full max-w-xl overflow-hidden text-yellow-100">
                {/* Header */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-[#1a1a1d] border-b border-yellow-800/30 rounded-t-xl">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose} />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="ml-2 font-semibold text-yellow-200">Welcome Message</span>
                </div>

                {/* Chat-style body */}
                <div className="p-4 space-y-3 bg-[#0f0f12]">
                    <div className="bg-gradient-to-br from-[#141418] to-[#121214] border border-yellow-800/30 rounded-lg p-3 sm:p-4 shadow-[0_0_8px_rgba(255,215,0,0.08)] space-y-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={avatarImage}
                                alt="Kvrae avatar"
                                className="w-12 h-12 rounded-full border border-yellow-400/50 shadow-[0_0_10px_rgba(255,215,0,0.2)]"
                            />
                            <div>
                                <div className="text-yellow-200 font-semibold text-sm sm:text-base">Kvrae</div>
                                <div className="text-yellow-300 text-xs sm:text-sm">Special access note</div>
                            </div>
                        </div>

                        <div className="text-yellow-100 text-sm sm:text-base leading-relaxed space-y-2">
                            <p>Oh, you’ve got special access to bypass my login—no excuses left to hire me now. 😉</p>
                            <p>Enjoy your stay! If you’d like a tour or more context, I’m happy to walk you through.</p>
                            <p className="text-yellow-200/90 text-xs sm:text-sm">Ping me anytime via email or LinkedIn—glad to help.</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={onClose}
                            className="px-3 py-2 rounded-md bg-[#1a1a1d] text-yellow-200 hover:bg-[#222228] border border-yellow-800/40 transition"
                        >
                            Got it
                        </button>
                        <button
                            onClick={onClose}
                            className="px-3 py-2 rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-400 active:bg-yellow-600 shadow-[0_0_8px_rgba(255,215,0,0.35)] transition"
                        >
                            Thank u
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
