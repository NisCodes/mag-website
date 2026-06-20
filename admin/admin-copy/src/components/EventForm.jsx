import React, { useState, useEffect } from "react";
import axios from "axios";

// EventForm component for submitting new events
const EventForm = ({ refreshEvents }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    date: "",
  });

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
    formDataObj.append("title", formData.title);
    formDataObj.append("content", formData.content);
    formDataObj.append("date", formData.date);
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    try {
      await axios.post("http://localhost:4000/events/post", formDataObj);
      alert("Event post submitted successfully");
      setFormData({ title: "", content: "", image: null, date: "" });
      refreshEvents();
    } catch (error) {
      console.error("Error submitting event post:", error);
      alert("Error submitting event post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">Submit Event</button>
    </form>
  );
};

// EventTable component to display events and handle delete actions
const EventTable = ({ events, refreshEvents }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/events/delete/${id}`);
      alert("Event deleted successfully");
      refreshEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event");
    }
  };

  return (
    <table border="1" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Date</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{event.title}</td>
            <td>{event.content}</td>
            <td>{event.date}</td>
            <td>{event.image ? <img src={event.image} alt="Event" width="50" /> : "No Image"}</td>
            <td>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// EventApp component to manage event form and event list
const EventApp = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/events/get");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Event Submission</h1>
      <EventForm refreshEvents={fetchEvents} />
      <h2>Event List</h2>
      <EventTable events={events} refreshEvents={fetchEvents} />
    </div>
  );
};

export default EventApp;
