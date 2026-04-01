import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialise Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { user_name, user_email, message } = await request.json();

    // Basic server-side validation
    if (!user_name || !user_email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Attempt to send the email via Resend
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Should be a verified domain in production
      to: 'kishanan@newborncinema.com', // Recipient email
      subject: `New Inquiry from ${user_name}`,
      replyTo: user_email,
      html: `
        <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #2D2424; border-bottom: 2px solid #2D2424; padding-bottom: 10px;">New Inquiry Received</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">You have received a new message through your portfolio contact form.</p>
          
          <div style="background-color: #F5F5F1; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${user_name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${user_email}</p>
          </div>
          
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="line-height: 1.6; color: #444; background: #fff; padding: 15px; border: 1px solid #ddd;">${message}</p>
          </div>
          
          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">Sent from your portfolio website inquiry form.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Resend API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
