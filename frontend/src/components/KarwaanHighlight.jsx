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

    if (isWindowOpen) {
      const fetchKarwaanData = async () => {
        try {
          // Put your custom backend router endpoint here
          const response = await axios.get("https://mag-backend-lime.vercel.app/karwaan/get");
          
          // Sort chronologically so the newest flagship year sits on top
          const sorted = response.data.sort((a, b) => b.year.localeCompare(a.year));
          setEditions(sorted);
        } catch (error) {
          console.error("Error loading Karwaan records:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchKarwaanData();
      document.body.style.overflow = "hidden"; // Lock page scroll behind the modal window
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isWindowOpen]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      {/* 1. Flagship Massive Section Banner on Main Page */}
      <section 
        id="karwaan-highlight" 
        className="py-5" 
        style={{ 
          background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('assets/img/karwaan-bg.jpg') no-repeat center center/cover",
          borderY: "2px solid #cca45e"
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

      {/* 2. Separate Full-Screen Interactive Window Window */}
      {isWindowOpen && (
        <div 
          className="karwaan-window-overlay"
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(5, 5, 5, 0.98)", zIndex: 1050, overflowY: "auto", padding: "40px 20px"
          }}
        >
          <div className="container position-relative" style={{ maxWidth: "800px" }}>
            {/* Close Utility Cross */}
            <span 
              onClick={() => setIsWindowOpen(false)}
              style={{ position: "absolute", top: "-10px", right: "10px", color: "#cca45e", fontSize: "2.5rem", cursor: "pointer" }}
            >
              &times;
            </span>

            <div className="text-center mb-5">
              <h2 style={{ color: "#cca45e", fontFamily: "Georgia, serif" }}>Karwaan Chronology</h2>
              <p className="text-muted small">Flip through history edition by edition</p>
            </div>

            {loading ? (
              <p className="text-center text-muted fst-italic">Unrolling festival scrolls...</p>
            ) : (
              <div className="karwaan-blocks-wrapper">
                {editions.map((edition) => (
                  <div 
                    key={edition.id}
                    className="mb-4 p-3"
                    style={{ 
                      backgroundColor: "#111", border: "1px solid rgba(204,164,94,0.2)", borderRadius: "8px",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {/* Header: Always visible */}
                    <div 
                      className="d-flex align-items-center justify-content-between style-pointer" 
                      onClick={() => toggleExpand(edition.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <h4 style={{ color: "#fff", margin: 0, fontSize: "1.3rem" }}>{edition.year}</h4>
                      <span style={{ color: "#cca45e", fontSize: "1.2rem" }}>
                        {expandedId === edition.id ? "▲ Collapse" : "▼ View More"}
                      </span>
                    </div>

                    {/* Condensed View Content */}
                    <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.95rem" }}>
                      {edition.summary}
                    </p>

                    {/* Expandable Extended Details Panel */}
                    {expandedId === edition.id && (
                      <div className="mt-4 pt-3 border-top border-secondary" data-aos="fade-down" data-aos-duration="400">
                        <div className="row">
                          {edition.coverUrl && (
                            <div className="col-md-4 mb-3">
                              <img src={edition.coverUrl} className="img-fluid rounded" alt="Poster" style={{ maxHeight: "200px", objectFit: "cover" }} />
                            </div>
                          )}
                          <div className={edition.coverUrl ? "col-md-8" : "col-12"}>
                            <p style={{ color: "#ddd", whiteSpace: "pre-line", fontSize: "0.95rem", lineHeight: "1.6" }}>
                              {edition.details}
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
