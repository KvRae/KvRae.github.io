const ContactSection = () => {
    const linksCol1 = ["LINKEDIN", "GITHUB", "MEDIUM"];
    const linksCol2 = ["INSTAGRAM", "TIKTOK", "FACEBOOK"];

    return (
        <section className="w-full px-8 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between items-start gap-16">
            {/* Column 1 */}
            <ul className="flex flex-col gap-4 px-4 list-none">
                {linksCol1.map((item) => (
                    <li
                        key={item}
                        className="flex items-center gap-3 text-[40px] text-[var(--color-secondary)]"
                        style={{ fontFamily: "var(--font-bebas)" }}
                    >
                        <span className="w-0 h-0 border-l-[12px] border-l-[var(--color-primary)] border-y-[8px] border-y-transparent"></span>
                        {item.toLowerCase()}
                    </li>
                ))}
            </ul>

            {/* Column 2 */}
            <ul className="flex flex-col gap-4 px-4 list-none">
                {linksCol2.map((item) => (
                    <li
                        key={item}
                        className="flex items-center gap-3 text-[40px] text-[var(--color-secondary)]"
                        style={{ fontFamily: "var(--font-bebas)" }}
                    >
                        <span className="w-0 h-0 border-l-[12px] border-l-[var(--color-primary)] border-y-[8px] border-y-transparent"></span>
                        {item.toLowerCase()}
                    </li>
                ))}
            </ul>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 px-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className="w-0 h-0 border-l-[10px] border-l-[var(--color-primary)] border-y-[6px] border-y-transparent"></span>
                        <span
                            className="text-[32px] text-[var(--color-secondary)]"
                            style={{ fontFamily: "var(--font-bebas)" }}
                        >
              email
            </span>
                    </div>
                    <div
                        className="text-[24px] text-[var(--color-secondary)] pl-6"
                        style={{ fontFamily: "var(--font-bebas)" }}
                    >
                        karam.mannai@hotmail.com
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className="w-0 h-0 border-l-[10px] border-l-[var(--color-primary)] border-y-[6px] border-y-transparent"></span>
                        <span
                            className="text-[32px] text-[var(--color-secondary)]"
                            style={{ fontFamily: "var(--font-bebas)" }}
                        >
              whatsapp
            </span>
                    </div>
                    <div
                        className="text-[24px] text-[var(--color-secondary)] pl-6"
                        style={{ fontFamily: "var(--font-bebas)" }}
                    >
                        +216 99 026 017
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
