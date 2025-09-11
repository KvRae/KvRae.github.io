
import { SiLinkedin, SiGithub, SiFacebook, SiMedium } from "react-icons/si"; // example icons

const Navlayout = () => {
    return (
        <nav className="fixed top-0 left-0 w-full h-full flex flex-col justify-between px-16 py-16 pointer-events-none z-50">
            {/* Top section: logo + menu */}
            <div className="flex justify-between items-start w-full pointer-events-auto">
                <div
                    className="text-[40px] text-[var(--color-secondary)]"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
                    LOGO
                </div>

                <div className="flex flex-col gap-2 text-[32px] text-[var(--color-secondary)] pointer-events-auto" dir={"rtl"}>
                    <div style={{ fontFamily: "var(--font-bebas)" }}>About</div>
                    <div style={{ fontFamily: "var(--font-bebas)" }}>Experience</div>
                    <div style={{ fontFamily: "var(--font-bebas)" }}>Contact</div>
                </div>
            </div>

            {/* Bottom section: social icons + vertical text */}
            <div className="flex justify-between items-center w-full pointer-events-auto">
                {/* Social icons */}
                <div className="flex flex-col gap-4 text-[var(--color-secondary)] text-2xl">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <SiLinkedin />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <SiGithub />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <SiFacebook />
                    </a>
                    <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
                        <SiMedium />
                    </a>
                </div>

                {/* Vertical text */}
                <div
                    className="text-[32px] text-[var(--color-secondary)] rotate-[-90deg] origin-top-right p"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
                    BEATS ON
                </div>
            </div>
        </nav>
    )
}

export default Navlayout