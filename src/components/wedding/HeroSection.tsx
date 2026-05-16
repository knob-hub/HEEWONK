import { motion, type Easing } from "framer-motion";
import couplePhoto from "@/assets/1.jpg";

const ease: Easing = [0.25, 0.46, 0.45, 0.94];

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center px-8 relative overflow-hidden">
      {/* First screen — names centered in the viewport */}
      <div className="h-screen w-full flex items-center justify-center relative">
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
        >
          <p
            className="text-[9px] tracking-[0.5em] uppercase mb-10 font-light"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Wedding Invitation
          </p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <p className="text-[10px] tracking-wider mb-2" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
                김정석 · 이미전<span className="text-[9px]">의 아들</span>
              </p>
              <h1
                className="text-[28px] md:text-4xl font-light tracking-[0.15em]"
                style={{ fontFamily: "'Gowun Batang', serif", color: "hsl(var(--text-romantic))" }}
              >
                김희원
              </h1>
            </div>
            <span className="w-px h-10" style={{ background: "hsl(var(--blush))" }} />
            <div className="text-center">
              <p className="text-[10px] tracking-wider mb-2" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
                최상득 · 김경희<span className="text-[9px]">의 딸</span>
              </p>
              <h1
                className="text-[28px] md:text-4xl font-light tracking-[0.15em]"
                style={{ fontFamily: "'Gowun Batang', serif", color: "hsl(var(--text-romantic))" }}
              >
                최유정
              </h1>
            </div>
          </div>

          <p className="text-[11px] tracking-[0.25em] font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
            2026. 07. 04 SAT · PM 2:00
          </p>
          <p className="text-[10px] tracking-wider mt-1.5" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
            더테라스 웨딩 11층
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6"
            style={{ background: "linear-gradient(to bottom, hsl(var(--blush)), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Couple photo — below the fold, revealed on scroll */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="flex justify-center w-full pb-20 relative z-10"
      >
        <img
          src={couplePhoto}
          alt="커플 사진"
          className="rounded-xl shadow-lg"
          style={{
            objectFit: "contain",
            width: "100%",
            maxWidth: "280px",
            boxShadow: "0 8px 30px hsl(var(--blush) / 0.3)",
          }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
