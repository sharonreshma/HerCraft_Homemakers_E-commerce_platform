import React, { useState } from 'react';
import '../styles/Collaborators.css';

// Import your collaborator images
import collaborator1 from '../assets/col2.jpg';
import collaborator2 from '../assets/col1.jpg';
import collaborator3 from '../assets/col3.jpg';


const Collaborators = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const collaborators = [
    { image: collaborator1, name: 'Nita Suresh', details: 'Founder of Artistry'},
            { image: collaborator2, name: 'Rithika Parek', details: 'Founder of Sajna' },
    { image: collaborator3, name: 'Ruth Patel ', details: 'Founder of KnitMits.' },
    
  ];

  const handleCardClick = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  return (
    <div className="collaborators-container">
      <h2 className="collaborators-title">Our Leading Partners</h2>
      <div className="collaborators-wrapper">
        {collaborators.map((collaborator, index) => (
          <div
            key={index}
            className={`collaborator-card ${expandedCard === index ? 'expanded' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div
              className="collaborator-image"
              style={{ backgroundImage: `url(${collaborator.image})` }}
            ></div>
            <div className={`collaborator-info ${expandedCard === index ? 'show' : 'hide'}`}>
              <p className="collaborator-name">{collaborator.name}</p>
              {expandedCard === index && (
                <p className="collaborator-description">{collaborator.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborators;
