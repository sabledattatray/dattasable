import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const name = `${firstName} ${lastName}`;

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "USER",
      }
    });

    // Generate verification token
    const verificationToken = await generateVerificationToken(email);

    // Send verification email
    try {
      await sendVerificationEmail(verificationToken.identifier, verificationToken.token);
    } catch (mailError) {
      console.error("Failed to send verification email:", mailError);
      // We still return success for user creation, but notify that email failed
      return NextResponse.json({ 
        success: true, 
        message: "User created but verification email failed to send. Please contact support.",
        userId: user.id 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Verification email sent! Please check your inbox.",
      userId: user.id 
    });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
