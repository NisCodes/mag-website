import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import axios from "axios";
import "../css/blog.css";

function EyesOnly() {
  const [poems, setPoems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch the poetry documents from your serverless API
    const fetchPoetry = async () => {
      try {
        const response = await axios.get("https://mag-backend-lime.vercel.app/poetry/get");
        setPoems(response.data);
      } catch (error) {
        console.error("Error fetching literary submissions:", error);
      }
    };
    fetchPoetry();
  }, []);

  // Helper function to render a list of cards dynamically based on selected language key
  const renderPoetryList = (languageFilter, routePath) => {
    const filteredItems = poems.filter(
      (p) => p.category && p.category.toLowerCase() === languageFilter.toLowerCase()
    );

    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-4" style={{ color: "#aaa" }}>
          <p className="fst-italic">No compositions published under this language section yet.</p>
        </div>
      );
    }

    return (
      <div className="row gy-4">
        {filteredItems.map((poem) => (
          <div className="col-12 mb-4" key={poem.id || poem._id}>
            <div 
              className="p-4" 
              style={{ 
                backgroundColor: "rgba(20, 20, 20, 0.6)", 
                border: "1px solid rgba(204, 164, 94, 0.2)", 
                borderRadius: "12px" 
              }}
            >
              <h3 style={{ color: "#cca45e", fontFamily: "Georgia, serif" }}>{poem.title}</h3>
              <p style={{ color: "#aaa", fontSize: "0.85rem" }}>— Written by {poem.author} ({poem.rollno || "VNIT Member"})</p>
              <p className="mt-3" style={{ whiteSpace: "pre-wrap", color: "#eee", lineHeight: "1.6" }}>
                {poem.content}
              </p>
            </div>
          </div>
        ))}
        
        <div className="row justify-content-center mt-2">
          <button
            className="btn btn-primary btn-golden"
            onClick={() => navigate(routePath)}
            style={{ maxWidth: "200px" }}
          >
            Explore More
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="Eyes_only" className="Eyes_only section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Eyes_only</h2>
        <p>Explore the Literary journey of VNIT</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Tab.Container defaultActiveKey="Eyes_only-tab-1">
          <div className="row">
            <div className="col-lg-3">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="Eyes_only-tab-1">English</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Eyes_only-tab-2">हिंदी</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Eyes_only-tab-3">मराठी</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <div className="col-lg-9 mt-4 mt-lg-0">
              <Tab.Content>
                <Tab.Pane eventKey="Eyes_only-tab-1">
                  {renderPoetryList("English", "/prose/english")}
                </Tab.Pane>

                <Tab.Pane eventKey="Eyes_only-tab-2">
                  {renderPoetryList("Hindi", "/prose/hindi")}
                </Tab.Pane>

                <Tab.Pane eventKey="Eyes_only-tab-3">
                  {renderPoetryList("Marathi", "/prose/marathi")}
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
    </section>
  );
}

export default EyesOnly;
