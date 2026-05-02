import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import g1 from "@/assets/gallery-01.jpg";
import g2 from "@/assets/gallery-02.jpg";
import g3 from "@/assets/gallery-03.jpg";
import g4 from "@/assets/gallery-04.jpg";
import g5 from "@/assets/gallery-05.jpg";
import g6 from "@/assets/gallery-06.jpg";
import g7 from "@/assets/gallery-07.jpg";
import g8 from "@/assets/gallery-08.jpg";
import g9 from "@/assets/gallery-09.jpg";

const images = [g1, g2, g3, g4, g5, g6, g7, g8, g9];

const GalleryButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="account-btn flex items-center gap-2 text-[11px] tracking-wider"
    whileTap={{ scale: 0.96 }}
  >
    <Images className="w-3.5 h-3.5" />
    갤러리 보기
  </motion.button>
);

const GalleryOverlay = ({ onClose }: { onClose: () => void }) => {
  const [current, setCurrent] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setCurrent((p) => (p + dir + images.length) % images.length),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: "hsl(30 5% 5% / 0.95)" }}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button
        className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 80%)" }}
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </button>

      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "hsl(0 0% 100% / 0.08)", color: "hsl(0 0% 70%)" }}
        onClick={(e) => { e.stopPropagation(); go(-1); }}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          src={images[current]}
          alt={`Photo ${current + 1}`}
          className="max-w-[90%] max-h-[85vh] object-contain rounded-xl"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "hsl(0 0% 100% / 0.08)", color: "hsl(0 0% 70%)" }}
        onClick={(e) => { e.stopPropagation(); go(1); }}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: i === current ? "hsl(0 0% 85%)" : "hsl(0 0% 35%)",
              transform: i === current ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>

      <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-wider"
        style={{ color: "hsl(0 0% 50%)" }}>
        {current + 1} / {images.length}
      </p>
    </motion.div>
  );
};

export { GalleryButton, GalleryOverlay };
export default GalleryButton;
