import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface BikeGalleryProps {
  images: string[];
  bikeName: string;
}

export const BikeGallery: React.FC<BikeGalleryProps> = ({ images, bikeName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const displayImages =
    images && images.length > 0
      ? images
      : [
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200',
          'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200',
          'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200',
        ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div>
      {/* Main Image Display */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '460px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: '#0F1215',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <img
          src={displayImages[activeIndex]}
          alt={`${bikeName} - View ${activeIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />

        {/* Fullscreen Button */}
        <button
          onClick={() => setLightboxOpen(true)}
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          <Maximize2 size={14} /> Fullscreen
        </button>

        {/* Previous / Next Overlays */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                top: '50%',
                left: '14px',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                top: '50%',
                right: '14px',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '14px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          {displayImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: '100px',
                height: '68px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                border:
                  activeIndex === idx
                    ? '2px solid var(--accent-orange)'
                    : '1px solid var(--border-subtle)',
                opacity: activeIndex === idx ? 1 : 0.6,
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 2000, padding: '20px' }}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '1100px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              <X size={28} />
            </button>

            <img
              src={displayImages[activeIndex]}
              alt={bikeName}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 'var(--radius-md)',
              }}
            />

            <div
              style={{
                color: '#FFFFFF',
                marginTop: '12px',
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {bikeName} • View {activeIndex + 1} of {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
