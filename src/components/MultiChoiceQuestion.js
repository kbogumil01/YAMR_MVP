import React, { useState } from 'react';
import './MultiChoiceQuestion.css';

function MultiChoiceQuestion({ question, options, onAnswer }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOptions(prevSelectedOptions =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter(opt => opt !== option)
        : [...prevSelectedOptions, option]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      onAnswer(selectedOptions);
    }
  };

  return (
    <div className="multi-choice-question">
      <h2>{question}</h2>
      <div className="options">
        {options.map(option => (
          <label key={option} className="option-label">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="option-checkbox"
            />
            {option}
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={selectedOptions.length === 0}
      >
        Submit
      </button>
    </div>
  );
}

export default MultiChoiceQuestion;
