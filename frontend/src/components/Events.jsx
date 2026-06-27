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
  const [selectedEvent, setSelectedEvent] = useState(null); // State to track selected event for detailed view

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
    document.body.style.overflow = "hidden"; // Prevents background scrolling when open
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = "auto"; // Restores scrolling
  };

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
          loop={events.length > 1} // Only loop if there's more than one event loaded
          speed={1000}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          className="init-swiper"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id || event._id}>
              <div 
                className="row gy-4 event-item" 
                style={{ cursor: "pointer", padding: "20px", borderRadius: "12px" }}
                onClick={() => openEventModal(event)} // Trigger detailed view on click
              >
                <div className="col-lg-6">
                  <img
                    src={`data:image/jpeg;base64,${event.image}`}
                    className="img-fluid"
                    alt={event.title}
                    style={{ borderRadius: "8px", maxHeight: "400px", width: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0 content">
                  <h3 style={{ color: "#cca45e" }}>{event.title}</h3>
                  <div className="price">
                    <p>
                      <span>{event.date || "N/A"}</span>
                    </p>
                  </div>
                  <p className="fst-italic" style={{ color: "#ddd" }}>
                    {event.content && event.content.length > 150 
                      ? `${event.content.slice(0, 150)}... [Click to view more details]` 
                      : event.content}
                  </p>
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
              backgroundColor: "#000000", border: "1px solid #cca45e", width: "90%", maxWidth: "700px",
              borderRadius: "12px", padding: "25px", color: "#fff", position: "relative",
              maxHeight: "85vh", overflowY: "auto", boxShadow: "0px 4px 20px rgba(204, 164, 94, 0.2)"
            }}
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside card
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
