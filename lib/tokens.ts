import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export const generateVerificationToken = async (email: string) => {
  const token = randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await prisma.verificationToken.findFirst({
    where: { identifier: email }
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { 
        identifier_token: {
          identifier: existingToken.identifier,
          token: existingToken.token,
        }
      }
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    }
  });

  return verificationToken;
};
