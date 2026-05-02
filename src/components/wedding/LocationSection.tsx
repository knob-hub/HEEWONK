import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Navigation, Car, Train } from "lucide-react";

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleNaverMap = () => {
    window.open("https://map.naver.com/v5/search/경기 고양시 일산동구 강석로 9", "_blank");
  };
  const handleKakaoMap = () => {
    window.open("https://map.kakao.com/link/search/경기 고양시 일산동구 강석로 9", "_blank");
  };

  return (
    <section ref={ref} className="py-28 px-6 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        className="max-w-md mx-auto"
      >
        <p className="section-label">Location</p>
        <h2 className="wedding-title">오시는 길</h2>
        <div className="wedding-divider" />

        {/* Venue info card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="wedding-card mb-6"
        >
          <div className="text-center mb-5">
            <p className="font-medium text-foreground text-base tracking-wider mb-1" style={{ fontFamily: "'Gowun Batang', serif" }}>
              더테라스 웨딩
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
              경기 고양시 일산동구 강석로 9 · 11층
            </p>
          </div>

          <div className="h-px w-12 mx-auto mb-5" style={{ background: "hsl(var(--border))" }} />

          <div className="flex items-center justify-center gap-2">
            <Phone className="w-3 h-3" style={{ color: "hsl(var(--gold))" }} />
            <a
              href="tel:031-905-1001"
              className="text-xs transition-colors hover:underline"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              031-905-1001
            </a>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-3xl aspect-video mb-4 overflow-hidden"
          style={{ boxShadow: "var(--glass-shadow)" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.5!2d126.7685!3d37.6425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6rK96riwIOqzoOyWkeyLnCDsnbzsgrDrj5nqtawg6rCV7ISd66GcIDk!5e0!3m2!1sko!2skr!4v1704067200000!5m2!1sko!2skr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="더테라스 웨딩 위치"
          />
        </motion.div>

        {/* Map Buttons — pill style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-2 mb-10"
        >
          <button
            onClick={handleNaverMap}
            className="flex-1 py-3 rounded-full text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "hsl(var(--glass-bg))",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(var(--glass-border))",
              color: "hsl(var(--foreground))",
            }}
          >
            <Navigation className="w-3 h-3" />
            네이버 지도
          </button>
          <button
            onClick={handleKakaoMap}
            className="flex-1 py-3 rounded-full text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "hsl(var(--glass-bg))",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(var(--glass-border))",
              color: "hsl(var(--foreground))",
            }}
          >
            <Navigation className="w-3 h-3" />
            카카오맵
          </button>
        </motion.div>

        {/* Transportation — inline tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-3"
        >
          <div className="wedding-card flex items-start gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(var(--gold) / 0.1)" }}>
              <Train className="w-3.5 h-3.5" style={{ color: "hsl(var(--gold))" }} />
            </div>
            <div>
              <p className="font-medium text-foreground text-xs mb-1 tracking-wider">지하철</p>
              <p className="text-[11px] leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                3호선 백석역 5,6번 출구에서 도보 5분
              </p>
            </div>
          </div>

          <div className="wedding-card flex items-start gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(var(--gold) / 0.1)" }}>
              <Car className="w-3.5 h-3.5" style={{ color: "hsl(var(--gold))" }} />
            </div>
            <div>
              <p className="font-medium text-foreground text-xs mb-1 tracking-wider">주차 안내</p>
              <p className="text-[11px] leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                건물 주차장 이용 (2시간 무료)
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LocationSection;
