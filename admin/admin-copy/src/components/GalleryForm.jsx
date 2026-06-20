import React, { useState } from "react";
import axios from "axios";

const GalleryForm = () => {
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Directly set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData(); 

    if (imageFile) {
      formDataObj.append("image", imageFile); // Append image file to formData
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/gallery/post",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Gallery post submitted successfully");
    } catch (error) {
      console.error("Error submitting gallery post:", error);
      alert("Error submitting gallery post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">Submit Image</button>
    </form>
  );
};

export default GalleryForm;
