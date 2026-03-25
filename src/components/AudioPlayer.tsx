import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(siteConfig.audio.src);
    audioRef.current.loop = siteConfig.audio.loop;
    audioRef.current.volume = siteConfig.audio.volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!siteConfig.audio.enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div
          className={cn(
            'px-3 py-1.5 rounded-full text-sm',
            'aero-glass text-sky-800',
            'animate-in fade-in slide-in-from-right-2'
          )}
        >
          {isPlaying ? '배경음악 재생 중 🎵' : '음악을 재생 해보세요'}
        </div>
      )}

      {/* Main Button — mute-speaker icon */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center justify-center bg-transparent border-none p-1 cursor-pointer transition-transform hover:scale-110"
      >
        <img
          src="/icons/speaker.png"
          alt="음악 재생"
          className="w-8 h-8 object-contain drop-shadow-lg"
          style={{ opacity: isPlaying ? 0.5 : 1 }}
          draggable={false}
        />
      </button>

      {/* Mute Button (only when playing) */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className={cn(
            'w-10 h-10 rounded-full',
            'aero-glass flex items-center justify-center',
            'hover:scale-110 transition-transform'
          )}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-sky-600" />
          ) : (
            <Volume2 className="w-5 h-5 text-sky-600" />
          )}
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
