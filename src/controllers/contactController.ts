import { Request, Response } from "express";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler"

export const contactUs = asyncHandler ( async (req: Request, res: Response) => {

    const {userType, firstName, lastName, email, phone, company, serviceOfInterest, subject, message} = req.body;

    if(!firstName || !email) {
        res.status(400);
        throw new Error(' firstName and email is required!')
    }
    
    const file = req.file;

    if(file && file.size > 5 * 1024 * 1024) {
        res.status(400);
        throw new Error('File size exceeds 5MB limit')
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `Message from ${firstName} with subject : ${subject}`,
        text: `
            User Type: ${userType}
            Name: ${firstName} ${lastName}
            Email: ${email}
            Phone: ${phone}
            Company: ${company}
            Service of Interest: ${serviceOfInterest}
            Message: ${message}
            `,
        attachments: file ? [{ filename: file.originalname, content: file.buffer}] : [],
    });
    
    await transporter.sendMail({
        from: `"Concept Management" <${process.env.ADMIN_EMAIL}>`,
        to: email,
        subject: `"Thank you for contacting us!`,
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #007BFF;">Hello ${firstName},</h2>
            <p>Thank you for reaching out to us. We've received your message and will get back to you shortly.</p>
            <h3>Your Message:</h3>
            <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                ${message}
            </blockquote>
            <p>Best regards,<br><strong>Concept Management</strong></p>
        </div>
    `,
    
    })

    res.json({message: 'Message sent successfully'})
});