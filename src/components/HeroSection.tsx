import heroVideo from "../assets/videos/hero-video.mp4"; // put your video in src/assets/videos

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen flex flex-col justify-start items-center gap-16 pt-16 pb-16 overflow-hidden">
            {/* Background video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={heroVideo}
                autoPlay
                loop
                muted
            />

            {/* Optional overlay for better readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

            {/* Content */}
            <div className="relative flex flex-col justify-start items-center gap-12 h-[790px] py-8 w-full">
                {/* Logo */}
                <h1
                    className="text-[var(--color-secondary)] text-3xl tracking-widest"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
                    Karam MANNAI
                </h1>

                {/* Tagline */}
                <div className="flex flex-col text-center">
          <span
              className="text-[var(--color-secondary)] text-[164px] leading-[128px]"
              style={{ fontFamily: "var(--font-bebas)" }}
          >
            MAKING
          </span>
                    <span
                        className="text-[var(--color-primary)] text-[164px] leading-[128px]"
                        style={{ fontFamily: "var(--font-bebas)" }}
                    >
            GOOD
          </span>
                    <span
                        className="text-[var(--color-primary)] text-[164px] leading-[128px]"
                        style={{ fontFamily: "var(--font-bebas)" }}
                    >
            SHIT
          </span>
                    <span
                        className="text-[var(--color-secondary)] text-[164px] leading-[128px]"
                        style={{ fontFamily: "var(--font-bebas)" }}
                    >
            SINCE
          </span>
                    <span
                        className="text-[var(--color-secondary)] text-[164px] leading-[128px]"
                        style={{ fontFamily: "var(--font-bebas)" }}
                    >
            2021
          </span>
                </div>
            </div>
        </section>
    )
}

export default HeroSection