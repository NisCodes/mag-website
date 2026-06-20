import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import "../css/prose.css";

const Prose = ({ category }) => {
  const [proseEntries, setProseEntries] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Fetch prose entries from the backend
  useEffect(() => {
    axios.get('http://localhost:4000/poetry/get')
      .then(response => {
        // Filter entries based on the 'Prose' category or any specific condition
        const proseData = response.data.filter(entry => entry.category === category);
        setProseEntries(proseData);
      })
      .catch(error => {
        console.error('Error fetching prose entries:', error);
      });
  }, [category]);

  // Handle expand/collapse of a specific prose entry
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  // Helper function to format the content with line breaks
  const formatContentWithLineBreaks = (text) => {
    return text.replace(/\r\n/g, "<br />");
  };
  var title = "nulll"
  if(category=== "Hindi") title = "~~अफ़साना~~"
  else if(category === "Marathi") title = "~~वात्सल्याचे मोती~~"
  else title = "Prose"
  return (
    <div className="prose-container">
      <h2 
        className="prose-title" 
        style={{
          color: 'goldenrod',
          fontWeight: 'bold',
          fontFamily: 'Georgia, serif', 
          fontSize: '2rem',
          textAlign: 'center',
          borderBottom: '2px solid goldenrod',
          paddingBottom: '0.5rem',
          letterSpacing: '1px',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
        }}
      >
        {title}
      </h2>
      {proseEntries.map((entry, index) => (
        <div key={index} className="prose-entry">
          <div className="prose-header" onClick={() => toggleExpand(index)}>
          <h3 className="prose-entry-title" style={{ color: '#cca45e' }}>
            {entry.title} <span style={{ fontSize: '0.7rem', color: 'white' }}>by {entry.author}</span>
          </h3>
            <span className="prose-toggle-icon">
              {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          
          {expandedIndex === index && (
            <div className="prose-details">
            {entry.image && (
              <img src={`data:image/png;base64,${entry.image}`} alt={entry.title} className="prose-image" />
            )}
            <p
              className="prose-content"
              style={{ color: 'white' }}
              dangerouslySetInnerHTML={{ __html: formatContentWithLineBreaks(entry.content) }}
            ></p>
            <p className="prose-author">Author: {entry.author}</p>
            <p className="prose-date">Date: {new Date(entry.date).toLocaleDateString()}</p>
          </div>

          )}
        </div>
      ))}
    </div>
  );
};

export default Prose;
