import Navlayout from "../components/Navlayout.tsx";
import HistorySection from "../components/HistorySection.tsx";
import HeroSection from "../components/HeroSection.tsx";
import AboutSection from "../components/AboutSection.tsx";
import WhatIDoSection from "../components/WhatIDoSection.tsx";
import ExperienceSection from "../components/ExperienceSection.tsx";
import ProjectListSection from "../components/ProjectListSection.tsx";
import TestimonialSection from "../components/TestimonialSection.tsx";
import ConnectSection from "../components/ConnectSection.tsx";
import ProjectSection from "../components/ProjectSection.tsx";


const LandingPage = () => {
    return (
        <>
            <Navlayout />
            <HeroSection/>
            <AboutSection />
            <WhatIDoSection />
            <ExperienceSection/>
            <HistorySection />
            <ProjectSection/>
            <ProjectListSection />
            <TestimonialSection />
            <ConnectSection />
        </>
    )
}


export default LandingPage