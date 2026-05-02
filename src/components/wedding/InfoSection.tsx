import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Navigation, Phone, Train, Car } from "lucide-react";
import GallerySection from "@/components/wedding/GallerySection";

const InfoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const calendarDays = [
  ["일", "월", "화", "수", "목", "금", "토"],
  ["", "", "", "1", "2", "3", "4"],
  ["5", "6", "7", "8", "9", "10", "11"],
  ["12", "13", "14", "15", "16", "17", "18"],
  ["19", "20", "21", "22", "23", "24", "25"],
  ["26", "27", "28", "29", "30", "31", ""]];


  const handleNaverMap = () => {
    window.open("https://map.naver.com/v5/search/경기 고양시 일산동구 강석로 9", "_blank");
  };
  const handleKakaoMap = () => {
    window.open("https://map.kakao.com/link/search/경기 고양시 일산동구 강석로 9", "_blank");
  };

  return (
    <section ref={ref} className="py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="max-w-sm mx-auto">
        
        {/* Invitation text */}
        <p
          className="text-center text-sm leading-[2.2] font-light mb-14"
          style={{ color: "hsl(var(--foreground) / 0.6)", fontFamily: "'Gowun Batang', serif" }}>
          기쁜 날 입니다.
          <br />
          하나님께서 세우실 가정을 축복해주셔서 감사드립니다.
          <br />
          모든 분들에게 주님의 평강이 넘치길 축복합니다.
        </p>

        {/* Gallery grid */}
        <div className="mb-14">
          <p className="text-center text-[10px] tracking-[0.3em] uppercase mb-6 font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
            Gallery
          </p>
          <GallerySection />
        </div>

        {/* Calendar */}
        <div className="mb-14">
          <p className="text-center text-[10px] tracking-[0.3em] uppercase mb-6 font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
            July 2026
          </p>
          <div
            className="rounded-2xl p-5 max-w-[280px] mx-auto"
            style={{
              background: "hsl(var(--glass-bg))",
              backdropFilter: "blur(16px)",
              border: "1px solid hsl(var(--glass-border))"
            }}>
            
            <div className="grid grid-cols-7 gap-0 text-center">
              {calendarDays.map((week, weekIdx) =>
              week.map((day, dayIdx) => {
                const isHeader = weekIdx === 0;
                const isWeddingDay = day === "4" && weekIdx > 0;
                const isSunday = dayIdx === 0 && !isHeader;

                return (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className="py-2 text-[11px] relative"
                    style={
                    isHeader ?
                    { color: "hsl(var(--muted-foreground))", fontSize: "9px", letterSpacing: "0.15em" } :
                    isWeddingDay ?
                    { color: "hsl(var(--primary-foreground))", fontWeight: 500 } :
                    isSunday ?
                    { color: "hsl(var(--primary))" } :
                    { color: "hsl(var(--foreground) / 0.4)" }
                    }>
                    
                      {isWeddingDay &&
                    <span className="absolute inset-0 m-auto w-7 h-7 rounded-full" style={{ background: "hsl(var(--primary))" }} />
                    }
                      <span className="relative z-10">{day}</span>
                    </div>);

              })
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-6 h-px mx-auto mb-14" style={{ background: "hsl(var(--blush))" }} />

        {/* Location */}
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
            Location
          </p>
          <p className="text-base tracking-wider mb-1" style={{ fontFamily: "'Gowun Batang', serif", color: "hsl(var(--foreground))" }}>
            더테라스 웨딩
          </p>
          <p className="text-[11px] mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
            경기 고양시 일산동구 강석로 9 · 11층
          </p>
          <a href="tel:031-905-1001" className="text-[10px] underline-offset-2 hover:underline" style={{ color: "hsl(var(--muted-foreground))" }}>
            <Phone className="w-2.5 h-2.5 inline mr-1" />
            031-905-1001
          </a>
        </div>

        {/* Map */}
        <div className="rounded-2xl aspect-[16/10] mb-3 overflow-hidden" style={{ border: "1px solid hsl(var(--border) / 0.5)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.5!2d126.7685!3d37.6425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6rK96riwIOqzoOyWkeyLnCDsnbzsgrDrj5nqtawg6rCV7ISd66GcIDk!5e0!3m2!1sko!2skr!4v1704067200000!5m2!1sko!2skr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="더테라스 웨딩 위치" />
          
        </div>

        {/* Map buttons */}
        <div className="flex gap-2 mb-10">
          <button
            onClick={handleNaverMap}
            className="flex-1 py-2.5 rounded-full text-[10px] flex items-center justify-center gap-1 transition-all active:scale-95"
            style={{
              background: "hsl(var(--glass-bg))",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(var(--glass-border))",
              color: "hsl(var(--foreground) / 0.7)"
            }}>
            
            <Navigation className="w-2.5 h-2.5" />
            네이버 지도
          </button>
          <button
            onClick={handleKakaoMap}
            className="flex-1 py-2.5 rounded-full text-[10px] flex items-center justify-center gap-1 transition-all active:scale-95"
            style={{
              background: "hsl(var(--glass-bg))",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(var(--glass-border))",
              color: "hsl(var(--foreground) / 0.7)"
            }}>
            
            <Navigation className="w-2.5 h-2.5" />
            카카오맵
          </button>
        </div>

        {/* Transportation */}
        <div className="space-y-3 text-[11px]">
          <div className="flex items-start gap-3">
            <Train className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--muted-foreground))" }} />
            <p style={{ color: "hsl(var(--foreground) / 0.55)" }}>3호선 백석역 5,6번 출구에서 도보 5분</p>
          </div>
          <div className="flex items-start gap-3">
            <Car className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--muted-foreground))" }} />
            <p style={{ color: "hsl(var(--foreground) / 0.55)" }}>건물 주차장 이용 (2시간 무료)</p>
          </div>
        </div>
      </motion.div>
    </section>);

};

export default InfoSection;