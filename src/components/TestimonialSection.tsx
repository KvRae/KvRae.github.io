import { useRef, useState, useEffect, type CSSProperties } from "react";

const testimonials = [
    {
        text: "over a decade of experience in building software, contributing in open source projects, freelancing on different platforms, and different clients",
        author: "KARAM MANNAI",
        img: "https://images.pexels.com/photos/6957184/pexels-photo-6957184.png",
    },
    {
        text: "over a decade of experience in building software, contributing in open source projects, freelancing on different platforms, and different clients",
        author: "KARAM MANNAI",
        img: "https://images.pexels.com/photos/3533228/pexels-photo-3533228.png",
    },
    {
        text: "over a decade of experience in building software, contributing in open source projects, freelancing on different platforms, and different clients",
        author: "KARAM MANNAI",
        img: "https://images.pexels.com/photos/3289620/pexels-photo-3289620.jpeg",
    },
];

const TestimonialSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [fixedStyle, setFixedStyle] = useState<CSSProperties>({
        position: "absolute",
        top: 0,
    });

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const section = containerRef.current;
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;
            const pictureHeight = 112; // image + gap

            // Stick to top of viewport when section top <= 0
            if (rect.top <= 32 && rect.bottom >= viewportHeight) {
                setFixedStyle({ position: "fixed", top: 32, right: 32 });
            }
            // Section not yet reached
            else if (rect.top > 32) {
                setFixedStyle({ position: "absolute", top: 0, right: 32 });
            }
            // Section passed
            else {
                setFixedStyle({ position: "absolute", top: sectionHeight - pictureHeight, right: 32 });
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const elements = containerRef.current?.querySelectorAll(".testimonial-item");
        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setActiveIndex(index);
                    }
                });
            },
            { threshold: 0.5 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full flex flex-col justify-center items-center gap-16 py-16 px-8 md:px-16 lg:px-32 relative overflow-hidden"
        >
            {/* Header */}
            <div className="w-full">
                <h2
                    className="text-[32px] text-[var(--color-secondary)] tracking-[8px]"
                    style={{ fontFamily: "var(--font-bebas)" }}
                >
                    WHAT PEOPLE SAID
                </h2>
            </div>

            <div className="w-full flex flex-col md:flex-row relative">
                {/* Testimonials */}
                <div className="flex-1 flex flex-col divide-y divide-[var(--color-secondary)]">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="testimonial-item py-16 flex flex-col gap-8"
                            data-index={index}
                        >
                            <p className="flex flex-row flex-wrap text-[48px] sm:text-4xl md:text-[48px] leading-snug px-4 md:px-16 lg:px-32">
                                <span className="text-[var(--color-primary)]">“ </span>
                                <span className="text-[var(--color-secondary)]">{item.text}</span>
                                <span className="text-[var(--color-primary)]"> ”</span>
                            </p>
                            <div
                                className="text-[32px] text-[var(--color-secondary)] px-4 md:px-16 lg:px-32"
                                style={{ fontFamily: "var(--font-bebas)" }}
                            >
                                {item.author}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Author pictures */}
                <div className="hidden md:flex flex-col gap-8">
                    <div style={fixedStyle}>
                        {testimonials.map((item, index) => (
                            <img
                                key={index}
                                src={item.img}
                                alt={item.author}
                                className={`w-32 h-28 rounded-full object-cover transition-opacity duration-500 ${
                                    activeIndex === index ? "opacity-100" : "opacity-20"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
