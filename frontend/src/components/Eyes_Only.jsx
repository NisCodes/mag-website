import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import "../css/blog.css";

function EyesOnly() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();

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
                {/* ENGLISH TAB OVERVIEW */}
                <Tab.Pane eventKey="Eyes_only-tab-1">
                  <div className="row align-items-center">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>English Literature</h3>
                      <p className="fst-italic" style={{ color: "#ddd" }}>
                        Dive into a curated collection of English verses, essays, and stories penned down by the students of VNIT. Explore the beautiful complexities of modern thought and classic storytelling.
                      </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src="assets/img/Eyes_only-1.png" alt="English" className="img-fluid" style={{ borderRadius: "8px", maxHeight: "150px" }} />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button className="btn btn-primary btn-golden" onClick={() => navigate("/prose/english")} style={{ maxWidth: "200px" }}>
                      Explore English Compositions →
                    </button>
                  </div>
                </Tab.Pane>

                {/* HINDI TAB OVERVIEW */}
                <Tab.Pane eventKey="Eyes_only-tab-2">
                  <div className="row align-items-center">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>हिंदी साहित्य</h3>
                      <p className="fst-italic" style={{ color: "#ddd" }}>
                        मातृभाषा की मिठास और कविताओं के गहरे भाव। यहाँ आपको हमारे संस्थान के नवोदित कवियों और लेखकों की सुंदर रचनाएँ मिलेंगी।
                      </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src="assets/img/Eyes_only-1.png" alt="Hindi" className="img-fluid" style={{ borderRadius: "8px", maxHeight: "150px" }} />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button className="btn btn-primary btn-golden" onClick={() => navigate("/prose/hindi")} style={{ maxWidth: "200px" }}>
                      रचनाएँ देखें →
                    </button>
                  </div>
                </Tab.Pane>

                {/* MARATHI TAB OVERVIEW */}
                <Tab.Pane eventKey="Eyes_only-tab-3">
                  <div className="row align-items-center">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>मराठी वाड्मय</h3>
                      <p className="fst-italic" style={{ color: "#ddd" }}>
                        मराठी साहित्याचा समृद्ध वारसा आणि विद्यार्थ्यांच्या कल्पकतेतून साकारलेल्या सुंदर कविता, चारोळ्या आणि ललित लेख.
                      </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src="assets/img/Eyes_only-1.png" alt="Marathi" className="img-fluid" style={{ borderRadius: "8px", maxHeight: "150px" }} />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button className="btn btn-primary btn-golden" onClick={() => navigate("/prose/marathi")} style={{ maxWidth: "200px" }}>
                      साहित्य वाचा →
                    </button>
                  </div>
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
