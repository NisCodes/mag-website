import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import "../css/magazine.css";

const Magazine = () => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    const fetchMagazines = async () => {
      try {
        const response = await axios.get("https://mag-backend-lime.vercel.app/magazine/get");
        
        // Sort magazines reverse-alphabetically (Z to A) by title string
        // This ensures 'Insight 2026' takes priority over 'Insight 2025' natively
        const sortedData = response.data.sort((a, b) => {
          const titleA = a.title || "";
          const titleB = b.title || "";
          return titleB.localeCompare(titleA);
        });

        setMagazines(sortedData);
      } catch (error) {
        console.error("Error fetching magazine data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMagazines();
  }, []);

  return (
    <section id="magazine" className="magazine section" style={{ padding: "60px 0", backgroundColor: "#0a0a0a" }}>
      <div className="container section-title" data-aos="fade-up">
        <h2>Magazine</h2>
        <p>Insight Magazine Editions</p>
      </div>

      <div className="container">
        {loading ? (
          <p className="text-center text-muted fst-italic">Loading archive collections...</p>
        ) : magazines.length === 0 ? (
          <p className="text-center text-muted fst-italic">No magazines published yet.</p>
        ) : (
          /* Swiper initializes cleanly only when array data is fully ready */
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={magazines.length >= 3} // Infinite looping safely activates if at least 3 cards exist
            speed={1200}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            slidesPerView={3}
            spaceBetween={25}
            pagination={{ clickable: true }}
            className="init-swiper pb-5"
            data-aos="fade-up"
            data-aos-delay="100"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 25 },
            }}
          >
            {magazines.map((magazine, index) => (
              <SwiperSlide key={magazine.id || index}>
                <div 
                  className="magazine-card text-center p-3" 
                  style={{ 
                    backgroundColor: "rgba(20, 20, 20, 0.6)", 
                    border: "1px solid rgba(204, 164, 94, 0.15)", 
                    borderRadius: "12px",
                    transition: "transform 0.3s ease",
                    overflow: "hidden"
                  }}
                >
                  <a href={magazine.link} target="_blank" rel="noopener noreferrer" className="d-block mb-3 overflow-hidden rounded">
                    <img
                      src={`data:image/jpeg;base64,${magazine.image}`}
                      className="magazine-img img-fluid"
                      alt={magazine.title || "Magazine Cover"}
                      style={{ 
                        maxHeight: "360px", 
                        objectFit: "cover",
                        borderRadius: "8px",
                        transition: "transform 0.3s ease" 
                      }}
                    />
                  </a>
                  
                  {/* Clean, centralized title string layout underneath the book cover */}
                  <h4 
                    style={{ 
                      color: "#cca45e", 
                      fontFamily: "Georgia, serif", 
                      fontSize: "1.15rem", 
                      marginTop: "10px",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {magazine.title || "Untitled Edition"}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Magazine;
