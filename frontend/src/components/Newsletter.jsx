import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import "../css/magazine.css"; // Reuses your beautiful core layout/card styles

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    const fetchNewsletters = async () => {
      try {
        // Updated endpoint to hit your specific newsletter database routing
        const response = await axios.get("https://mag-backend-lime.vercel.app/newsletter/get");
        
        // Sort newsletters reverse-alphabetically (Z to A) by title string
        // This ensures the newest editions take priority natively
        const sortedData = response.data.sort((a, b) => {
          const titleA = a.title || "";
          const titleB = b.title || "";
          return titleB.localeCompare(titleA);
        });

        setNewsletters(sortedData);
      } catch (error) {
        console.error("Error fetching newsletter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <section id="newsletter" className="magazine section" style={{ padding: "60px 0", backgroundColor: "#0a0a0a" }}>
      {/* Dynamic Left-Aligned & Styled Header Area */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Newsletter</h2>
        <p>Explore Newsletters</p>
      </div>

      <div className="container">
        {loading ? (
          <p className="text-center text-muted fst-italic">Loading archive collections...</p>
        ) : newsletters.length === 0 ? (
          <p className="text-center text-muted fst-italic">No newsletters published yet.</p>
        ) : (
          /* Swiper activates seamlessly using your global configuration settings */
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={newsletters.length >= 3} 
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
          {/* Change your mapping key from newsletter.id to use the actual title fields */}
{newsletters.map((newsletter, index) => (
  <SwiperSlide key={newsletter.id || newsletter.title || index}>
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
      {/* 1. Target the correct link property from Firestore */}
      <a href={newsletter.link} target="_blank" rel="noopener noreferrer" className="d-block mb-3 overflow-hidden rounded">
        <img
          src={`data:image/jpeg;base64,${newsletter.image}`}
          className="magazine-img img-fluid"
          alt={newsletter.title || "Newsletter Cover"}
          style={{ 
            maxHeight: "360px", 
            objectFit: "cover",
            borderRadius: "8px",
            transition: "transform 0.3s ease" 
          }}
        />
      </a>
      
      {/* 2. Target the exact 'title' field string from Firestore */}
      <h4 
        style={{ 
          color: "#cca45e", 
          fontFamily: "Georgia, serif", 
          fontSize: "1.15rem", 
          marginTop: "10px",
          letterSpacing: "0.5px"
        }}
      >
        {newsletter.title || "Untitled Edition"}
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

export default Newsletter;
