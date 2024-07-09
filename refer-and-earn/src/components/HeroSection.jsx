import React from 'react';
import { Button } from '@mui/material';

const HeroSection = ({ onReferNowClick }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8">Refer & Earn</h1>
        <Button 
          variant="contained" 
          onClick={onReferNowClick}
          sx={{ 
            backgroundColor: '#3b82f6', 
            color: 'white',
            fontSize: '1.1rem',
            padding: '10px 24px',
            '&:hover': { 
              backgroundColor: '#2563eb' 
            } 
          }}
        >
          Refer Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;