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
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #007BFF;">📩 New Contact Form Submission</h2>
                <hr style="border: 0; border-top: 2px solid #eee; margin: 20px 0;">
                <table cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td><strong>👤 User Type:</strong></td>
                    <td>${userType}</td>
                </tr>
                <tr>
                    <td><strong>👥 Name:</strong></td>
                    <td>${firstName} ${lastName}</td>
                </tr>
                <tr>
                    <td><strong>📧 Email:</strong></td>
                    <td>${email}</td>
                </tr>
                <tr>
                    <td><strong>📞 Phone:</strong></td>
                    <td>${phone}</td>
                </tr>
                <tr>
                    <td><strong>🏢 Company:</strong></td>
                    <td>${company}</td>
                </tr>
                <tr>
                    <td><strong>🛠️ Service of Interest:</strong></td>
                    <td>${serviceOfInterest}</td>
                </tr>
                </table>
                <div style="margin-top: 20px;">
                <h3 style="margin-bottom: 10px;">📝 Message:</h3>
                <blockquote style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ccc;">
                    ${message}
                </blockquote>
                </div>
                <p style="color: #888; margin-top: 30px;">📅 Submitted on: <strong>${new Date().toLocaleString()}</strong></p>
            </div>
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