import React, { useEffect, useState } from "react";
import axios from "axios";

const MagazineForm = () => {
  const [formData, setFormData] = useState({
    edition: "",
    link: "",
    image: null,
  });
  const [magazines, setMagazines] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("edition", formData.edition);
    formDataObj.append("link", formData.link);
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    try {
      await axios.post("http://localhost:4000/magazine/post", formDataObj);
      alert("Magazine post submitted successfully");
      fetchMagazines(); // Refresh magazine list after adding a new entry
    } catch (error) {
      console.error("Error submitting Magazine post:", error);
      alert("Error submitting Magazine post");
    }
  };

  const fetchMagazines = async () => {
    try {
      const response = await axios.get("http://localhost:4000/magazine/get");
      setMagazines(response.data); // Update the state with fetched magazines
    } catch (error) {
      console.error("Error fetching magazines:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/magazine/delete/${id}`);
      alert("Magazine deleted successfully");
      fetchMagazines(); // Refresh magazine list after deletion
    } catch (error) {
      console.error("Error deleting magazine:", error);
      alert("Error deleting magazine");
    }
  };

  useEffect(() => {
    fetchMagazines(); // Fetch magazines on component mount
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Edition:</label>
          <input
            type="text"
            name="edition"
            value={formData.edition}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Link:</label>
          <textarea
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit Magazine</button>
      </form>

      <h3>Magazine List</h3>
      <table>
        <thead>
          <tr>
            <th>Edition</th>
            <th>Link</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {magazines.map((magazine) => (
            <tr key={magazine.id}>
              <td>{magazine.edition}</td>
              <td><a href={magazine.link} target="_blank" rel="noopener noreferrer">View Link</a></td>
              <td>
                {magazine.image && (
                  <img src={magazine.image} alt="Magazine cover" width="50" />
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(magazine.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MagazineForm;
