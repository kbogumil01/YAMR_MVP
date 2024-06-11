import React, { useRef } from 'react';
import { Button } from '@mui/material';

function Rating({ question, options, onAnswer, videoSrc }) {
  const videoRef = useRef(null);


  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="video-container">
        <video ref={videoRef} src={videoSrc} controls style={{ display: 'block', margin: 'auto', marginBottom: '10px' }} />
      </div>
      <div className="button-container">
        {options.map((option, index) => (
          <Button 
            key={index} 
            variant="contained" 
            color="primary" 
            style={{ margin: '10px', borderRadius: '5px', padding: '30px 45px', fontSize: '32px' }}
            onClick={() => {onAnswer(option)}}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Rating;