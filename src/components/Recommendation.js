import React from 'react';
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

function Recommendation({ movie, onFeedback }) {
  return (
    <div>
      <h2>Recommended Movie</h2>
      <div>
        <img src={movie.src} alt={movie.title} style={{width: '25%', height: '25%',  marginBottom: '2px'}} />
      </div>
      <div>
        <p style={{ margin: '0' }}>UP! (2009)</p>
        <p style={{ margin: '0' }}>Director: Pete Docter</p>
        <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarHalfIcon />
        </div>
      </div>
      <h3>Rate this recommendation!</h3>
      <div>
        <Button
          color="primary" 
          style={{ margin: '10px', marginTop:'2px', borderRadius: '5px', padding: '30px 45px', fontSize: '48px' }} 
          onClick={() => onFeedback('thumbs-up')}>👍
        </Button>
        <Button 
          color="primary" 
          style={{ margin: '10px', borderRadius: '5px', padding: '30px 45px', fontSize: '48px' }} 
          onClick={() => onFeedback('thumbs-down')}>👎
        </Button>
      </div>
    </div>
  );
}

export default Recommendation;
