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
            <div className="bg-[#0d0d0f]/95 border border-yellow-800/40 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.15)] w-full max-w-3xl h-[600px] overflow-hidden text-yellow-100 flex flex-col">
                {/* Android Studio Header - Mac Style */}
                <div className="flex items-center justify-between px-2 sm:px-3 py-2 bg-[#1a1a1d] border-b border-yellow-800/30 rounded-t-xl flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition" onClick={onClose}></button>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="ml-2 sm:ml-3 font-semibold text-yellow-200">com.kvrae.about</span>
                        <span className="text-[10px] sm:text-xs text-yellow-400 ml-1">●</span>
                    </div>
                </div>

                {/* Toolbar - Project Name & Build Actions */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#141414] border-b border-yellow-800/20 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        {/* Android Logo */}
                        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z"/>
                        </svg>
                        {/* Git Icon */}
                        <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.62,11.108l-9.681-9.681c-0.49-0.49-1.285-0.49-1.775,0l-2.01,2.01l2.549,2.549c0.521-0.175,1.117-0.057,1.533,0.358c0.418,0.418,0.535,1.017,0.358,1.538l2.458,2.458c0.521-0.177,1.121-0.06,1.538,0.358c0.581,0.581,0.581,1.524,0,2.104c-0.581,0.581-1.524,0.581-2.105,0c-0.439-0.439-0.547-1.084-0.328-1.623l-2.293-2.293l0,6.032c0.142,0.07,0.275,0.163,0.393,0.281c0.581,0.581,0.581,1.524,0,2.104c-0.581,0.581-1.524,0.581-2.105,0c-0.581-0.581-0.581-1.524,0-2.104c0.144-0.144,0.314-0.254,0.497-0.331l0-6.09c-0.183-0.077-0.353-0.187-0.497-0.331c-0.441-0.441-0.549-1.09-0.328-1.631L6.268,3.795L2.38,7.683c-0.49,0.49-0.49,1.285,0,1.775l9.681,9.681c0.49,0.49,1.285,0.49,1.775,0l9.583-9.583C22.11,12.393,22.11,11.598,21.62,11.108z"/>
                        </svg>
                        <span className="text-yellow-200 text-xs font-semibold">KvRae Portfolio</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Build/Make Project */}
                        <button
                            className="p-1.5 rounded hover:bg-yellow-800/20 transition text-yellow-100/70 hover:text-yellow-200"
                            title="Build Project"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </button>

                        {/* Run */}
                        <button
                            className="p-1.5 rounded bg-green-600/80 hover:bg-green-600 transition text-white"
                            title="Run"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </button>

                        {/* Debug */}
                        <button
                            className="p-1.5 rounded hover:bg-yellow-800/20 transition text-yellow-100/70 hover:text-yellow-200"
                            title="Debug"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Tab Bar */}
                <div className="flex bg-[#141414] border-b border-yellow-800/20 overflow-x-auto flex-shrink-0">
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
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar - Project Structure - Hidden on mobile */}
                    <div className="hidden sm:flex sm:flex-col w-48 bg-[#141414] border-r border-yellow-800/20 p-3 text-xs font-mono overflow-y-auto">
                        <div>
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
                        </div>

                        <div className="mt-auto pt-3">
                            <img
                                src={avatar}
                                alt="Avatar"
                                className="w-20 h-20 rounded-lg object-cover border border-yellow-500/50 shadow-[0_0_8px_rgba(255,215,0,0.3)]"
                            />
                        </div>
                    </div>

                    {/* Code Editor Area */}
                    <div className="flex-1 p-2 sm:p-4 overflow-y-auto bg-[#0b0b0d]">
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

                {/* Build Console Area */}
                <div className="border-t border-yellow-800/20 bg-[#0b0b0d] h-28 overflow-y-auto flex-shrink-0">
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#141414] border-b border-yellow-800/20">
                        <span className="text-[10px] text-yellow-400 font-semibold">BUILD</span>
                        <span className="text-[9px] text-yellow-100/60">Gradle Build</span>
                    </div>
                    <div className="p-2 font-mono text-[10px] sm:text-[11px] text-yellow-100/80 space-y-0.5">
                        <div className="text-yellow-400">&gt; Task :app:compileKotlin</div>
                        <div className="text-yellow-100/60">Compiling with Kotlin compiler version 1.9.20</div>
                        <div className="text-green-400">&gt; Task :app:build SUCCESS</div>
                        <div className="text-yellow-100/60 mt-1">BUILD SUCCESSFUL in 2s</div>
                        <div className="text-yellow-100/60">3 actionable tasks: 3 executed</div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-2 sm:px-3 py-0.5 bg-[#1a1a1d] text-[10px] sm:text-[11px] font-mono text-yellow-100/70 border-t border-yellow-800/30 flex-shrink-0">
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
