// @vitest-environment node
import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { contactInfo, contactPage } from '@/content'
import { POST } from './route'

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue(true),
    })),
  },
}))

describe('contact API route', () => {
  beforeEach(() => {
    process.env.SMTP_HOST = 'smtp.example.com'
    process.env.SMTP_PORT = '587'
    process.env.SMTP_SECURE = 'false'
    process.env.SMTP_USER = 'user@example.com'
    process.env.SMTP_PASSWORD = 'password'
    process.env.SMTP_FROM_EMAIL = 'no-reply@example.com'
    process.env.CONTACT_EMAIL = 'contact@example.com'

    vi.clearAllMocks()
  })

  it('returns 400 for missing required fields', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        email: 'test@example.com',
        subject: 'prescription',
        message: '',
      }),
      headers: { 'content-type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const payload = await response.json()
    expect(payload.error).toMatch(/required fields/i)
  })

  it('returns 400 for invalid email', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        subject: 'prescription',
        message: 'Hello',
      }),
      headers: { 'content-type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('sends the email for valid payloads', async () => {
    const subject = contactPage.formSubjects[0]
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '555-0101',
        dateOfBirth: '1990-01-01',
        subject: subject.value,
        message: 'Hello from the test.',
      }),
      headers: { 'content-type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    const createTransportMock = vi.mocked(nodemailer.createTransport)
    const transporter = createTransportMock.mock.results[0].value

    expect(transporter.sendMail).toHaveBeenCalledTimes(1)
    const mailArgs = transporter.sendMail.mock.calls[0][0]
    expect(mailArgs.to).toBe(process.env.CONTACT_EMAIL || contactInfo.email)
    expect(mailArgs.subject).toContain(subject.label)
  })
})
