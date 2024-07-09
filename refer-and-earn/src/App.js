import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import ReferralModal from './components/ReferralModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleReferNowClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <HeroSection onReferNowClick={handleReferNowClick} />
      <ReferralModal open={modalOpen} handleClose={handleCloseModal} />
    </div>
  );
}

export default App;
