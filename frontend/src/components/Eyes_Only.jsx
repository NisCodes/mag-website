import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { Tab, Nav } from "react-bootstrap";
import "../css/blog.css";
function EyesOnly() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate(); // Use navigate for "Explore More" button

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
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>Vellichor</h3>
                      <p className="fst-italic">
                        (n.) the strange wistfulness of used bookstores, which are somehow infused with the passage of time—filled with thousands of old books you’ll never have time to read.
                      </p>
                      
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/Eyes_only-1.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button
                      className="btn btn-primary btn-golden"
                      onClick={() => navigate("/prose/english")}
                    >
                      Explore More
                    </button>{" "}
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="Eyes_only-tab-2">
                  {/* Similar structure as above */}
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>अफ़साना</h3>
              
                      <p>
                      अब कलम परेशाँ कातिब से <br /> 
                      क्यों लिखे वो केवल आठ पहर, 
                      क्यों रहे वो केवल एक शहर। <br />
                      सपनो के शहर में क्यों न रहे ?
                      मिथ्या की लहर में क्यों न बहे ?<br />
                      तो कलम पकड़ कातिब की कलाई,
                      तोड़े अडिग समाज का ताला <br />
                      जग-संसार को झूठ बताए, 
                      चलो लिखे कोई अफ़साना<br />

                      </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/Eyes_only-1.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button
                      className="btn btn-primary btn-golden"
                      onClick={() => navigate("/prose/hindi")}
                    >
                      Explore More
                    </button>{" "}
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="Eyes_only-tab-3">
                  {/* Similar structure as above */}
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>वात्सल्याचे मोती</h3>
            
                      <p>
                      तुटले बांध स्वप्नांचे,  <br />
                      हरवले साज रंगांचे,  <br />
                      दाही दिशांना आस नयनांची,  <br />
                      आणि खुंटलेले वस्त्र विचारांचे,  <br />
                      मळलेला रंग मुखवट्याचा,  <br />
                      झालेला भंग प्रेमाचा,  <br />
                      कथा असो कोणतीही,  <br />
                      आला पाऊस घेऊन संच कहाण्यांचा ! <br />
                      </p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src="assets/img/Eyes_only-1.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <button
                      className="btn btn-primary btn-golden"
                      onClick={() => navigate("/prose/marathi")}
                    >
                      Explore More
                    </button>{" "}
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
