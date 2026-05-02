import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "희원 ♥ 유정 결혼합니다",
          text: "2026년 7월 4일 토요일 오후 2시\n더테라스 웨딩 11층",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("링크가 복사되었습니다");
      }
    } catch {
      // User cancelled
    }
  };

  return (
    <section ref={ref} className="py-28 px-6 pb-20 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="max-w-md mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <p
            className="text-5xl mb-4 font-light italic tracking-wide"
            style={{
              color: "hsl(var(--gold-light))",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Thank You
          </p>
          <p className="text-[11px] tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
            참석해 주셔서 감사합니다
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-[11px] font-medium transition-all hover:scale-105 active:scale-95"
          style={{
            background: "hsl(var(--glass-bg))",
            backdropFilter: "blur(12px)",
            border: "1px solid hsl(var(--glass-border))",
            color: "hsl(var(--text-romantic))",
          }}
        >
          <Share2 className="w-3.5 h-3.5" />
          청첩장 공유하기
        </motion.button>

        {/* Minimal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="h-px w-8 mx-auto mb-6" style={{ background: "hsl(var(--border))" }} />
          <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>
            희원 & 유정
          </p>
          <p className="text-[9px] tracking-[0.2em] mt-1" style={{ color: "hsl(var(--border))" }}>
            2026. 07. 04
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FooterSection;
