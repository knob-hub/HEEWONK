import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import g1 from "@/assets/gallery-01.jpg";
import g2 from "@/assets/gallery-02.jpg";
import g3 from "@/assets/gallery-03.jpg";
import g4 from "@/assets/gallery-04.jpg";
import g5 from "@/assets/gallery-05.jpg";
import g6 from "@/assets/gallery-06.jpg";
import g7 from "@/assets/gallery-07.jpg";
import g8 from "@/assets/gallery-08.jpg";
import g9 from "@/assets/gallery-09.jpg";

// 썸네일 (그리드용 - 작고 빠름)
import t1 from "@/assets/thumbs/gallery-01.jpg";
import t2 from "@/assets/thumbs/gallery-02.jpg";
import t3 from "@/assets/thumbs/gallery-03.jpg";
import t4 from "@/assets/thumbs/gallery-04.jpg";
import t5 from "@/assets/thumbs/gallery-05.jpg";
import t6 from "@/assets/thumbs/gallery-06.jpg";
import t7 from "@/assets/thumbs/gallery-07.jpg";
import t8 from "@/assets/thumbs/gallery-08.jpg";
import t9 from "@/assets/thumbs/gallery-09.jpg";

const images = [g1, g2, g3, g4, g5, g6, g7, g8, g9];
const thumbs = [t1, t2, t3, t4, t5, t6, t7, t8, t9];

const GallerySection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  // 풀스크린 진입 시 모든 풀 이미지 미리 로드 (전환 빠르게)
  useEffect(() => {
    if (openIndex !== null) {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [openIndex]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setOpenIndex((p) => (p === null ? p : (p + dir + images.length) % images.length));
    },
    []
  );

  // ESC키, 화살표 키 지원
  useEffect(() => {
    if (openIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openIndex, go]);

  return (
    <>
      <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto">
        {thumbs.map((thumb, i) => (
          <motion.button
            key={i}
            onClick={() => setOpenIndex(i)}
            className="aspect-square overflow-hidden rounded-lg relative"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <img
              src={thumb}
              alt={`Photo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ background: "hsl(0 0% 0% / 0.95)" }}
            onClick={() => setOpenIndex(null)}
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
              onClick={(e) => { e.stopPropagation(); setOpenIndex(null); }}
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
                key={openIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={images[openIndex]}
                alt={`Photo ${openIndex + 1}`}
                className="max-w-[92%] max-h-[85vh] object-contain rounded-xl"
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
                    background: i === openIndex ? "hsl(0 0% 85%)" : "hsl(0 0% 35%)",
                    transform: i === openIndex ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-wider"
              style={{ color: "hsl(0 0% 50%)" }}>
              {openIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
