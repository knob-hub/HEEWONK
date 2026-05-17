import { motion, type Variants, type Easing } from "framer-motion";
import couplePhoto from "@/assets/main.jpg";

const ease: Easing = [0.25, 0.46, 0.45, 0.94];

// "WEDDING INVITATION" 글자 하나씩 차례로 등장
const letterContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const letter: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// 이름: 살짝 확대되며 블러가 풀리는 우아한 등장
const nameVariant: Variants = {
  initial: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease },
  },
};

// 가운데 세로선: 위아래로 그려지듯
const lineVariant: Variants = {
  initial: { scaleY: 0, opacity: 0 },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.7, ease },
  },
};

// 날짜/장소: 부드럽게 위로 떠오름
const fadeUp: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const TITLE = "WEDDING  INVITATION";

const HeroSection = () => {
  return (
    <section className="min-h-[100dvh] flex flex-col items-center px-8 relative overflow-hidden">
      {/* 첫 화면 — 글자 묶음을 화면 중앙에 정확히 배치 (dvh = 모바일 주소창 보정) */}
      <div className="h-[100dvh] w-full flex items-center justify-center relative">
        <div className="text-center relative z-10">
          {/* WEDDING INVITATION — 글자 하나씩 cascade */}
          <motion.p
            className="text-[9px] tracking-[0.5em] uppercase mb-10 font-light"
            style={{ color: "hsl(var(--muted-foreground))" }}
            variants={letterContainer}
            initial="initial"
            animate="animate"
            aria-label="Wedding Invitation"
          >
            {TITLE.split("").map((char, i) => (
              <motion.span key={i} variants={letter} className="inline-block">
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <motion.div
              className="text-center"
              variants={nameVariant}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.0, duration: 1.1, ease }}
            >
              <p className="text-[10px] tracking-wider mb-2" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
                김정석 · 이미전<span className="text-[9px]">의 아들</span>
              </p>
              <h1
                className="text-[28px] md:text-4xl font-light tracking-[0.15em]"
                style={{ fontFamily: "'Gowun Batang', serif", color: "hsl(var(--text-romantic))" }}
              >
                김희원
              </h1>
            </motion.div>

            <motion.span
              className="w-px h-10 origin-center inline-block"
              style={{ background: "hsl(var(--blush))" }}
              variants={lineVariant}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.3, duration: 0.7, ease }}
            />

            <motion.div
              className="text-center"
              variants={nameVariant}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.1, duration: 1.1, ease }}
            >
              <p className="text-[10px] tracking-wider mb-2" style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}>
                최상득 · 김경희<span className="text-[9px]">의 딸</span>
              </p>
              <h1
                className="text-[28px] md:text-4xl font-light tracking-[0.15em]"
                style={{ fontFamily: "'Gowun Batang', serif", color: "hsl(var(--text-romantic))" }}
              >
                최유정
              </h1>
            </motion.div>
          </div>

          <motion.p
            className="text-[11px] tracking-[0.25em] font-light"
            style={{ color: "hsl(var(--muted-foreground))" }}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.8, duration: 0.9, ease }}
          >
            2026. 07. 04 SAT · PM 2:00
          </motion.p>
          <motion.p
            className="text-[10px] tracking-wider mt-1.5"
            style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 2.0, duration: 0.9, ease }}
          >
            더테라스 웨딩 11층
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6"
            style={{ background: "linear-gradient(to bottom, hsl(var(--blush)), transparent)" }}
          />
        </motion.div>
      </div>

      {/* 커플 사진 — 첫 화면 아래로 (스크롤해야 보임) */}
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
