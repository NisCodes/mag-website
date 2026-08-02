import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export default function KarwaanSection() {
  const [showMore, setShowMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [karwaanEditions, setKarwaanEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchKarwaan = async () => {
  try {
    const snapshot = await getDocs(collection(db, "karwaan"));

    console.log("Number of docs:", snapshot.size);

    snapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setKarwaanEditions(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

    fetchKarwaan();
  }, []);

  const nextSlide = () => {
    // Limits scrolling appropriately based on viewport conditions
    const isMobile = window.innerWidth <= 768;
    const cardsVisible = isMobile ? 1 : 2;
const maxIndex = Math.max(0, karwaanEditions.length - cardsVisible);
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
  const cardsVisible = isMobile ? 1 : 2;

const showRightArrow =
  currentIndex < karwaanEditions.length - cardsVisible;
  if (loading) {
  return (
    <section
      className="karwaan-section"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Loading Karwaan...</h3>
    </section>
  );
}

  return (
    <section className="karwaan-section" style={{ width: '100%', backgroundColor: '#000', color: '#fff', textAlign: 'center', paddingBottom: '40px' }}>
      
      {/* Injecting CSS dynamically to control mobile vs desktop widths */}

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
    display: "flex",
    transition: "transform 0.4s ease",
    transform: `translateX(-${currentIndex * 50}%)`,
  }}
>
              
              {karwaanEditions.map((edition) => (
                <div
  key={edition.id}
  style={{
    flex: isMobile ? "0 0 100%" : "0 0 50%",
    padding: "0 15px",
    boxSizing: "border-box",
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
                    <img
  className="karwaan-card-img"
  src={edition.image}
  alt={edition.title}
  style={{
    width: "100%",
    height: "auto",
    aspectRatio: "16/10",
    objectFit: "cover"
  }}
/>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#d4af37', fontSize: '20px' }}>{edition.title}</h3>
                      <p style={{ color: '#ccc', fontSize: '16px', fontWeight: '500', margin: '0 0 20px 0' }}>
                        {edition.tagline}
                      </p>
                      
                      {edition.comingSoon ? (
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
                          href={edition.link} 
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
