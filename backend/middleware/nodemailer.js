// lpil baar rsdw hznj 
// mailer.js
const nodemailer = require('nodemailer');

// Create a transporter using your Gmail credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhujelsanjita7@gmail.com',
        pass: 'lpil baar rsdw hznj', // Use App Passwords if you have 2FA enabled
    },
});

// Verify the transporter connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error with email transporter:', error);
    } else {
        console.log('Email transporter is ready to send emails');
    }
});

// Function to send an email
const sendEmail = async (fromName,to, subject, html) => {
    const mailOptions = {
        from: `${fromName}<bhujelsanjita7@gmail.com>`,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendEmail,
};
