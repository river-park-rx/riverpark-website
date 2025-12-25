# Email Setup Guide for River Park Pharmacy Contact Form

This guide walks you through setting up email functionality for the contact form using Nodemailer.

## Table of Contents

1. [Overview](#overview)
2. [Environment Variables](#environment-variables)
3. [Gmail Setup](#gmail-setup)
4. [Outlook/Office 365 Setup](#outlookoffice-365-setup)
5. [Other Email Providers](#other-email-providers)
6. [Testing Locally](#testing-locally)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The contact form sends two emails when a user submits a message:

1. **To the pharmacy** - Contains all form details (name, email, phone, subject, message)
2. **To the customer** - A confirmation email acknowledging their submission

---

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Email Addresses
SMTP_FROM_EMAIL=noreply@riverparkpharmacy.com
CONTACT_EMAIL=info@riverparkpharmacy.com
```

### Variable Descriptions

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | The SMTP server hostname |
| `SMTP_PORT` | The SMTP server port (typically 587 for TLS, 465 for SSL) |
| `SMTP_SECURE` | Set to `true` for port 465, `false` for port 587 |
| `SMTP_USER` | Your email account username |
| `SMTP_PASSWORD` | Your email account password or app password |
| `SMTP_FROM_EMAIL` | The "from" address shown in emails |
| `CONTACT_EMAIL` | Where contact form submissions are sent |

---

## Gmail Setup

Gmail is a popular choice for sending emails. Follow these steps:

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **2-Step Verification**
3. Follow the prompts to enable 2FA if not already enabled

### Step 2: Generate an App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. You may need to sign in again
3. Select **App**: Choose "Mail"
4. Select **Device**: Choose "Other (Custom name)"
5. Enter a name like "River Park Pharmacy Website"
6. Click **Generate**
7. Copy the 16-character password (shown with spaces, but use without spaces)

### Step 3: Configure Environment Variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM_EMAIL=your-email@gmail.com
CONTACT_EMAIL=info@riverparkpharmacy.com
```

> **Note**: For Gmail, the `SMTP_FROM_EMAIL` should match your Gmail address, or Gmail will override it.

### Gmail Sending Limits

- **Free Gmail**: 500 emails per day
- **Google Workspace**: 2,000 emails per day

---

## Outlook/Office 365 Setup

### For Personal Outlook.com Accounts

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=your-email@outlook.com
CONTACT_EMAIL=info@riverparkpharmacy.com
```

### For Microsoft 365 Business Accounts

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=your-email@yourdomain.com
CONTACT_EMAIL=info@riverparkpharmacy.com
```

### Enabling SMTP in Microsoft 365 Admin

1. Go to [Microsoft 365 Admin Center](https://admin.microsoft.com)
2. Navigate to **Users** > **Active users**
3. Select the user account
4. Click **Mail** tab
5. Under **Email apps**, enable **Authenticated SMTP**

---

## Other Email Providers

### SendGrid

1. Create a [SendGrid account](https://sendgrid.com)
2. Go to **Settings** > **API Keys**
3. Create an API key with "Mail Send" permissions

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM_EMAIL=noreply@riverparkpharmacy.com
CONTACT_EMAIL=info@riverparkpharmacy.com
```

### Mailgun

1. Create a [Mailgun account](https://www.mailgun.com)
2. Verify your domain or use the sandbox domain for testing
3. Get your SMTP credentials from the domain settings

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your-mailgun-password
SMTP_FROM_EMAIL=noreply@riverparkpharmacy.com
CONTACT_EMAIL=info@riverparkpharmacy.com
```

### Amazon SES

1. Create an [AWS account](https://aws.amazon.com)
2. Go to Amazon SES console
3. Verify your domain and email addresses
4. Create SMTP credentials in **SMTP Settings**

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
SMTP_FROM_EMAIL=noreply@riverparkpharmacy.com
CONTACT_EMAIL=info@riverparkpharmacy.com
```

---

## Testing Locally

### Step 1: Create `.env.local`

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

### Step 2: Start the Development Server

```bash
npm run dev
```

### Step 3: Test the Contact Form

1. Navigate to `http://localhost:3000/contact`
2. Fill out the form with test data
3. Submit and check:
   - The success message appears
   - An email is received at `CONTACT_EMAIL`
   - A confirmation email is sent to the test email address

### Using Ethereal for Testing (No Real Emails)

For development without sending real emails, use [Ethereal](https://ethereal.email):

1. Go to https://ethereal.email
2. Click **Create Ethereal Account**
3. Copy the credentials

```env
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=generated-username@ethereal.email
SMTP_PASSWORD=generated-password
SMTP_FROM_EMAIL=noreply@riverparkpharmacy.com
CONTACT_EMAIL=test@ethereal.email
```

Emails can be viewed at https://ethereal.email/messages

---

## Production Deployment

### Vercel Deployment

1. Go to your project in the [Vercel Dashboard](https://vercel.com)
2. Navigate to **Settings** > **Environment Variables**
3. Add each variable:

| Name | Value | Environment |
|------|-------|-------------|
| `SMTP_HOST` | `smtp.gmail.com` | Production |
| `SMTP_PORT` | `587` | Production |
| `SMTP_SECURE` | `false` | Production |
| `SMTP_USER` | `your-email@gmail.com` | Production |
| `SMTP_PASSWORD` | `your-app-password` | Production |
| `SMTP_FROM_EMAIL` | `your-email@gmail.com` | Production |
| `CONTACT_EMAIL` | `info@riverparkpharmacy.com` | Production |

4. Redeploy your application for changes to take effect

### Netlify Deployment

1. Go to **Site settings** > **Environment variables**
2. Add the same variables as listed above

### Other Hosting Platforms

Refer to your hosting provider's documentation for setting environment variables.

---

## Troubleshooting

### Error: "Invalid login"

- **Gmail**: Ensure you're using an App Password, not your regular password
- **Outlook**: Check that SMTP is enabled for your account
- Verify `SMTP_USER` and `SMTP_PASSWORD` are correct

### Error: "Connection timeout"

- Check if your hosting provider blocks outgoing SMTP connections
- Try using port 465 with `SMTP_SECURE=true`
- Some providers require whitelisting SMTP ports

### Error: "Self-signed certificate"

Add this to your transporter configuration (not recommended for production):

```typescript
const transporter = nodemailer.createTransport({
  // ... other options
  tls: {
    rejectUnauthorized: false
  }
})
```

### Emails Going to Spam

1. **Use a verified domain**: Set up SPF, DKIM, and DMARC records
2. **Consistent from address**: Use the same "from" address as your SMTP user
3. **Use a reputable service**: SendGrid, Mailgun, or Amazon SES have better deliverability

### Rate Limiting

If you hit sending limits:

1. **Gmail**: Max 500/day (free) or 2,000/day (Workspace)
2. Consider upgrading to a transactional email service for high volume

### Checking Server Logs

In development, check the terminal for error messages. In production, check your hosting provider's logs:

- **Vercel**: Functions tab > Logs
- **Netlify**: Functions > Function log

---

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use environment variables** - Never hardcode credentials
3. **Rotate passwords regularly** - Update app passwords periodically
4. **Monitor usage** - Watch for unusual email activity
5. **Use rate limiting** - Consider adding rate limiting to prevent abuse

---

## Need Help?

If you encounter issues not covered here:

1. Check the [Nodemailer documentation](https://nodemailer.com)
2. Review your email provider's SMTP documentation
3. Check server logs for detailed error messages
