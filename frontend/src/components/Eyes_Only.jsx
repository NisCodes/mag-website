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
                
                {/* ENGLISH TAB */}
                <Tab.Pane eventKey="Eyes_only-tab-1">
                  <div className="row align-items-center">
                    <div className="col-md-8 details">
                      <h3>Vellichor</h3>
                      <p className="fst-italic" style={{ color: "#ddd", lineHeight: "1.6" }}>
                        (n.) the strange wistfulness of used bookstores, which are somehow infused with the passage of time—filled with thousands of old books you’ll never have time to read.
                      </p>
                    </div>
                    <div className="col-md-4 text-center mt-3 mt-md-0">
                      <button 
                        className="btn btn-primary btn-golden w-100" 
                        onClick={() => navigate("/prose/english")}
                        style={{ padding: "12px 20px", fontWeight: "600" }}
                      >
                        Explore English Compositions →
                      </button>
                    </div>
                  </div>
                </Tab.Pane>

                {/* HINDI TAB */}
                <Tab.Pane eventKey="Eyes_only-tab-2">
                  <div className="row align-items-center">
                    <div className="col-md-8 details">
                      <h3>अफ़साना</h3>
                      <p style={{ color: "#ddd", lineHeight: "1.8", whiteSpace: "pre-line" }}>
                        अब कलम परेशाँ कातिब से क्यों लिखे वो केवल आठ पहर, क्यों रहे वो केवल एक शहर। 
                        सपनो के शहर में क्यों न रहे ? मिथ्या की लहर में क्यों न बहे ?
                        तो कलम पकड़ कातिब की कलाई, तोड़े अडिग समाज का ताला 
                        जग-संसार को झूठ बताए, चलो लिखे कोई अफ़साना
                      </p>
                    </div>
                    <div className="col-md-4 text-center mt-3 mt-md-0">
                      <button 
                        className="btn btn-primary btn-golden w-100" 
                        onClick={() => navigate("/prose/hindi")}
                        style={{ padding: "12px 20px", fontWeight: "600" }}
                      >
                        रचनाएँ देखें →
                      </button>
                    </div>
                  </div>
                </Tab.Pane>

                {/* MARATHI TAB */}
                <Tab.Pane eventKey="Eyes_only-tab-3">
                  <div className="row align-items-center">
                    <div className="col-md-8 details">
                      <h3>वात्सल्याचे मोती</h3>
                      <p style={{ color: "#ddd", lineHeight: "1.8", whiteSpace: "pre-line" }}>
                        तुटले बांध स्वप्नांचे, हरवले साज रंगांचे, दाही दिशांना आस नयनांची, 
                        आणि खुंटलेले वस्त्र विचारांचे, मळलेला रंग मुखवट्याचा, झालेला भंग प्रेमाचा, 
                        कथा असो कोणतीही, आला पाऊस घेऊन संच कहाण्यांचा !
                      </p>
                    </div>
                    <div className="col-md-4 text-center mt-3 mt-md-0">
                      <button 
                        className="btn btn-primary btn-golden w-100" 
                        onClick={() => navigate("/prose/marathi")}
                        style={{ padding: "12px 20px", fontWeight: "600" }}
                      >
                        साहित्य वाचा →
                      </button>
                    </div>
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
