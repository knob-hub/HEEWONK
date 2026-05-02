import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/wedding/HeroSection";
import InfoSection from "@/components/wedding/InfoSection";
import { GalleryOverlay } from "@/components/wedding/GallerySection";
import AccountSection from "@/components/wedding/AccountSection";
import BGMPlayer from "@/components/wedding/BGMPlayer";
import WatercolorBackground from "@/components/wedding/WatercolorBackground";
import FloatingPetals from "@/components/wedding/FloatingPetals";
import SparkleEffect from "@/components/wedding/SparkleEffect";

const Index = () => {
  const bgmSrc = "/bgm/wedding-music.mp3";
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <main className="min-h-screen relative">
      <WatercolorBackground />
      <FloatingPetals />
      <SparkleEffect />
      <BGMPlayer audioSrc={bgmSrc} />
      <div className="relative z-10">
        <HeroSection />

        <InfoSection onGalleryOpen={() => setGalleryOpen(true)} />
        <AccountSection />
      </div>

      <AnimatePresence>
        {galleryOpen && <GalleryOverlay onClose={() => setGalleryOpen(false)} />}
      </AnimatePresence>
    </main>
  );
};

export default Index;
