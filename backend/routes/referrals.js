const express = require('express');
const { PrismaClient } = require('@prisma/client');
const sendReferralEmail = require('../utils/sendReferralEmail');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/referrals', async (req, res) => {
    console.log('Received referral request:', req.body);
    
    const { referrerName, referrerEmail, refereeName, refereeEmail, course } = req.body;
  
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const referral = await prisma.referral.create({
        data: {
          referrerName,
          referrerEmail,
          refereeName,
          refereeEmail,
          course,
        },
      });
      res.status(201).json(referral);
  
      sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail, course);
    } catch (error) {
      console.error('Error processing referral:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

module.exports = router;