import React, { useState } from 'react';

// Hardcoded data for the individual festival editions (Like your magazine data)
const karwaanEditions = [
  {
    id: 1,
    year: "Karwaan '25",
    description: "The grand chapter celebrating a renaissance of youth expression.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80", // Replace with your actual cover image URL
    driveLink: "https://drive.google.com/your-link-here-2025"
  },
  {
    id: 2,
    year: "Karwaan '24",
    description: "A spectacular journey through timeless prose and poetry.",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80", // Replace with your actual cover image URL
    driveLink: "https://drive.google.com/your-link-here-2024"
  }
];

export default function KarwaanSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="karwaan-section" style={{ padding: '40px 20px', backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
      
      {/* 1. Main Landing Aspect Banner (Reference: image_cf6c02.jpg) */}
      <div className="karwaan-banner" style={{ maxWidth: '1000px', margin: '0 auto 30px auto', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
        <img 
          src="/image_cf6c02.jpg" // Place your banner image in the frontend/public folder named exactly this
          alt="Karwaan Banner" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>

      {/* 2. Interactive Toggle Button */}
      <button 
        onClick={() => setShowMore(!showMore)}
        style={{
          padding: '12px 30px',
          fontSize: '16px',
          backgroundColor: '#d4af37', // Elegant Gold color matching the theme
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

      {/* 3. The Expandable Cards Segment */}
      {showMore && (
        <div 
          className="karwaan-cards-grid" 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '10px'
          }}
        >
          {karwaanEditions.map((edition) => (
            <div 
              key={edition.id} 
              className="karwaan-card" 
              style={{
                backgroundColor: '#111',
                border: '1px solid #222',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s ease'
              }}
            >
              <img 
                src={edition.coverImage} 
                alt={edition.year} 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px', textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#d4af37' }}>{edition.year}</h3>
                <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5', height: '60px', overflow: 'hidden' }}>
                  {edition.description}
                </p>
                <a 
                  href={edition.driveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '15px',
                    color: '#000',
                    backgroundColor: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  View on Drive
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
