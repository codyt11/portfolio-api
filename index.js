import express from "express";
import nodemailer from "nodemailer";

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  // Configure transport options
  service: 'gmail', // for example, if you're using Gmail
  auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
  }
});

app.get('/', (req, res) => {
  res.send("server is working!");
});


app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'cwtownley@gmail.com', // your email to receive messages
    subject: `New Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email successfully sent');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
