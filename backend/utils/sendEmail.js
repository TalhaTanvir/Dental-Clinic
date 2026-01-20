const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Define email options
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // Send email
  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

// Send appointment confirmation email
const sendAppointmentConfirmation = async (appointment) => {
  const message = `
    <h2>Appointment Request Received</h2>
    <p>Dear ${appointment.name},</p>
    <p>Thank you for requesting an appointment at Dr. Mitchell's Dental Clinic.</p>
    <h3>Appointment Details:</h3>
    <ul>
      <li><strong>Service:</strong> ${appointment.service}</li>
      <li><strong>Preferred Time:</strong> ${appointment.preferredTime}</li>
      ${appointment.preferredDate ? `<li><strong>Preferred Date:</strong> ${new Date(appointment.preferredDate).toLocaleDateString()}</li>` : ''}
    </ul>
    <p>We will contact you shortly to confirm your appointment.</p>
    <p>If you have any questions, please call us at (555) 123-4567.</p>
    <br>
    <p>Best regards,</p>
    <p>Dr. Mitchell's Dental Clinic Team</p>
  `;

  await sendEmail({
    email: appointment.email,
    subject: 'Appointment Request Received - Dr. Mitchell Dental Clinic',
    html: message
  });
};

// Send new appointment notification to admin
const sendNewAppointmentNotification = async (appointment) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL;
  
  const message = `
    <h2>New Appointment Request</h2>
    <h3>Patient Details:</h3>
    <ul>
      <li><strong>Name:</strong> ${appointment.name}</li>
      <li><strong>Email:</strong> ${appointment.email}</li>
      <li><strong>Phone:</strong> ${appointment.phone}</li>
      <li><strong>New Patient:</strong> ${appointment.isNewPatient || 'Not specified'}</li>
    </ul>
    <h3>Appointment Details:</h3>
    <ul>
      <li><strong>Service:</strong> ${appointment.service}</li>
      <li><strong>Preferred Time:</strong> ${appointment.preferredTime}</li>
      ${appointment.preferredDate ? `<li><strong>Preferred Date:</strong> ${new Date(appointment.preferredDate).toLocaleDateString()}</li>` : ''}
    </ul>
    ${appointment.message ? `<h3>Additional Message:</h3><p>${appointment.message}</p>` : ''}
  `;

  await sendEmail({
    email: adminEmail,
    subject: 'New Appointment Request',
    html: message
  });
};

module.exports = {
  sendEmail,
  sendAppointmentConfirmation,
  sendNewAppointmentNotification
};
