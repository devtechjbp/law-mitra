import HeroSection from "@/components/home/HeroSection";
import KnowYourRights from "@/components/home/KnowYourRights";
import FeaturedActs from "@/components/home/FeaturedActs";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import LandmarkCases from "@/components/home/LandmarkCases";

export default function HomePage() {
  return (
    <div style={{ paddingBottom: "40px" }}>
      <HeroSection />
      <FeaturedActs />
      <KnowYourRights />
      <LandmarkCases />
      <ConsultationCTA />
    </div>
  );
}
