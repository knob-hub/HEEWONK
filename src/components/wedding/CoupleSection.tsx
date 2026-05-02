import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const CoupleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        className="max-w-md mx-auto"
      >
        {/* Section label */}
        <p className="section-label">Invitation</p>
        <h2 className="wedding-title">소중한 분들을 초대합니다</h2>
        <div className="wedding-divider" />

        {/* Quote block — editorial style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative text-center mb-14"
        >
          {/* Large decorative quote mark */}
          <span
            className="block text-6xl leading-none mb-4 editorial-number"
            style={{ opacity: 0.2 }}
          >
            "
          </span>
          <p
            className="leading-[2.2] font-light text-sm tracking-wide"
            style={{ color: "hsl(var(--foreground) / 0.65)" }}
          >
            서로 다른 길을 걸어온 저희 두 사람이
            <br />
            이제 같은 길을 함께 걸어가려 합니다.
            <br />
            <br />
            새로운 시작을 하는 날,
            <br />
            귀한 걸음 하시어 축복해 주시면
            <br />
            더없는 기쁨으로 간직하겠습니다.
          </p>
        </motion.div>

        {/* Parents — modern horizontal layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="wedding-card"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase font-light" style={{ color: "hsl(var(--gold))" }}>
                  Groom
                </span>
                <span className="w-4 h-px" style={{ background: "hsl(var(--border))" }} />
                <span className="text-muted-foreground text-xs">김정석 · 이미전의 아들</span>
              </div>
              <span className="font-medium text-foreground tracking-wider">희원</span>
            </div>

            <div className="h-px w-full" style={{ background: "hsl(var(--border) / 0.5)" }} />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase font-light" style={{ color: "hsl(var(--gold))" }}>
                  Bride
                </span>
                <span className="w-4 h-px" style={{ background: "hsl(var(--border))" }} />
                <span className="text-muted-foreground text-xs">최상득 · 김경희의 딸</span>
              </div>
              <span className="font-medium text-foreground tracking-wider">유정</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoupleSection;
