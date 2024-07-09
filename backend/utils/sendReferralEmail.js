const nodemailer = require('nodemailer');

async function sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail, course) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: refereeEmail,
    subject: 'Course Referral',
    text: `Hi ${refereeName},\n\n${referrerName} (${referrerEmail}) has referred you for the course: ${course}.\n\nBest regards,\nYour Company`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Referral email sent successfully!', info.response);
    return { success: true, message: 'Referral email sent successfully!' };
  } catch (error) {
    console.error('Error sending referral email:', error);
    return { success: false, message: 'Error sending referral email. Please try again later.' };
  }
}

module.exports = sendReferralEmail;
