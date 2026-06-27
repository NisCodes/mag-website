import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import "../css/prose.css";

const Prose = ({ category }) => {
  const [proseEntries, setProseEntries] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Fetch prose entries from the backend
  useEffect(() => {
    axios.get('https://mag-backend-lime.vercel.app/poetry/get')
      .then(response => {
        // Defensive case-insensitive matching to make sure everything filters perfectly
        const proseData = response.data.filter(entry => 
          entry.category && entry.category.toLowerCase() === category.toLowerCase()
        );
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

  // Determine dynamic clean headings
  let title = "Prose Collection";
  if (category.toLowerCase() === "hindi") title = "~~अफ़साना~~";
  else if (category.toLowerCase() === "marathi") title = "~~वात्सल्याचे मोती~~";
  else if (category.toLowerCase() === "english") title = "~~Vellichor~~";

  return (
    <div className="prose-container" style={{ padding: "40px 20px", minHeight: "80vh" }}>
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
          marginBottom: '30px'
        }}
      >
        {title}
      </h2>

      {proseEntries.length === 0 ? (
        <div className="text-center py-4" style={{ color: "#aaa", RoyalBlue: "italic" }}>
          <p className="fst-italic">No approved compositions published under this section yet.</p>
        </div>
      ) : (
        proseEntries.map((entry, index) => (
          <div key={entry.id || entry._id || index} className="prose-entry" style={{ marginBottom: "15px" }}>
            <div 
              className="prose-header" 
              onClick={() => toggleExpand(index)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h3 className="prose-entry-title" style={{ color: '#cca45e', margin: 0 }}>
                {entry.title} <span style={{ fontSize: '0.75rem', color: '#aaa', marginLeft: '10px' }}>by {entry.author}</span>
              </h3>
              <span className="prose-toggle-icon" style={{ color: '#cca45e' }}>
                {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {expandedIndex === index && (
              <div className="prose-details" style={{ marginTop: '15px', padding: '15px', backgroundColor: 'rgba(25, 25, 25, 0.5)', borderRadius: '8px' }}>
                {entry.image && (
                  <img src={`data:image/png;base64,${entry.image}`} alt={entry.title} className="prose-image" />
                )}
                
                {/* Clean paragraph wrapper using pre-wrap to keep lines intact natively */}
                <p
                  className="prose-content"
                  style={{ color: 'white', whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '0.95rem' }}
                >
                  {entry.content}
                </p>
                
                <hr style={{ borderColor: 'rgba(204, 164, 94, 0.2)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa' }}>
                  <span><strong>Roll No:</strong> {entry.rollno || "N/A"}</span>
                  <span><strong>Published:</strong> {entry.date ? entry.date.slice(0, 10) : "N/A"}</span>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Prose;
