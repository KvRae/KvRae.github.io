

const AboutSection = () => {
    return (
        <section className="w-full flex flex-col justify-center items-center gap-16 px-32 py-16">
            {/* Header */}
            <div className="w-full flex flex-wrap">
        <span
            className="text-[32px] text-[var(--color-secondary)]"
            style={{ fontFamily: "var(--font-bebas)" }}
        >
          ABOUT M
        </span>
                <span
                    className="text-[32px] text-[var(--color-secondary)] tracking-[8px]"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
          E
        </span>
            </div>

            {/* Body */}
            <div className="w-full flex flex-col justify-center">
        <span
            className="text-[64px] text-[var(--color-secondary)] lowercase"
            style={{ fontFamily: "var(--font-bebas)" }}
        >
          i’m a{" "}
            <span
                className="text-[var(--color-primary)]"
                style={{ fontFamily: "var(--font-bebas)" }}
            >
            software engineer
          </span>{" "}
            that works all the time on mobile application development, learning about UI design and user experience.
        </span>
            </div>
        </section>
    )
}

export default AboutSection