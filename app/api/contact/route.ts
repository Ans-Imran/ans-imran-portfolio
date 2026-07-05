import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  if (message.trim().length < 10) {
    return NextResponse.json({ error: "Message too short" }, { status: 400 });
  }

  // Insert into Supabase lca_leads table (fire and forget — don't fail if table missing)
  try {
    const client = getServiceClient();
    await client.from("lca_leads").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      tool_slug: "portfolio-contact",
      status: "new",
    });
  } catch {
    // Continue even if DB insert fails
  }

  // Also insert into comments table so message appears in LCA admin comments tab
  try {
    const client = getServiceClient();
    await client.from("comments").insert({
      tool_slug: "portfolio-contact",
      full_name: name.trim(),
      email: email.trim(),
      comment: message.trim(),
      status: "pending",
      created_at: new Date().toISOString(),
    });
  } catch {
    // Continue even if DB insert fails
  }

  // Send email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";
    try {
      await resend.emails.send({
        from,
        to: "ansimran300@gmail.com",
        subject: `Portfolio contact — ${name}`,
        html: `
          <h2>New portfolio contact message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left:3px solid #15803d;padding-left:12px;margin:12px 0;color:#374151">${message.replace(/\n/g, "<br>")}</blockquote>
          <p style="font-size:12px;color:#9ca3af">Sent from ans-imran.vercel.app</p>
        `,
      });
    } catch {
      // Don't fail if email fails
    }
  }

  return NextResponse.json({ ok: true });
}
