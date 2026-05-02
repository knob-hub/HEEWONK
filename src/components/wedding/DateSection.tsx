import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const DateSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const calendarDays = [
    ["일", "월", "화", "수", "목", "금", "토"],
    ["", "", "", "1", "2", "3", "4"],
    ["5", "6", "7", "8", "9", "10", "11"],
    ["12", "13", "14", "15", "16", "17", "18"],
    ["19", "20", "21", "22", "23", "24", "25"],
    ["26", "27", "28", "29", "30", "31", ""],
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        className="max-w-sm mx-auto"
      >
        <p className="section-label">When</p>
        <h2 className="wedding-title">예식 안내</h2>
        <div className="wedding-divider" />

        {/* Big editorial date display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span className="text-7xl editorial-number">4</span>
            <div className="text-left">
              <p className="text-xs tracking-[0.2em] font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
                JULY 2026
              </p>
              <p className="text-xs tracking-wider" style={{ color: "hsl(var(--foreground) / 0.6)" }}>
                토요일 오후 2시
              </p>
            </div>
          </div>
        </motion.div>

        {/* Calendar — clean minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="wedding-card"
        >
          <div className="grid grid-cols-7 gap-0.5 text-center">
            {calendarDays.map((week, weekIdx) =>
              week.map((day, dayIdx) => {
                const isHeader = weekIdx === 0;
                const isWeddingDay = day === "4" && weekIdx > 0;
                const isSunday = dayIdx === 0 && !isHeader;

                return (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`py-2.5 text-xs relative ${
                      isHeader ? "font-medium tracking-wider" : ""
                    }`}
                    style={
                      isHeader
                        ? { color: "hsl(var(--muted-foreground))", fontSize: "10px" }
                        : isWeddingDay
                        ? { color: "hsl(var(--primary-foreground))" }
                        : isSunday
                        ? { color: "hsl(var(--gold))" }
                        : { color: "hsl(var(--foreground) / 0.5)" }
                    }
                  >
                    {isWeddingDay && (
                      <span
                        className="absolute inset-0 m-auto w-8 h-8 rounded-full"
                        style={{ background: "hsl(var(--primary))" }}
                      />
                    )}
                    <span className="relative z-10">{day}</span>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* D-day counter style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-[10px] tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>
            더테라스 웨딩 11층
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DateSection;
