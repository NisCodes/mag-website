import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/form.css";

function AddYourContent() {
  const [formType, setFormType] = useState("blogs");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    author: "",
    rollno: "",
    category: "College Life",
  });
  const [eventData, setEventData] = useState({
    title: "",
    content: "",
    image: null,
    author: "",
    rollno: "",
    category: "English",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (formType === "blogs") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setEventData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (formType === "blogs") {
      setFormData((prevData) => ({ ...prevData, image: file }));
    } else {
      setEventData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: "", success: "" });

    try {
      const formDataPayload = new FormData();
      if (formType === "blogs") {
        for (const key in formData) {
          formDataPayload.append(key, formData[key]);
        }
        await axios.post("http://localhost:4000/blogs/post", formDataPayload);
        setFormStatus({
          loading: false,
          success: "Your blog will be posted soon. Thankyou!",
        });
        setFormData({
          title: "",
          content: "",
          image: null,
          author: "",
          rollno: "",
          category: "College Life",
        });
      } else {
        for (const key in eventData) {
          formDataPayload.append(key, eventData[key]);
        }
        await axios.post("http://localhost:4000/poetry/post", formDataPayload);
        setFormStatus({
          loading: false,
          success: "Poetry submitted successfully. Thankyou!",
        });
        setEventData({
          title: "",
          content: "",
          image: null,
          author: "",
          rollno: "",
          category: "English",
        });
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        error: "Error submitting the form. Please try again.",
      });
    }
  };

  return (
    <section id="add-your-content" className="add-your-content section">
      <div className="container section-title text-light" data-aos="fade-up">
        <h2>ADD YOUR CONTENT</h2>
        <p>Let VNIT know your mood</p>
      </div>

      <div className="container text-center mb-3">
        <button
          onClick={() => setFormType("blogs")}
          className={`btn btn-dark-brown ${
            formType === "blogs" ? "active" : ""
          } form-toggle-button me-2`}
          style={{color: "white"}}
        >
          Blogs
        </button>
        <button
          onClick={() => setFormType("events")}
          className={`btn btn-dark-brown ${
            formType === "events" ? "active" : ""
          } form-toggle-button`}
          style={{color: "white"}}
        >
          Poetry/Prose
        </button>
      </div>

      <div
        className="container form-container"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <form onSubmit={handleSubmit} className="php-email-form">
          {(formType === "blogs" || formType === "events") && (
            <>
              <div className="row gy-3">
                <div className="col-lg-6">
                  <input
                    type="text"
                    name="title"
                    className="form-control compact-input"
                    placeholder={
                      formType === "blogs" ? "Blog Title" : "Poetry Title"
                    }
                    required
                    value={
                      formType === "blogs" ? formData.title : eventData.title
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    type="text"
                    name="author"
                    className="form-control compact-input"
                    placeholder="Author Name"
                    required
                    value={
                      formType === "blogs" ? formData.author : eventData.author
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row gy-3">
                <div className="col-lg-6">
                  <input
                    type="text"
                    name="rollno"
                    className="form-control compact-input"
                    placeholder="Roll Number"
                    required
                    value={
                      formType === "blogs" ? formData.rollno : eventData.rollno
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-6">
                  <select
                    name="category"
                    className="form-select compact-input"
                    value={
                      formType === "blogs"
                        ? formData.category
                        : eventData.category
                    }
                    onChange={handleInputChange}
                    required
                  >
                    {formType === "blogs" ? (
                      <>
                        <option value="College Life">College Life</option>
                        <option value="Intern Diaries">Intern Diaries</option>
                        <option value="Research">Research</option>
                      </>
                    ) : (
                      <>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Express">Express</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="form-group mt-2">
                <textarea
                  className="form-control compact-input"
                  name="content"
                  rows="3"
                  placeholder="Content"
                  required
                  value={
                    formType === "blogs" ? formData.content : eventData.content
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mt-2">
                <input
                  type="file"
                  name="image"
                  className="form-control compact-input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}

          <div className="text-center mt-3">
            {formStatus.loading && <div className="loading">Loading...</div>}
            {formStatus.error && (
              <div className="error-message" style={{ color: "red" }}>{formStatus.error}</div>
            )}
            {formStatus.success && (
              <div className="sent-message" style={{ color: "green" }}>{formStatus.success}</div>
            )}
            <button type="submit" className="btn btn-dark-brown submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddYourContent;
