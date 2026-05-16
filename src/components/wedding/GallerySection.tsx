import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// 사진 자동 인식 (Vite import.meta.glob)
// → src/assets/gallery-XX.jpg 와 src/assets/thumbs/gallery-XX.jpg 만
//   추가/삭제하면 갤러리에 자동 반영됨. 코드 수정 불필요.
// → 파일명은 반드시 2자리 숫자 (gallery-01.jpg, gallery-02.jpg, ...)
// ─────────────────────────────────────────────────────────────
const fullModules = import.meta.glob("../../assets/gallery-*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const thumbModules = import.meta.glob("../../assets/thumbs/gallery-*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const images = Object.entries(fullModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

const thumbs = Object.entries(thumbModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

// 갤러리 버튼 (InfoSection에서 사용)
export const GalleryButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="account-btn flex items-center gap-2 text-[11px] tracking-wider"
    whileTap={{ scale: 0.96 }}
  >
    <Images className="w-3.5 h-3.5" />
    갤러리 보기
  </motion.button>
);

// 갤러리 오버레이 (바둑판 + 풀스크린)
export const GalleryOverlay = ({ onClose }: { onClose: () => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  // 오버레이가 열리는 순간 풀이미지 백그라운드 프리로드
  // → 썸네일 처음 누르는 순간에도 풀이미지가 캐시에서 즉시 표시됨
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setOpenIndex((p) => (p === null ? p : (p + dir + images.length) % images.length));
    },
    []
  );

  // ESC키, 화살표 키 지원
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openIndex !== null) setOpenIndex(null);
        else onClose();
      }
      if (openIndex !== null) {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openIndex, go, onClose]);

  // 스크롤 락 (오버레이 열린 동안)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{ background: "hsl(30 5% 5% / 0.97)" }}
    >
      {/* 닫기 버튼 (오버레이 전체) */}
      <button
        className="fixed top-5 right-5 z-[70] w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 80%)" }}
        onClick={onClose}
        aria-label="갤러리 닫기"
      >
        <X className="w-4 h-4" />
      </button>

      {/* 헤더 */}
      <div className="pt-16 pb-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase font-light"
           style={{ color: "hsl(0 0% 60%)" }}>
          Gallery
        </p>
        <p className="text-[11px] mt-2" style={{ color: "hsl(0 0% 50%)" }}>
          {images.length}장의 사진
        </p>
      </div>

      {/* 바둑판 그리드 — 즉시 로딩 + 빠른 페이드인 */}
      <div className="px-4 pb-12">
        <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto">
          {thumbs.map((thumb, i) => (
            <motion.button
              key={i}
              onClick={() => setOpenIndex(i)}
              className="aspect-square overflow-hidden rounded-md relative"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: i * 0.015 }}
            >
              <img
                src={thumb}
                alt={`Photo ${i + 1}`}
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* 풀스크린 모달 (썸네일 클릭 시) */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center"
            style={{ background: "hsl(0 0% 0% / 0.97)" }}
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
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>

            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "hsl(0 0% 100% / 0.08)", color: "hsl(0 0% 70%)" }}
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="이전 사진"
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
              aria-label="다음 사진"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-wider"
               style={{ color: "hsl(0 0% 60%)" }}>
              {openIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryOverlay;
