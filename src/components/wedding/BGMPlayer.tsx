import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface BGMPlayerProps {
  audioSrc?: string;
}

const BGMPlayer = ({ audioSrc }: BGMPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);

  // 첫 사용자 인터랙션(스크롤/터치/클릭) 시 자동 재생
  // 브라우저는 사용자 상호작용 없이는 audio.play()를 막기 때문에 이 방식이 정석
  useEffect(() => {
    if (!audioSrc) return;

    const tryPlay = () => {
      if (startedRef.current || !audioRef.current) return;
      startedRef.current = true;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // 재생 실패 시 재시도 가능하도록 플래그 리셋
          startedRef.current = false;
        });
    };

    // 다양한 이벤트에 모두 등록 (어떤 상호작용으로든 시작되게)
    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "touchstart",
      "click",
      "keydown",
    ];
    events.forEach((evt) =>
      window.addEventListener(evt, tryPlay, { once: true, passive: true })
    );

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, tryPlay));
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current || !audioSrc) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  if (!audioSrc) return null;

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      <motion.button
        onClick={togglePlay}
        className="fixed top-5 right-5 z-50 w-9 h-9 rounded-full flex items-center justify-center"
        style={{
          background: "hsl(var(--background) / 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid hsl(var(--border) / 0.5)",
          color: "hsl(var(--foreground) / 0.5)",
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label={isPlaying ? "음악 끄기" : "음악 켜기"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Volume2 className="w-3.5 h-3.5" />
            </motion.div>
          ) : (
            <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <VolumeX className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default BGMPlayer;
