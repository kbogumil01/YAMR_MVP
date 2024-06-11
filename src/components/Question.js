import React from 'react';
import { Button } from '@mui/material';

function Question({ question, options, onAnswer }) {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="button-container">
        {options.map((option, index) => (
          <Button 
            key={index} 
            variant="contained" 
            color="primary" 
            style={{ margin: '10px', borderRadius: '5px', padding: '15px 30px', fontSize: '16px' }}
            onClick={() => onAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Question;