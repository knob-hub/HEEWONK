import { motion } from "framer-motion";

const WatercolorBackground = () => {
  return (
    <>
      {/* Base watercolor gradient */}
      <div className="watercolor-bg" />

      {/* Animated soft blobs for watercolor "bleed" effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(340 25% 85% / 0.35) 0%, transparent 70%)",
            top: "-5%",
            right: "-10%",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 30, -10, 0],
            y: [0, 20, -15, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(20 25% 88% / 0.3) 0%, transparent 70%)",
            bottom: "10%",
            left: "-8%",
            filter: "blur(50px)",
          }}
          animate={{
            x: [0, -20, 15, 0],
            y: [0, -25, 10, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(340 20% 82% / 0.2) 0%, transparent 70%)",
            top: "40%",
            right: "20%",
            filter: "blur(45px)",
          }}
          animate={{
            x: [0, 15, -20, 0],
            y: [0, -10, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }} />
      </div>
    </>
  );
};

export default WatercolorBackground;
