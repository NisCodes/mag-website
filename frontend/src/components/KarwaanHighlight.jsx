import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

const KarwaanHighlight = () => {
  const [editions, setEditions] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (isWindowOpen) {
      const fetchKarwaanData = async () => {
        setLoading(true);
        try {
          const response = await axios.get("https://mag-backend-lime.vercel.app/karwaan/get");
          
          // Sort automatically so the newest/latest flagship year sits cleanly on top
          const sorted = response.data.sort((a, b) => {
            const yearA = String(a.year || "");
            const yearB = String(b.year || "");
            return yearB.localeCompare(yearA);
          });
          
          setEditions(sorted);
        } catch (error) {
          console.error("Error loading Karwaan records:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchKarwaanData();
      document.body.style.overflow = "hidden"; // Lock background page scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isWindowOpen]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      {/* 1. Grand Main Page Highlight Banner Section */}
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
            style={{ backgroundColor: "#cca45e", color: "#000", fontWeight: "600", border: "none", borderRadius: "30px", transition: "transform 0.2s" }}
            onClick={() => setIsWindowOpen(true)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Explore Fest Archives
          </button>
        </div>
      </section>

      {/* 2. Interactive Full-Screen Window Content Overlay */}
      {isWindowOpen && (
        <div 
          className="karwaan-window-overlay"
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(5, 5, 5, 0.98)", zIndex: 1050, overflowY: "auto", padding: "40px 20px"
          }}
        >
          <div className="container position-relative" style={{ maxWidth: "800px" }}>
            {/* Elegant Close Button */}
            <span 
              onClick={() => setIsWindowOpen(false)}
              style={{ position: "absolute", top: "-10px", right: "10px", color: "#cca45e", fontSize: "2.5rem", cursor: "pointer", zIndex: 1100 }}
            >
              &times;
            </span>

            <div className="text-center mb-5 mt-3">
              <h1 style={{ color: "#cca45e", fontFamily: "Georgia, serif", fontWeight: "bold", letterSpacing: "1px" }}>The Karwaan Story</h1>
              <p className="text-muted small">Journey through our chapters, starting from the latest edition</p>
            </div>

            {loading ? (
              <p className="text-center text-muted fst-italic my-5">Unrolling the festival scrolls...</p>
            ) : editions.length === 0 ? (
              <div className="text-center text-muted my-5">
                <p className="fst-italic">No experimental data picked up from Firestore yet.</p>
                <p className="small text-secondary">Verify that your Firestore collection is named exactly 'karwaan' and your backend is successfully redeployed.</p>
              </div>
            ) : (
              <div className="karwaan-blocks-wrapper">
                {editions.map((edition) => (
                  <div 
                    key={edition.id}
                    className="mb-4 p-4"
                    style={{ 
                      backgroundColor: "rgba(20, 20, 20, 0.6)", 
                      border: "1px solid rgba(204, 164, 94, 0.2)", 
                      borderRadius: "12px",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
                    }}
                  >
                    {/* Header Row */}
                    <div 
                      className="d-flex align-items-center justify-content-between" 
                      onClick={() => toggleExpand(edition.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <h3 style={{ color: "#cca45e", margin: 0, fontFamily: "Georgia, serif", fontSize: "1.4rem" }}>
                        {edition.year}
                      </h3>
                      <button 
                        className="btn btn-sm" 
                        style={{ border: "1px solid #cca45e", color: "#cca45e", borderRadius: "20px", fontSize: "0.8rem" }}
                      >
                        {expandedId === edition.id ? "▲ Collapse Story" : "▼ View Full Story"}
                      </button>
                    </div>

                    {/* Condensed View Content */}
                    <p className="text-light mt-3 mb-1" style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                      {edition.summary || "Summary text placeholder."}
                    </p>

                    {/* Expandable Extended Details Panel */}
                    {expandedId === edition.id && (
                      <div className="mt-4 pt-3 border-top border-secondary animate-fade-in">
                        <div className="row align-items-center">
                          {edition.coverUrl && (
                            <div className="col-md-4 mb-3 mb-md-0">
                              <img 
                                src={edition.coverUrl} 
                                className="img-fluid rounded shadow-sm" 
                                alt={`${edition.year} poster`} 
                                style={{ width: "100%", maxHeight: "250px", objectFit: "cover" }} 
                              />
                            </div>
                          )}
                          <div className={edition.coverUrl ? "col-md-8" : "col-12"}>
                            <h5 style={{ color: "#cca45e", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>Festival Chronicle</h5>
                            <p style={{ color: "#ddd", whiteSpace: "pre-line", fontSize: "0.95rem", lineHeight: "1.6" }}>
                              {edition.details || "Detailed documentation text placeholder."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default KarwaanHighlight;
