import { useState } from "react";
import aboutData from "../../../data/about.json";

interface AboutWindowProps {
    onClose: () => void;
    avatar?: string;
    fullName?: string;
    role?: string;
    aboutMe?: string;
    skills?: string[];
    contactEmail?: string;
    phone?: string;
    socials?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        facebook?: string;
    };
}

export default function AboutWindow({
                                        onClose,
                                        avatar = aboutData.avatar,
                                        fullName = aboutData.fullName,
                                        role = aboutData.role,
                                        aboutMe = aboutData.aboutMe,
                                        skills = aboutData.skills,
                                        contactEmail = aboutData.contactEmail,
                                        phone = aboutData.phone,
                                        socials = aboutData.socials
                                    }: AboutWindowProps) {
    const [activeTab, setActiveTab] = useState<"profile" | "skills" | "contact">("profile");

    const codeContent = {
        profile: `data class Developer(\n    val name: String = "${fullName}",\n    val role: String = "${role}",\n    val bio: String = "${aboutMe}",\n    val passionate: Boolean = true\n)`,
        skills: `val skills = listOf(\n${skills?.map(skill => `    "${skill}"`).join(',\n') || ''}\n)`,
        contact: `data class Contact(\n    val email: String = "${contactEmail || 'N/A'}",\n    val phone: String = "${phone || 'N/A'}",\n    val github: String = "${socials?.github || 'N/A'}",\n    val linkedin: String = "${socials?.linkedin || 'N/A'}",\n    val twitter: String = "${socials?.twitter || 'N/A'}"\n)`
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-2 sm:p-4">
            <div className="bg-[#0d0d0f]/95 border border-yellow-800/40 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full max-w-3xl h-[600px] overflow-hidden text-yellow-100">
                {/* Android Studio Header - Mac Style */}
                <div className="flex items-center justify-between px-2 sm:px-3 py-2 bg-[#1a1a1d] border-b border-yellow-800/30 rounded-t-xl">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition" onClick={onClose}></button>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="ml-2 sm:ml-3 font-semibold text-yellow-200">com.kvrae.aboutme</span>
                        <span className="text-[10px] sm:text-xs text-yellow-400 ml-1">●</span>
                    </div>
                </div>

                {/* Tab Bar */}
                <div className="flex bg-[#141414] border-b border-yellow-800/20 overflow-x-auto">
                    {(["profile", "skills", "contact"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-mono transition-colors whitespace-nowrap relative ${
                                activeTab === tab
                                    ? "bg-[#0d0d0f] text-yellow-300"
                                    : "text-yellow-100/60 hover:bg-[#1a1a1d]"
                            }`}
                        >
                            {tab}.kt
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex flex-col sm:flex-row">
                    {/* Sidebar - Project Structure - Hidden on mobile */}
                    <div className="hidden sm:block w-48 bg-[#141414] border-r border-yellow-800/20 p-3 text-xs font-mono overflow-y-auto h-[490px]">
                        <div className="text-yellow-400 mb-3 font-semibold text-[11px]">PROJECT</div>
                        <div className="space-y-1 text-yellow-100/70">
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-500">▼</span> app
                            </div>
                            <div className="ml-4 flex items-center gap-1">
                                <span className="text-yellow-500">▼</span> src
                            </div>
                            <div className="ml-8 flex items-center gap-1">
                                <span className="text-yellow-500">▼</span> main
                            </div>
                            <div className="ml-12 flex items-center gap-1">
                                <span className="text-yellow-500">▼</span> kotlin
                            </div>
                            <div className="ml-16 flex items-center gap-1 text-yellow-300">
                                <span>📄</span> Profile.kt
                            </div>
                            <div className="ml-16 flex items-center gap-1 text-yellow-300">
                                <span>📄</span> Skills.kt
                            </div>
                            <div className="ml-16 flex items-center gap-1 text-yellow-300">
                                <span>📄</span> Contact.kt
                            </div>
                        </div>

                        <div className="mt-6">
                            <img
                                src={avatar}
                                alt="Avatar"
                                className="w-20 h-20 rounded-lg object-cover border border-yellow-500/50 shadow-[0_0_8px_rgba(255,215,0,0.3)]"
                            />
                        </div>
                    </div>

                    {/* Code Editor Area */}
                    <div className="flex-1 p-2 sm:p-4 overflow-y-auto h-[490px] bg-[#0b0b0d]">
                        <div className="font-mono text-xs sm:text-sm leading-relaxed">
                            {/* Line Numbers */}
                            <div className="flex">
                                <div className="select-none text-yellow-700/40 pr-2 sm:pr-4 text-right text-[10px] sm:text-xs flex-shrink-0 bg-[#0d0d0f]">
                                    {codeContent[activeTab].split('\n').map((_, i) => (
                                        <div key={i} className="px-2">{i + 1}</div>
                                    ))}
                                </div>

                                {/* Code Content with Syntax Highlighting */}
                                <pre className="flex-1 whitespace-pre-wrap break-words overflow-wrap-anywhere">
                                    {activeTab === "profile" && (
                                        <code className="text-[11px] sm:text-sm break-words">
                                            <span className="text-yellow-500">data class</span> <span className="text-yellow-300">Developer</span>{'(\n'}
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">name</span>: <span className="text-yellow-300">String</span> = <span className="text-green-400 break-words">"{fullName}"</span>,<br/>
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">role</span>: <span className="text-yellow-300">String</span> = <span className="text-green-400 break-words">"{role}"</span>,<br/>
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">bio</span>: <span className="text-yellow-300">String</span> = <span className="text-green-400 break-words">"{aboutMe}"</span>,<br/>
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">openToWork</span>: <span className="text-yellow-300">Boolean</span> = <span className="text-blue-400">true</span><br/>
                                            {')'}
                                        </code>
                                    )}
                                    {activeTab === "skills" && (
                                        <code className="text-[11px] sm:text-sm break-words">
                                            <span className="text-yellow-500">val</span> <span className="text-yellow-200">skills</span> = <span className="text-yellow-300">listOf</span>(<br/>
                                            {skills?.map((skill, index) => (
                                                <span key={skill}>
                                                    {'    '}<span className="text-green-400 break-words">"{skill}"</span>{index < (skills.length - 1) ? ',' : ''}<br/>
                                                </span>
                                            ))}
                                            )
                                        </code>
                                    )}
                                    {activeTab === "contact" && (
                                        <code className="text-[11px] sm:text-sm break-words">
                                            <span className="text-yellow-500">data class</span> <span className="text-yellow-300">Contact</span>{'(\n'}
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">email</span>: <span className="text-yellow-300">String</span> = <span className="text-green-400 break-words">"{contactEmail || 'N/A'}"</span>,<br/>
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">phone</span>: <span className="text-yellow-300">String</span> = <span className="text-green-400 break-words">"{phone || 'N/A'}"</span>,<br/>
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">github</span>: <span className="text-yellow-300">String</span> = <span className="text-green-400 break-words">"{socials?.github || 'N/A'}"</span>,<br/>
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">linkedin</span>: <span className="text-yellow-300">String</span> = <span className="text-green-400 break-words">"{socials?.linkedin || 'N/A'}"</span>,<br/>
                                            {'    '}<span className="text-yellow-500">val</span> <span className="text-yellow-200">twitter</span>: <span className="text-yellow-300">String</span> = <span className="text-green-400 break-words">"{socials?.twitter || 'N/A'}"</span><br/>
                                            {')'}
                                        </code>
                                    )}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-2 sm:px-3 py-0.5 bg-[#1a1a1d] text-[10px] sm:text-[11px] font-mono text-yellow-100/70 border-t border-yellow-800/30">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-sm bg-yellow-500 flex items-center justify-center text-[8px] text-black font-bold">K</span>
                            <span className="text-yellow-200">Kotlin</span>
                        </span>
                        <span className="hidden sm:inline text-yellow-100/60">UTF-8</span>
                        <span className="hidden sm:inline text-yellow-100/60">LF</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-yellow-200">Ln {codeContent[activeTab].split('\n').length}</span>
                        <span className="hidden sm:inline text-yellow-100/60">Col 1</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
