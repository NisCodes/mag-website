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

      <div className="container section-title" data-aos="fade-up" style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ color: "#cca45e", fontFamily: "Georgia, serif" }}>Events</h2>
        <p style={{ color: "#fff" }}>Latest Events & Announcements</p>
      </div>

      <div className="container px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={events.length > 3} // Only loop if there are enough items to scroll
          speed={1000}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={30} // Adds space between the cards
          pagination={{ clickable: true }}
          className="init-swiper"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ paddingBottom: "50px" }}
          breakpoints={{
            // Responsive break points
            320: {
              slidesPerView: 1, // 1 card on mobile screens
            },
            768: {
              slidesPerView: 2, // 2 cards on tablets
            },
            1024: {
              slidesPerView: 3, // 3 cards on desktop monitors
            }
          }}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id || event._id}>
              <div 
                className="card bg-dark text-light h-100"
                style={{ 
                  cursor: "pointer", 
                  borderRadius: "12px",
                  backgroundColor: "rgba(20, 20, 20, 0.75)",
                  border: "1px solid rgba(204, 164, 94, 0.2)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, border-color 0.2s ease"
                }}
                onClick={() => openEventModal(event)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = "#cca45e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(204, 164, 94, 0.2)";
                }}
              >
                {/* Image Section inside the Card */}
                <div style={{ backgroundColor: "#000", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", padding: "15px", textAlign: "center" }}>
                  <img
                    src={`data:image/jpeg;base64,${event.image}`}
                    className="card-img-top"
                    alt={event.title}
                    style={{ 
                      maxHeight: "180px", 
                      width: "100%", 
                      objectFit: "contain"
                    }}
                  />
                </div>
                
                {/* Content Section inside the Card */}
                <div className="card-body d-flex flex-column" style={{ padding: "20px", backgroundColor: "transparent" }}>
                  <h5 style={{ color: "#cca45e", fontFamily: "Georgia, serif", fontSize: "1.25rem", marginBottom: "8px" }}>
                    {event.title}
                  </h5>
                  <p style={{ color: "#aaa", fontSize: "0.85rem", fontWeight: "600", marginBottom: "12px" }}>
                    {event.date || "N/A"}
                  </p>
                  <p className="card-text text-muted" style={{ fontSize: "0.9rem", color: "#ddd", flexGrow: 1, margin: 0 }}>
                    {event.content && event.content.length > 90 
                      ? `${event.content.slice(0, 90)}...` 
                      : event.content}
                  </p>
                  <span style={{ color: "#cca45e", fontSize: "0.85rem", marginTop: "15px", display: "inline-block", fontWeight: "500" }}>
                    Read details →
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
