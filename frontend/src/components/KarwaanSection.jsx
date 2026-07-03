import React, { useState } from 'react';

// Reordered year-wise: Newest to Oldest
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
    driveLink: "https://drive.google.com/your-link-here-2025",
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
    if (currentIndex < karwaanEditions.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="karwaan-section" style={{ width: '100%', backgroundColor: '#000', color: '#fff', textAlign: 'center', fontFamily: 'sans-serif', paddingBottom: '40px' }}>
      
      {/* 1. Gold Section Heading at the Top */}
      <h2 style={{ fontSize: '36px', color: '#d4af37', paddingTop: '40px', marginBottom: '25px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Explore Karwaan
      </h2>

      {/* 2. Main Landing Banner */}
      <div className="karwaan-banner" style={{ width: '100%', margin: '0 0 40px 0', overflow: 'hidden' }}>
        <img 
          src="/image_cf6c02.jpeg" 
          alt="Karwaan Banner" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>

      {/* 3. Toggle Button */}
      <button 
        onClick={() => setShowMore(!showMore)}
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

      {/* 4. Sliding Viewport Segment */}
      {showMore && (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 60px', boxSizing: 'border-box' }}>
          
          {/* Left Arrow Button */}
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            style={{
              position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: currentIndex === 0 ? '#222' : '#d4af37',
              color: '#000', border: 'none', width: '45px', height: '45px', borderRadius: '50%',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '24px', zIndex: 10
            }}
          >
            &#8249;
          </button>

          {/* Wrapper for the cards track */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div 
              style={{
                display: 'flex',
                transform: `translateX(-${currentIndex * 50}%)`,
                transition: 'transform 0.4s ease-in-out',
                width: `${(karwaanEditions.length * 50)}%`
              }}
            >
              {karwaanEditions.map((edition) => (
                <div 
                  key={edition.id} 
                  style={{
                    width: `${100 / karwaanEditions.length}%`,
                    padding: '0 15px',
                    boxSizing: 'border-box'
                  }}
                >
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
                    {/* Responsive Image with Fixed Aspect Ratio to prevent squishing */}
                    <img 
                      src={edition.coverImage} 
                      alt={edition.year} 
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        aspectRatio: '16/10', 
                        objectFit: 'cover' 
                      }}
                    />
                    <div style={{ padding: '25px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#d4af37', fontSize: '22px' }}>{edition.year}</h3>
                      <p style={{ color: '#ccc', fontSize: '18px', fontWeight: '500', margin: '0 0 20px 0' }}>
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

          {/* Right Arrow Button */}
          <button 
            onClick={nextSlide}
            disabled={currentIndex >= karwaanEditions.length - 2}
            style={{
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: currentIndex >= karwaanEditions.length - 2 ? '#222' : '#d4af37',
              color: '#000', border: 'none', width: '45px', height: '45px', borderRadius: '50%',
              cursor: currentIndex >= karwaanEditions.length - 2 ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '24px', zIndex: 10
            }}
          >
            &#8250;
          </button>

        </div>
      )}
    </section>
  );
}
