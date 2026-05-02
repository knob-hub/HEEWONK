import HeroSection from "@/components/wedding/HeroSection";
import InfoSection from "@/components/wedding/InfoSection";
import AccountSection from "@/components/wedding/AccountSection";
import BGMPlayer from "@/components/wedding/BGMPlayer";
import WatercolorBackground from "@/components/wedding/WatercolorBackground";

const Index = () => {
  const bgmSrc = "/bgm/wedding-music.mp3";

  return (
    <main className="min-h-screen relative">
      <WatercolorBackground />
      <BGMPlayer audioSrc={bgmSrc} />
      <div className="relative z-10">
        <HeroSection />
        <InfoSection />
        <AccountSection />
      </div>
    </main>
  );
};

export default Index;
