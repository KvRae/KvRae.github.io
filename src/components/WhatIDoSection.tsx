

const WhatIDoSection = () => {
    const items = [
        { title: "PLAN", description: "Strategize and structure projects efficiently" },
        { title: "DESIGN", description: "Create UI/UX designs that engage users" },
        { title: "IMPLEMENT", description: "Write clean, maintainable code" },
        { title: "DEPLOY", description: "Launch applications smoothly" },
    ];

    return (
        <section className="w-full flex flex-col justify-center items-center gap-16 py-16 overflow-hidden">
            {/* Header */}
            <div className="w-full px-8 md:px-32">
                <h2
                    className="text-2xl md:text-[32px] text-[var(--color-secondary)] tracking-[4px] md:tracking-[8px]"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
                    WHAT I DO
                </h2>
            </div>

            {/* Items */}
            <div className="flex flex-col w-full">
                {items.map((item, index) => (
                    <div
                        key={item.title}
                        className={`group w-full px-8 md:px-32 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-[var(--color-secondary)]
              ${index === items.length - 1 ? "border-b" : ""}
              transition-all duration-300 cursor-pointer hover:bg-[var(--color-primary)]
            `}
                    >
                        {/* Main Item */}
                        <div
                            className="w-full md:w-auto text-5xl sm:text-6xl md:text-[96px] text-[var(--color-secondary)] lowercase transition-colors duration-300 group-hover:text-black p-4 md:p-0"
                            style={{ fontFamily: "var(--font-bebas)" }}
                        >
                            {item.title}
                        </div>

                        {/* Description (hidden until hover) */}
                        <div
                            className="mt-2 md:mt-0 md:ml-8 text-lg sm:text-xl md:text-[24px] text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-full md:max-w-lg"
                            style={{ fontFamily: "var(--font-bebas)" }}
                        >
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhatIDoSection