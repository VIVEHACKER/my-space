import { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config';
import HTMLFlipBook from 'react-pageflip';
import React from 'react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Page = React.forwardRef<HTMLDivElement, { src: string; pageNum: number }>(
  ({ src, pageNum }, ref) => (
    <div ref={ref} className="aero-book-page">
      <div className="aero-page-inner">
        <img
          src={src}
          alt={`Page ${pageNum}`}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      <div className="aero-page-number">{pageNum}</div>
    </div>
  )
);
Page.displayName = 'Page';

const CoverPage = React.forwardRef<HTMLDivElement, { type: 'front' | 'back' }>(
  ({ type }, ref) => (
    <div ref={ref} className="aero-book-cover">
      <div className="aero-cover-inner">
        {type === 'front' ? (
          <>
            <div className="aero-cover-orb">📷</div>
            <h2 className="aero-cover-title">Camera Zone</h2>
            <p className="aero-cover-sub">drag to flip →</p>
          </>
        ) : (
          <p className="aero-cover-sub">✨ fin ✨</p>
        )}
      </div>
      {/* Gloss overlay */}
      <div className="aero-cover-gloss" />
    </div>
  )
);
CoverPage.displayName = 'CoverPage';

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose }) => {
  const bookRef = useRef<ReturnType<typeof HTMLFlipBook> | null>(null);

  const flipPrev = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (bookRef.current as any)?.pageFlip()?.flipPrev();
  }, []);

  const flipNext = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (bookRef.current as any)?.pageFlip()?.flipNext();
  }, []);

  if (!isOpen) return null;

  const allPhotos = siteConfig.cameraZone.albums.flatMap((a) => a.photos);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Aero backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400/30 via-blue-500/20 to-sky-300/30 backdrop-blur-sm" />

      {/* Bubbles decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aero-bubble" style={{ top: '10%', left: '5%', width: 80, height: 80 }} />
        <div className="aero-bubble" style={{ top: '60%', right: '8%', width: 60, height: 60 }} />
        <div className="aero-bubble" style={{ bottom: '15%', left: '12%', width: 45, height: 45 }} />
      </div>

      {/* XP-style Window */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aero-xp-window">
          {/* Title Bar */}
          <div className="aero-xp-titlebar">
            <div className="aero-xp-titlebar-icon">📷</div>
            <span className="aero-xp-titlebar-text">Camera Zone - Photo Album</span>
            <div className="aero-xp-titlebar-buttons">
              <button className="aero-xp-btn-minimize">─</button>
              <button className="aero-xp-btn-maximize">□</button>
              <button className="aero-xp-btn-close" onClick={onClose}>✕</button>
            </div>
          </div>

          {/* Content area */}
          <div className="aero-xp-content">
            {/* Navigation */}
            <div className="aero-xp-nav">
              <button onClick={flipPrev} className="aero-nav-pill">◀ Prev</button>
              <button onClick={flipNext} className="aero-nav-pill">Next ▶</button>
            </div>

            {/* Book */}
            <div className="aero-book-container">
              {/* @ts-expect-error react-pageflip ref typing */}
              <HTMLFlipBook
                ref={bookRef}
                width={320}
                height={440}
                size="stretch"
                minWidth={240}
                maxWidth={460}
                minHeight={340}
                maxHeight={640}
                showCover={true}
                mobileScrollSupport={false}
                flippingTime={600}
                useMouseEvents={true}
                swipeDistance={30}
                drawShadow={true}
                maxShadowOpacity={0.35}
                className="aero-flipbook"
                startPage={0}
                style={{}}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                usePortrait={true}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                <CoverPage type="front" />
                {allPhotos.map((photo, i) => (
                  <Page key={photo} src={photo} pageNum={i + 1} />
                ))}
                <CoverPage type="back" />
              </HTMLFlipBook>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
