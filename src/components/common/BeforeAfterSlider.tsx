import React, { useState, useRef } from 'react';
import { Eye, MoveHorizontal, Columns2, SlidersHorizontal, Maximize2 } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Reported Damage (Before)',
  afterLabel = 'Completed Resolution (After)',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [objectFit, setObjectFit] = useState<'contain' | 'cover'>('contain');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Top View Mode Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'slider'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-[#ddece3]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Comparison Slider</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'side-by-side'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-[#ddece3]'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Side-by-Side View</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setObjectFit(objectFit === 'contain' ? 'cover' : 'contain')}
            className="text-[11px] font-bold text-primary px-2.5 py-1 rounded-lg bg-surface-container border border-[#ddece3] hover:bg-[#ddece3] flex items-center gap-1"
          >
            <Maximize2 className="w-3 h-3 text-[#3c6938]" />
            <span>{objectFit === 'contain' ? 'Unzoomed (Full Image)' : 'Fill View'}</span>
          </button>
        </div>
      </div>

      {viewMode === 'slider' ? (
        <div 
          ref={containerRef}
          className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden shadow-civic select-none cursor-ew-resize border border-[#ddece3] bg-[#1a2e22]"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Background) */}
          <img
            src={afterImage}
            alt={afterLabel}
            className={`absolute inset-0 w-full h-full pointer-events-none ${
              objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'
            }`}
          />
          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {afterLabel}
          </div>

          {/* Before Image (Foreground Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none bg-[#1a2e22]"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              className={`absolute inset-0 w-full h-full max-w-none pointer-events-none ${
                objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'
              }`}
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            />
            <div className="absolute top-4 left-4 bg-[#6a4e00]/90 backdrop-blur text-[#efc052] text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#efc052]"></span>
              {beforeLabel}
            </div>
          </div>

          {/* Vertical Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-primary shadow-civic-float flex items-center justify-center border-2 border-primary">
              <MoveHorizontal className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      ) : (
        /* Side by Side Unzoomed Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden border border-[#ddece3] shadow-sm bg-[#1a2e22] h-72 sm:h-80 flex items-center justify-center p-2">
            <img
              src={beforeImage}
              alt={beforeLabel}
              className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
            <div className="absolute top-3 left-3 bg-[#6a4e00]/90 backdrop-blur text-[#efc052] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#efc052]"></span>
              {beforeLabel}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#ddece3] shadow-sm bg-[#1a2e22] h-72 sm:h-80 flex items-center justify-center p-2">
            <img
              src={afterImage}
              alt={afterLabel}
              className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
            <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {afterLabel}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-on-surface-variant px-1 font-medium">
        <span>← Drag left to reveal completed resolution</span>
        <span className="flex items-center gap-1 font-bold text-primary">
          <Eye className="w-3.5 h-3.5 text-[#3c6938]" />
          Unzoomed 100% Full Frame
        </span>
        <span>Drag right to reveal reported damage →</span>
      </div>
    </div>
  );
};
