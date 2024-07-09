import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
    },
    background: {
      default: '#111827',
      paper: '#1f2937',
    },
  },
});

const ReferralModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          course: 'default_course'
        }),
        credentials: 'include'
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Referral submitted successfully:', data);
      
      setFormData({
        referrerName: '',
        referrerEmail: '',
        refereeName: '',
        refereeEmail: ''
      });
      
      handleClose();
    } catch (error) {
      console.error('Error submitting referral form:', error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Modal open={open} onClose={handleClose}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'white' }}>
            Refer a Friend
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              margin="normal" 
              name="referrerName" 
              label="Your Name" 
              value={formData.referrerName} 
              onChange={handleChange} 
              required 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              name="referrerEmail" 
              label="Your Email" 
              value={formData.referrerEmail} 
              onChange={handleChange} 
              required 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              name="refereeName" 
              label="Friend's Name" 
              value={formData.refereeName} 
              onChange={handleChange} 
              required 
            />
            <TextField 
              fullWidth 
              margin="normal" 
              name="refereeEmail" 
              label="Friend's Email" 
              value={formData.refereeEmail} 
              onChange={handleChange} 
              required 
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: '#3b82f6',
                '&:hover': { 
                  backgroundColor: '#2563eb' 
                } 
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default ReferralModal;