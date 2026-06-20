// Magazine.js
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

  useEffect(() => {
    AOS.init();

    const fetchMagazines = async () => {
      try {
        const response = await axios.get("http://localhost:4000/magazine/get");
        setMagazines(response.data);
      } catch (error) {
        console.error("Error fetching magazine data:", error);
      }
    };

    fetchMagazines();
  }, []);

  return (
    <section id="magazine" className="magazine section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Magazine</h2>
        <p>Insight Magazine</p>
      </div>

      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          speed={1000}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          slidesPerView={3}  // Show 3 slides at a time
          spaceBetween={20}   // Space between slides
          pagination={{ clickable: true }}
          className="init-swiper"
          data-aos="fade-up"
          data-aos-delay="100"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {magazines.map((magazine) => (
            <SwiperSlide key={magazine.id}>
              <a href={magazine.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={`data:image/jpeg;base64,${magazine.image}`}
                  className="magazine-img"
                  alt="Magazine Cover"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Magazine;
