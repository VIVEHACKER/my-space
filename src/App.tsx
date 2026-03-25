import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAdminConfig } from '@/hooks/useAdminConfig';
import { CameraModal } from '@/components/CameraModal';
import { AudioPlayer } from '@/components/AudioPlayer';
import { SeoHead } from '@/components/SeoHead';

function App() {
  const config = useAdminConfig();
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const { displayDuration } = config.background;
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev === 0 ? 1 : 0));
    }, displayDuration);
    return () => clearInterval(interval);
  }, [config.background]);

  const handleZoneClick = (zone: typeof config.zones[0]) => {
    if (zone.type === 'external' && zone.link) {
      window.open(zone.link, '_blank');
    } else if (zone.id === 'camera') {
      setIsCameraModalOpen(true);
    }
  };

  const { crossfadeDuration, videos } = config.background;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <SeoHead />
      {/* Background Videos */}
      <div
        className={cn(
          'fixed inset-0 z-0',
          'transition-opacity duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        {videos.map((src, i) => (
          <video
            key={src}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
            style={{
              opacity: activeVideo === i ? 1 : 0,
              transitionDuration: `${crossfadeDuration}ms`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Desktop Icon Grid */}
      <div
        className={cn(
          'fixed z-10 top-0 left-0 h-full',
          'desktop-grid',
          'transition-opacity duration-700',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        {config.zones.map((zone, index) => (
          <button
            key={zone.id}
            onClick={() => handleZoneClick(zone)}
            className={cn(
              'desktop-icon',
              'transition-all duration-500',
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            )}
            style={{
              transitionDelay: `${400 + index * 150}ms`,
            }}
          >
            <div className="desktop-icon-img-wrap">
              <img
                src={zone.icon}
                alt={zone.name}
                style={{ width: zone.iconSize ?? 64 }}
                draggable={false}
              />
            </div>
            <span className="desktop-icon-label">{zone.name}</span>
          </button>
        ))}
      </div>

      {/* Logo */}
      <div
        className={cn(
          'fixed top-6 left-1/2 -translate-x-1/2 z-20',
          'transition-all duration-700 delay-100',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        )}
      >
        <h1 className="title-aero text-3xl sm:text-4xl md:text-5xl tracking-[0.15em]">
          My Space
        </h1>
      </div>

      <AudioPlayer />

      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
      />
    </div>
  );
}

export default App;
