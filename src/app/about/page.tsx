import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import Stats from "@/components/about/Stats";
import Team from "@/components/about/Team";
import Values from "@/components/about/Values";
import CTA from "@/components/common/CTA";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <Values />
      <Stats />
      <Team />
      <CTA />
    </>
  );
};

export default AboutPage;
