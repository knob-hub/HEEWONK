import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Clean warm base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(40 12% 96%) 0%, hsl(38 10% 95%) 50%, hsl(40 12% 96%) 100%)",
        }}
      />

      {/* Subtle floating orb */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 60% 50% at 30% 40%, hsl(38 12% 90% / 0.4) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 70% 60%, hsl(38 12% 90% / 0.4) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 50% at 30% 40%, hsl(38 12% 90% / 0.4) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};

export default AnimatedBackground;
