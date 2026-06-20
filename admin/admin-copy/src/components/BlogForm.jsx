import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogTable = ({ blogs, refreshBlogs }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/blogs/delete/${id}`);
      alert("Blog post deleted successfully");
      refreshBlogs();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("Error deleting blog post");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/blogs/approve/${id}`);
      alert("Blog post approved successfully");
      refreshBlogs();
    } catch (error) {
      console.error("Error approving blog post:", error);
      alert("Error approving blog post");
    }
  };

  return (
    <table border="1" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Author</th>
          <th>Roll No</th>
          <th>Image</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>{blog.title}</td>
            <td>{blog.content}</td>
            <td>{blog.author}</td>
            <td>{blog.rollno}</td>
            <td>{blog.image ? <img src={blog.image} alt="Blog" width="50" /> : "No Image"}</td>
            <td>{blog.approved ? "Approved" : "Pending"}</td>
            <td>
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
              {!blog.approved && (
                <button onClick={() => handleApprove(blog.id)}>Approve</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
const BlogApp = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/blogs/getall");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blog Entries</h2>
      <BlogTable blogs={blogs} refreshBlogs={fetchBlogs} />
    </div>
  );
};

export default BlogApp;
