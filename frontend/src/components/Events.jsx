import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    AOS.init();

    // Fetch the top 3 latest events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events/get"); // Adjust endpoint as needed
        const formattedEvents = response.data.map(event => ({
          ...event,
          date: event.date.slice(0, 10) // Slicing the date here to get only the date part
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="events" className="events section">
      <img
        className="slider-bg"
        src="assets/img/events-bg.jpg"
        alt=""
        data-aos="fade-in"
        style={{ opacity: 0.6, height: "100%", width: "100%" }}
      />

      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          speed={1000}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          className="init-swiper"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="row gy-4 event-item">
                <div className="col-lg-6">
                  <img
                    src={`data:image/jpeg;base64,${event.image}`}
                    className="img-fluid"
                    alt={event.title}
                  />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0 content">
                  <h3>{event.title}</h3>
                  <div className="price">
                    <p>
                      <span>{event.date || "N/A"}</span>
                    </p>
                  </div>
                  <p className="fst-italic">{event.content}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Events;
