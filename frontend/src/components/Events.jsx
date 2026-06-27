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
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    AOS.init();

    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://mag-backend-lime.vercel.app/events/get");
        const formattedEvents = response.data.map(event => ({
          ...event,
          date: event.date ? event.date.slice(0, 10) : "Date N/A"
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="events" className="events section" style={{ padding: "60px 0" }}>
      <img
        className="slider-bg"
        src="assets/img/events-bg.jpg"
        alt=""
        data-aos="fade-in"
        style={{ opacity: 0.4, height: "100%", width: "100%" }}
      />

      <div className="container d-flex justify-content-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={events.length > 1}
          speed={1000}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="init-swiper"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ maxWidth: "850px", paddingBottom: "40px" }} // Restricts the massive horizontal stretch
        >
          {events.map((event) => (
            <SwiperSlide key={event.id || event._id}>
              <div 
                className="row g-4 align-items-center justify-content-center" 
                style={{ 
                  cursor: "pointer", 
                  padding: "30px", 
                  borderRadius: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.65)",
                  border: "1px solid rgba(204, 164, 94, 0.15)",
                  backdropFilter: "blur(10px)",
                  margin: "0 10px"
                }}
                onClick={() => openEventModal(event)}
              >
                {/* Left Side: Scaled Image */}
                <div className="col-md-5 text-center">
                  <img
                    src={`data:image/jpeg;base64,${event.image}`}
                    className="img-fluid"
                    alt={event.title}
                    style={{ 
                      borderRadius: "8px", 
                      maxHeight: "260px", 
                      width: "100%", 
                      objectFit: "contain",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
                    }}
                  />
                </div>
                
                {/* Right Side: Clean Typography */}
                <div className="col-md-7 ps-md-4">
                  <h3 style={{ color: "#cca45e", fontFamily: "Georgia, serif", fontSize: "1.75rem", marginBottom: "8px" }}>
                    {event.title}
                  </h3>
                  <p style={{ color: "#aaa", fontSize: "0.95rem", fontWeight: "600", marginBottom: "12px" }}>
                    {event.date || "N/A"}
                  </p>
                  <p style={{ color: "#ddd", fontSize: "0.95rem", lineHeight: "1.5", margin: 0 }}>
                    {event.content && event.content.length > 120 
                      ? `${event.content.slice(0, 120)}...` 
                      : event.content}
                  </p>
                  <span style={{ color: "#cca45e", fontSize: "0.85rem", display: "inline-block", marginTop: "12px", textDecoration: "underline" }}>
                    Read more details →
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Immersive Event Details Modal Layout */}
      {selectedEvent && (
        <div 
          className="event-custom-modal" 
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.85)", display: "flex", justifyContent: "center",
            alignItems: "center", zIndex: 9999, backdropFilter: "blur(8px)"
          }}
          onClick={closeEventModal}
        >
          <div 
            className="event-modal-card"
            style={{
              backgroundColor: "#000000", border: "1px solid #cca45e", width: "90%", maxWidth: "650px",
              borderRadius: "12px", padding: "25px", color: "#fff", position: "relative",
              maxHeight: "85vh", overflowY: "auto", boxShadow: "0px 4px 20px rgba(204, 164, 94, 0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span 
              onClick={closeEventModal}
              style={{
                position: "absolute", top: "15px", right: "20px", fontSize: "30px",
                color: "#cca45e", cursor: "pointer", fontWeight: "bold"
              }}
            >
              &times;
            </span>
            
            <h2 style={{ color: "#cca45e", fontFamily: "Georgia, serif", marginBottom: "5px" }}>
              {selectedEvent.title}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#aaa", marginBottom: "20px" }}>
              <strong>Event Date:</strong> {selectedEvent.date}
            </p>
            
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={`data:image/jpeg;base64,${selectedEvent.image}`}
                alt={selectedEvent.title}
                style={{ maxWidth: "100%", maxHeight: "350px", borderRadius: "8px", objectFit: "contain" }}
              />
            </div>
            
            <p style={{ lineHeight: "1.6", color: "#eee", whiteSpace: "pre-wrap" }}>
              {selectedEvent.content}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
