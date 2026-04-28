import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { rateLimit, logAudit } from '@/lib/security';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().nullish().or(z.literal("")),
  message: z.string().min(1, "Message cannot be empty"),
});

// JSON file fallback path
const MESSAGES_FILE = path.join(process.cwd(), 'messages.json');

const getJsonMessages = () => {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) return [];
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const saveJsonMessage = (msg: any) => {
  try {
    const messages = getJsonMessages();
    messages.unshift({
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    });
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (e) {
    console.error("Failed to save to JSON file:", e);
  }
};

export async function GET() {
  try {
    // Try Prisma first
    const messages = await (prisma as any).contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.warn("DB Fetch Failed, falling back to JSON store.");
    // Fallback to JSON file
    return NextResponse.json(getJsonMessages());
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate limit: 3 messages per minute
    if (!rateLimit(ip, 3)) {
      await logAudit({ action: 'CONTACT_FORM_ABUSE', status: 'FAILURE', details: `Rate limit exceeded for IP: ${ip}`, req });
      return NextResponse.json({ message: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // Try Prisma first
    try {
      const message = await (prisma as any).contactMessage.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject || "No Subject",
          message: validatedData.message,
        },
      });

      await logAudit({ action: 'CONTACT_FORM_SUBMIT', status: 'SUCCESS', details: `Message from ${validatedData.email}`, req });
      return NextResponse.json({ message: "Success", id: message.id }, { status: 201 });
    } catch (dbError) {
      console.warn("DB Save Failed, falling back to JSON store.");
      
      // Fallback: Save to JSON file for immediate visibility in development
      const newMsg = {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || "No Subject",
        message: validatedData.message,
      };
      saveJsonMessage(newMsg);

      return NextResponse.json(
        { message: "Success (Stored in JSON Fallback)", status: "fallback" },
        { status: 201 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
