const HistorySection = () => {
    const historyItems = [
        { period: "2024 - 2025", role: "Ui Developer", company: "Plutopal" },
        { period: "2024 - 2025", role: "Android Engineer", company: "Machinestalk" },
        { period: "2024 - 2025", role: "Mobile Engineer", company: "Slikoo" },
        { period: "2024 - 2025", role: "Full Stack Engineer", company: "Tunisie Telecom" },
    ];

    return (
        <section className="w-full flex flex-col justify-center items-center gap-16 py-16 overflow-hidden">
            {/* Header */}
            <div className="w-full px-8 md:px-32">
                <h2
                    className="text-[32px] text-[var(--color-secondary)] tracking-[8px]"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
                    HISTORY
                </h2>
            </div>

            {/* Items */}
            <div className="w-full flex flex-col px-8 md:px-16 lg:px-32">
                {historyItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--color-secondary)] py-8`}
                    >
                        {/* Period */}
                        <div
                            className="text-[32px] sm:text-4xl md:text-[64px] text-[var(--color-secondary)] lowercase"
                            style={{ fontFamily: "var(--font-bebas)" }}
                        >
                            {item.period}
                        </div>

                        {/* Role + Company */}
                        <div className="mt-4 md:mt-0 flex flex-col md:ml-8">
                            <div
                                className="text-[48px] sm:text-6xl md:text-[96px] text-[var(--color-secondary)] lowercase"
                                style={{ fontFamily: "var(--font-bebas)" }}
                            >
                                {item.role}
                            </div>
                            <div
                                className="text-[24px] sm:text-[28px] md:text-[32px] text-[var(--color-secondary)] mt-2" dir={"rtl"}
                                style={{ fontFamily: "var(--font-bebas)" }}
                            >
                                {item.company}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HistorySection;
