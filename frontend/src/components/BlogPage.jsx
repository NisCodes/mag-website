import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/navbar.css";
import "../css/blog.css"; 

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); 

  useEffect(() => {
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

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    document.body.classList.add('blog-blur-background'); 
  };

  const closeModal = () => {
    setSelectedBlog(null);
    document.body.classList.remove('blog-blur-background'); 
  };

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
    return text ? text.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />") : "";
  };

  return (
    <section id="blog" className="blog section">
      <div className="container section-title" data-aos="fade-up">
        <h2>All Blogs</h2>
        <p>Explore all blogs from VNIT</p>
      </div>

      <div className="container">
        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="200">
          {blogs.length === 0 ? (
             <div className="col-12 text-center mt-4">
               <p className="text-muted">No articles found yet.</p>
             </div>
          ) : (
            blogs.map((blog, index) => {
              const displayAuthor = blog.author || blog.authorName || blog.writer || "Anonymous";
              return (
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
                      <span style={{ fontSize: '0.8rem' }}>Author: {displayAuthor}</span>
                      <p className="card-text" style={{ fontSize: '0.8rem' }}>
                        <small>Date: {blog.date ? new Date(blog.date).toLocaleDateString() : "Recent"}</small>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL FOR FULL TEXT VIEWING */}
      {selectedBlog && (
        <div 
          className="blog-modal" 
          onClick={closeModal}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center',
            alignItems: 'center', zIndex: 99999, overflowY: 'auto', padding: '20px'
          }}
        >
          <div 
            className="blog-modal-content" 
            style={{
              backgroundColor: "#111", color: "#fff", padding: "30px", 
              borderRadius: "12px", maxWidth: "700px", width: "100%", 
              maxHeight: "90vh", overflowY: "auto", position: "relative",
              border: "1px solid #cca45e"
            }} 
            onClick={e => e.stopPropagation()}
          >
            <span 
              className="close-modal" 
              onClick={closeModal}
              style={{ position: 'absolute', top: '15px', right: '20px', fontSize: '2rem', cursor: 'pointer', color: '#cca45e' }}
            >
              &times;
            </span>
            <h2 className="blog-modal-title" style={{ color: '#cca45e', fontFamily: 'Georgia, serif' }}>{selectedBlog.title}</h2>
            <p className="blog-modal-author" style={{ fontStyle: 'italic', margin: '5px 0' }}>
              Author: {selectedBlog.author || selectedBlog.authorName || selectedBlog.writer || "Anonymous"}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>
              Date: {selectedBlog.date ? new Date(selectedBlog.date).toLocaleDateString() : "Recent"}
            </p>
            <hr style={{ borderColor: '#333' }} />
            {selectedBlog.image && (
              <img
                src={`data:image/png;base64,${selectedBlog.image}`}
                alt={selectedBlog.title}
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
              />
            )}
            <p
              className="blog-modal-text"
              style={{ lineHeight: '1.6', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: formatContentWithLineBreaks(selectedBlog.content) }}
            ></p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogPage;
