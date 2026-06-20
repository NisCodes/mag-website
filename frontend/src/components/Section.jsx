import React from "react";

const Section = () => {
  return (
    <section id="hero" className="hero section dark-background">
      <img src="assets/img/sar_blur3.JPG" alt="" />

      <div className="container">
        <div className="row">
          <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-start">
            <h2>
              Welcome to <span>MAG.com</span>
            </h2>
            <p>Literature Society of VNIT Nagpur</p>
            <div className="d-flex mt-4">
              <a href="#blog" className="cta-btn">
                Blogs
              </a>
              <a href="#add-your-content" className="cta-btn">
                Insight Magazine
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
