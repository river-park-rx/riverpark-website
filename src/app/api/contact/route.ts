import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { company, contactInfo, getSubjectLabel } from '@/content'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const subjectLabel = getSubjectLabel(subject)

    // Email content for the pharmacy
    const mailToPharmacy = {
      from: `"${company.name} Website" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_EMAIL || contactInfo.email,
      replyTo: email,
      subject: `New Contact Form Submission: ${subjectLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C41E3A; border-bottom: 2px solid #C41E3A; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subject:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${subjectLabel}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          </div>

          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            This email was sent from the ${company.name} website contact form.
          </p>
        </div>
      `,
    }

    // Confirmation email for the customer
    const mailToCustomer = {
      from: `"${company.name}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: `Thank you for contacting ${company.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C41E3A;">Thank You for Contacting Us!</h2>

          <p>Dear ${name},</p>

          <p>Thank you for reaching out to ${company.name}. We have received your message and will get back to you as soon as possible.</p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${subjectLabel}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>If you need immediate assistance, please don't hesitate to call us at <strong>${contactInfo.phone}</strong>.</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="color: #666; font-size: 14px;">
            <strong>${company.name}</strong><br>
            ${contactInfo.address.street}, ${contactInfo.address.suite}<br>
            ${contactInfo.address.city}, ${contactInfo.address.state} ${contactInfo.address.zip}<br>
            Phone: ${contactInfo.phone}<br>
            Email: ${contactInfo.email}
          </p>
        </div>
      `,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailToPharmacy),
      transporter.sendMail(mailToCustomer),
    ])

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
