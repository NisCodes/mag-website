import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios";
import "../css/navbar.css";
import "../css/blog.css";
const BlogSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("*");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for "Explore More" button

  useEffect(() => {
    axios
      .get("http://localhost:4000/blogs/get")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredBlogs =
    selectedFilter === "*"
      ? blogs
      : blogs.filter((item) =>
          Array.isArray(item.category)
            ? item.category.includes(selectedFilter)
            : item.category === selectedFilter
        );

  const displayedBlogs = filteredBlogs
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="blog" className="blog section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Blog</h2>
        <p>Blogs of VNIT</p>
      </div>
      <div className="container isotope-layout">
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul className="blog-filters isotope-filters">
              <li
                onClick={() => handleFilterClick("*")}
                className={selectedFilter === "*" ? "active-filter" : ""}
              >
                All
              </li>
              <li
                onClick={() => handleFilterClick("College Life")}
                className={
                  selectedFilter === "College Life" ? "active-filter" : ""
                }
              >
                College Life
              </li>
              <li
                onClick={() => handleFilterClick("Intern Diaries")}
                className={
                  selectedFilter === "Intern Diaries" ? "active-filter" : ""
                }
              >
                Intern Diaries
              </li>
              <li
                onClick={() => handleFilterClick("Research")}
                className={selectedFilter === "Research" ? "active-filter" : ""}
              >
                Research
              </li>
            </ul>
          </div>
        </div>
        <div
          className="row isotope-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {displayedBlogs.map((blog, index) => (
            <div
              key={index}
              className="col-md-4 col-sm-6 d-flex justify-content-center"
            >
              <div
                className="card bg-dark text-light mb-4"
                style={{ width: "18rem", borderRadius: "10px" }}
              >
                <img
                  src={`data:image/png;base64,${blog.image}`}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body" style={{backgroundColor: "black", padding: "0.5rem" }}>
                  <h5 className="card-title" style={{color: "#cca45e", fontSize: "1rem" }}>
                    {blog.title}
                  </h5>
                  <p className="card-text" style={{ fontSize: "0.875rem" }}>
                    {blog.content.slice(0, 60)}...
                  </p>
                  <span style={{ fontSize: "0.8rem" }}>
                    Author: {blog.author}
                  </span>
                  <p className="card-text" style={{ fontSize: "0.8rem" }}>
                    <small>
                      Date: {new Date(blog.date).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-4">
          <button
            className="btn btn-primary btn-golden"
            onClick={() => navigate("/blogs")}
          >
            Explore More
          </button>{" "}
          {/* Explore More Button */}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
