import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const KarwaanHighlight = () => {
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (isWindowOpen) {
      const fetchKarwaanData = async () => {
        setLoading(true);
        try {
          // Pointing to your live Vercel backend
          const response = await axios.get("https://mag-backend-lime.vercel.app/karwaan/get");
          
          // Sort chronologically (newest year first)
          const sortedData = response.data.sort((a, b) => {
            const yearA = String(a.year || "");
            const yearB = String(b.year || "");
            return yearB.localeCompare(yearA);
          });

          setEditions(sortedData);
        } catch (error) {
          console.error("Error fetching Karwaan data:", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchKarwaanData();
      document.body.style.overflow = "hidden"; // Locks background scroll
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => { document.body.style.overflow = "unset"; };
  }, [isWindowOpen]);

  return (
    <>
      {/* 1. Main Page Hero Banner */}
      <section 
        id="karwaan-highlight" 
        className="py-5" 
        style={{ 
          background: "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.92)), url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80') no-repeat center center/cover",
          borderTop: "2px solid #cca45e",
          borderBottom: "2px solid #cca45e"
        }}
      >
        <div className="container text-center py-5" data-aos="zoom-in">
          <span style={{ color: "#cca45e", letterSpacing: "3px", fontSize: "0.9rem", fontWeight: "bold" }}>THE GRAND LITERARY FESTIVAL</span>
          <h1 className="display-3 my-2" style={{ color: "#fff", fontFamily: "Georgia, serif", fontWeight: "700" }}>KARWAAN</h1>
          <p className="lead text-light mx-auto mb-4" style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
            Experience our annual flagship voyage of performance poetry, structural debates, and massive cultural symposia.
          </p>
          <button 
            className="btn px-4 py-2" 
            style={{ backgroundColor: "#cca45e", color: "#000", fontWeight: "600", border: "none", borderRadius: "30px" }}
            onClick={() => setIsWindowOpen(true)}
          >
            Explore Fest Archives
          </button>
        </div>
      </section>

      {/* 2. Magazine-Style Swiper Modal */}
      {isWindowOpen && (
        <div 
          className="karwaan-window-overlay"
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(10, 10, 10, 0.98)", zIndex: 1050, overflowY: "auto", padding: "60px 0"
          }}
        >
          <div className="container position-relative">
            {/* Close Button */}
            <span 
              onClick={() => setIsWindowOpen(false)}
              style={{ position: "absolute", top: "-40px", right: "20px", color: "#cca45e", fontSize: "2.5rem", cursor: "pointer", zIndex: 1100 }}
            >
              &times;
            </span>

            <div className="text-center mb-5">
              <h2 style={{ color: "#cca45e", fontFamily: "Georgia, serif" }}>Karwaan Archives</h2>
              <p className="text-muted">Click any edition to view the Drive folder</p>
            </div>

            {loading ? (
              <p className="text-center text-muted fst-italic">Loading archives...</p>
            ) : editions.length === 0 ? (
              <p className="text-center text-muted fst-italic">No Karwaan editions published yet.</p>
            ) : (
              <Swiper
                modules={[Pagination, Autoplay]}
                loop={editions.length >= 3}
                speed={1200}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                slidesPerView={3}
                spaceBetween={25}
                pagination={{ clickable: true }}
                className="init-swiper pb-5"
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1200: { slidesPerView: 3, spaceBetween: 25 },
                }}
              >
                {editions.map((edition, index) => (
                  <SwiperSlide key={edition.id || index}>
                    <div 
                      className="magazine-card text-center p-3" 
                      style={{ 
                        backgroundColor: "rgba(20, 20, 20, 0.6)", 
                        border: "1px solid rgba(204, 164, 94, 0.15)", 
                        borderRadius: "12px",
                        overflow: "hidden"
                      }}
                    >
                      <a href={edition.driveLink} target="_blank" rel="noopener noreferrer" className="d-block mb-3 overflow-hidden rounded">
                        {/* Fallback Image Logic prevents broken icons when DB image is empty */}
                        <img
                          src={edition.image ? `data:image/jpeg;base64,${edition.image}` : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"}
                          className="magazine-img img-fluid"
                          alt={edition.year || "Karwaan Cover"}
                          style={{ 
                            maxHeight: "360px", 
                            objectFit: "cover",
                            borderRadius: "8px",
                            width: "100%",
                            transition: "transform 0.3s ease"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />
                      </a>
                      <h4 style={{ color: "#cca45e", fontFamily: "Georgia, serif", fontSize: "1.15rem", marginTop: "10px" }}>
                        {edition.year ? `Karwaan ${edition.year}` : "Karwaan Edition"}
                      </h4>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default KarwaanHighlight;
