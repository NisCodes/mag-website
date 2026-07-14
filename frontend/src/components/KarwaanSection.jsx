import React, { useState } from 'react';

const karwaanEditions = [
  {
    id: 1,
    year: "Karwaan '26",
    tagline: "Coming Soon...",
    coverImage: "/karwaan2026.jpeg",
    driveLink: "#",
    isComingSoon: true
  },
  {
    id: 2,
    year: "Karwaan '25",
    tagline: "किरदार",
    coverImage: "/karwaan2025.jpeg",
    driveLink: "https://drive.google.com/file/d/1tuA6O2PsgzDz8WtwgfKa2X6ytzke-2Ix/view",
    isComingSoon: false
  },
  {
    id: 3,
    year: "Karwaan '24",
    tagline: "कहानी",
    coverImage: "/karwaan2024.jpeg",
    driveLink: "https://drive.google.com/your-link-here-2024",
    isComingSoon: false
  }
];

export default function KarwaanSection() {
  const [showMore, setShowMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    // Limits scrolling appropriately based on viewport conditions
    const isMobile = window.innerWidth <= 768;
    const maxIndex = isMobile ? karwaanEditions.length - 1 : karwaanEditions.length - 2;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isMobile = window.innerWidth <= 768;
  const showRightArrow = currentIndex < (isMobile ? karwaanEditions.length - 1 : karwaanEditions.length - 2);

  return (
    <section className="karwaan-section" style={{ width: '100%', backgroundColor: '#000', color: '#fff', textAlign: 'center', paddingBottom: '40px' }}>
      
      {/* Injecting CSS dynamically to control mobile vs desktop widths */}
      <style>{`
        .karwaan-track {
          display: flex;
          transition: transform 0.4s ease-in-out;
          width: ${karwaanEditions.length * 50}%;
        }
        .karwaan-card-wrapper {
          width: ${100 / karwaanEditions.length}%;
          padding: 0 15px;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .karwaan-track {
            width: ${karwaanEditions.length * 100}%;
            transform: translateX(-${currentIndex * (100 / karwaanEditions.length)}%) !important;
          }
          .karwaan-card-wrapper {
            width: ${100 / karwaanEditions.length}%;
            padding: 0 5px;
          }
          .karwaan-card-img {
            aspect-ratio: 1/1 !important; /* Square layout fits standard mobile frames much better */
          }
        }
      `}</style>

      {/* 1. Left-aligned Heading inheriting parent font aesthetics */}
      <h2 style={{ fontSize: '32px', color: '#d4af37', paddingTop: '40px', paddingLeft: '20px', marginBottom: '25px', fontWeight: 'bold', letterSpacing: '0.5px', textAlign: 'left' }}>
        Explore Karwaan
      </h2>

      {/* 2. Main Landing Full-width Banner */}
      <div className="karwaan-banner" style={{ width: '100%', margin: '0 0 40px 0', overflow: 'hidden' }}>
        <img 
          src="/image_cf6c02.jpeg" 
          alt="Karwaan Banner" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>

      {/* 3. Toggle Action Button */}
      <button 
        onClick={() => {
          setShowMore(!showMore);
          setCurrentIndex(0);
        }}
        style={{
          padding: '12px 30px',
          fontSize: '16px',
          backgroundColor: '#d4af37', 
          color: '#000',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          marginBottom: '40px'
        }}
      >
        {showMore ? 'Show Less' : 'Explore Karwaan Editions'}
      </button>

      {/* 4. Completely Responsive Carousel Frame */}
      {showMore && (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 50px', boxSizing: 'border-box' }}>
          
          {/* Left Navigation Arrow */}
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            style={{
              position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: currentIndex === 0 ? '#222' : '#d4af37',
              color: '#000', border: 'none', width: '40px', height: '40px', borderRadius: '50%',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '22px', zIndex: 10
            }}
          >
            &#8249;
          </button>

          {/* Core Viewport Slider Window */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div 
              className="karwaan-track"
              style={{
                transform: `translateX(-${currentIndex * 50}%)`
              }}
            >
              {karwaanEditions.map((edition) => (
                <div key={edition.id} className="karwaan-card-wrapper">
                  <div 
                    style={{
                      backgroundColor: '#111',
                      border: '1px solid #222',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                      textAlign: 'center'
                    }}
                  >
                    <img 
                      className="karwaan-card-img"
                      src={edition.coverImage} 
                      alt={edition.year} 
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        aspectRatio: '16/10', 
                        objectFit: 'cover' 
                      }}
                    />
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#d4af37', fontSize: '20px' }}>{edition.year}</h3>
                      <p style={{ color: '#ccc', fontSize: '16px', fontWeight: '500', margin: '0 0 20px 0' }}>
                        {edition.tagline}
                      </p>
                      
                      {edition.isComingSoon ? (
                        <button 
                          disabled
                          style={{
                            display: 'inline-block', color: '#666', backgroundColor: '#222',
                            padding: '10px 24px', borderRadius: '4px', border: 'none', cursor: 'not-allowed', fontWeight: 'bold'
                          }}
                        >
                          Locked
                        </button>
                      ) : (
                        <a 
                          href={edition.driveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block', color: '#000', backgroundColor: '#fff',
                            padding: '10px 24px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold'
                          }}
                        >
                          View on Drive
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button 
            onClick={nextSlide}
            disabled={!showRightArrow}
            style={{
              position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: !showRightArrow ? '#222' : '#d4af37',
              color: '#000', border: 'none', width: '40px', height: '40px', borderRadius: '50%',
              cursor: !showRightArrow ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '22px', zIndex: 10
            }}
          >
            &#8250;
          </button>

        </div>
      )}
    </section>
  );
}
