require('dotenv').config(); // Ensure this line is at the top to load env variables

const nodemailer = require('nodemailer');

async function sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail, course) {
  // Ensure environment variables are loaded
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing email configuration in environment variables.');
    return { success: false, message: 'Email configuration error. Please check your environment variables.' };
  }

  // Create transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: refereeEmail,
    subject: 'Course Referral',
    text: `Hi ${refereeName},\n\n${referrerName} (${referrerEmail}) has referred you for the course: ${course}.\n\nBest regards,\nYour Company`,
  };

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.log('Referral email sent successfully!', info.response);
    return { success: true, message: 'Referral email sent successfully!' };
  } catch (error) {
    console.error('Error sending referral email:', error.message, error.stack);
    return { success: false, message: 'Error sending referral email. Please try again later.' };
  }
}

module.exports = sendReferralEmail;
