// PoetryApp.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PoetryTable = ({ poems, refreshPoems }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/poetry/delete/${id}`);
      alert("Poetry post deleted successfully");
      refreshPoems();
    } catch (error) {
      console.error("Error deleting poetry post:", error);
      alert("Error deleting poetry post");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/poetry/approve/${id}`);
      alert("Poetry post approved successfully");
      refreshPoems();
    } catch (error) {
      console.error("Error approving poetry post:", error);
      alert("Error approving poetry post");
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
          <th>Category</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {poems.map((poem) => (
          <tr key={poem.id}>
            <td>{poem.title}</td>
            <td>{poem.content}</td>
            <td>{poem.author}</td>
            <td>{poem.rollno}</td>
            <td>
              {poem.image ? (
                <img
                  src={`data:image/png;base64,${poem.image}`}
                  alt="Poetry"
                  width="50"
                />
              ) : (
                "No Image"
              )}
            </td>
            <td>{poem.category}</td>
            <td>{poem.approved ? "Approved" : "Pending"}</td>
            <td>
              <button onClick={() => handleDelete(poem.id)}>Delete</button>
              {!poem.approved && (
                <button onClick={() => handleApprove(poem.id)}>Approve</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PoetryApp = () => {
  const [poems, setPoems] = useState([]);

  const fetchPoems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/poetry/getall");
      setPoems(response.data);
    } catch (error) {
      console.error("Error fetching poetry entries:", error);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <div>
      <h2>Poetry Entries</h2>
      <PoetryTable poems={poems} refreshPoems={fetchPoems} />
    </div>
  );
};

export default PoetryApp;
