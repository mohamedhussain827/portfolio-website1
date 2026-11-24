const Contact = require('../models/Contact');
const emailRe = /^\S+@\S+\.\S+$/;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body || {};

    const errors = {};
    if (typeof name !== 'string' || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    if (typeof email !== 'string' || !emailRe.test(email.trim())) errors.email = 'Enter a valid email';
    if (typeof subject !== 'string' || subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters';
    if (typeof message !== 'string' || message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
    if (Object.keys(errors).length) return res.status(400).json({ success: false, errors });

    await Contact.create({ name, email, subject, message });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.MAIL_TO,
        replyTo: email,
        subject: `Portfolio message: ${subject}`,
        text: `From: ${name} (${email})\n\n${message}`,
      });
    } catch (err) {
      console.error('Email failed:', err.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (e) {
    if (e.name === 'ValidationError') return res.status(400).json({ success: false, message: 'Invalid input' });
    next(e);
  }
};

// Admin-only: requires x-admin-key header
exports.listContacts = async (req, res, next) => {
  try {
    if (!process.env.ADMIN_KEY || req.get('x-admin-key') !== process.env.ADMIN_KEY)
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    res.json({ success: true, data: await Contact.find().sort({ createdAt: -1 }).limit(200) });
  } catch (e) { next(e); }
};