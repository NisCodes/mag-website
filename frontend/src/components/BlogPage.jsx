import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/navbar.css";
import "../css/blog.css"; 

const BlogPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('*');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); 

  useEffect(() => {
    // Updated to hit your specific '/get' route which only returns APPROVED blogs
    axios.get('https://mag-backend-lime.vercel.app/blogs/get')
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    document.body.classList.add('blog-blur-background'); 
  };

  const closeModal = () => {
    setSelectedBlog(null);
    document.body.classList.remove('blog-blur-background'); 
  };

  // NEW BULLETPROOF FILTERING LOGIC
  const filteredBlogs = selectedFilter === '*'
    ? blogs
    : blogs.filter(blog => {
        if (!blog.category) return false;
        
        // Convert both the filter and the database category to lowercase and remove trailing spaces
        const targetFilter = selectedFilter.toLowerCase().trim();
        
        if (Array.isArray(blog.category)) {
          return blog.category.some(cat => cat.toLowerCase().trim() === targetFilter);
        }
        return blog.category.toLowerCase().trim() === targetFilter;
      });

  if (loading) {
    return (
      <section id="blog" className="blog section">
         <div className="container text-center mt-5">
           <p className="text-muted fst-italic">Loading recent articles...</p>
         </div>
      </section>
    );
  }

  const formatContentWithLineBreaks = (text) => {
    return text ? text.replace(/\r\n/g, "<br />") : "";
  };

  return (
    <section id="blog" className="blog section">
      <div className="container section-title" data-aos="fade-up">
        <h2>All Blogs</h2>
        <p>Explore all blogs from VNIT</p>
      </div>
      <div className="container isotope-layout">
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul className="blog-filters isotope-filters">
              <li onClick={() => handleFilterClick('*')}
                  className={selectedFilter === '*' ? "active-filter" : ""}>All</li>
              <li onClick={() => handleFilterClick('College Life')}
                  className={selectedFilter === 'College Life' ? "active-filter" : ""}>College Life</li>
              <li onClick={() => handleFilterClick('Intern Diaries')}
                  className={selectedFilter === 'Intern Diaries' ? "active-filter" : ""}>Intern Diaries</li>
              <li onClick={() => handleFilterClick('Research')}
                  className={selectedFilter === 'Research' ? "active-filter" : ""}>Research</li>
            </ul>
          </div>
        </div>
        <div className="row isotope-container" data-aos="fade-up" data-aos-delay="200">
          {filteredBlogs.length === 0 ? (
             <div className="col-12 text-center mt-4">
               <p className="text-muted">No articles found in this category yet.</p>
             </div>
          ) : (
            filteredBlogs.map((blog, index) => (
              <div key={blog.id || index} className="col-md-4 col-sm-6 d-flex justify-content-center">
                <div
                  className="card bg-dark text-light mb-4 blog-card"
                  style={{ width: '18rem', borderRadius: '10px', cursor: 'pointer' }}
                  onClick={() => handleBlogClick(blog)} 
                >
                  {blog.image ? (
                    <img
                      src={`data:image/png;base64,${blog.image}`}
                      className="card-img-top"
                      alt={blog.title}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div 
                      className="card-img-top d-flex align-items-center justify-content-center" 
                      style={{ height: "150px", backgroundColor: "#1c1c1c", color: 'goldenrod', borderBottom: "1px solid #333" }}
                    >
                      <span style={{ fontSize: "1.2rem", fontWeight: "bold", fontFamily: "Georgia, serif" }}>MAG.com</span>
                    </div>
                  )}
                  <div className="card-body" style={{backgroundColor: 'black', padding: '0.5rem' }}>
                    <h5 className="card-title" style={{color: 'goldenrod', fontSize: '1rem' }}>{blog.title}</h5>
                    <p className="card-text" style={{ fontSize: '0.875rem' }}>
                      {blog.content ? blog.content.slice(0, 60) : "No content available"}...
                    </p>
                    <span style={{ fontSize: '0.8rem' }}>Author: {blog.author || "Anonymous"}</span>
                    <p className="card-text" style={{ fontSize: '0.8rem' }}>
                      <small>Date: {blog.date ? new Date(blog.date).toLocaleDateString() : "Recent"}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for blog content */}
      {selectedBlog && (
        <div className="blog-modal" onClick={closeModal}>
          <div className="blog-modal-content" style={{backgroundColor: "black"}} onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={closeModal}>&times;</span>
            <h2 className="blog-modal-title">{selectedBlog.title}</h2>
            <p className="blog-modal-author">Author: {selectedBlog.author || "Anonymous"}</p>
            <small className="blog-modal-date">
              Date: {selectedBlog.date ? new Date(selectedBlog.date).toLocaleDateString() : "Recent"}
            </small>
            {selectedBlog.image && (
              <img
                src={`data:image/png;base64,${selectedBlog.image}`}
                alt={selectedBlog.title}
                className="blog-modal-image"
              />
            )}
            <p
              className="blog-modal-text"
              dangerouslySetInnerHTML={{ __html: formatContentWithLineBreaks(selectedBlog.content) }}
            ></p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogPage;
