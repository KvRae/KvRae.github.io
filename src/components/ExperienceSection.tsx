


const  ExperienceSection = function(){
    return (
        <section className="w-full flex flex-col justify-center items-center gap-16 px-32 py-16 overflow-hidden">
            {/* Header */}
            <div className="w-full">
                <h2
                    className="text-[32px] text-[var(--color-secondary)] tracking-[8px]"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
                    EXPERIENCE
                </h2>
            </div>

            {/* Description */}
            <div className="w-full flex flex-col justify-center">
                <p
                    className="text-[64px] text-[var(--color-secondary)] lowercase leading-snug"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
                    over a decade of experience in building software, contributing to open source projects, freelancing on different platforms, and collaborating with different clients
                </p>
            </div>
        </section>
    )
}

export default ExperienceSection