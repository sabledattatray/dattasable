'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { logAudit } from "@/lib/security";

export async function updateAdminPassword(formData: any) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'ADMIN') {
    return { error: 'Unauthorized. Admin access required.' };
  }

  const { currentPassword, newPassword, confirmPassword } = formData;

  if (newPassword !== confirmPassword) {
    return { error: 'New passwords do not match.' };
  }

  if (newPassword.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  const userId = (session.user as any).id;

  if (!userId) {
    return { error: 'Invalid session: User ID missing. Please log out and log in again.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { error: 'User record not found in database. Please log out and log in again.' };
    }
    
    // If user has a password, verify the current one
    if (user.password) {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return { error: 'Current password is incorrect.' };
      }
    } else {
      // User logged in via OAuth and is setting their first password
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: (session.user as any).id },
      data: { password: hashedNewPassword }
    });

    await logAudit({
      userId: user.id,
      action: 'UPDATE_PASSWORD',
      status: 'SUCCESS',
      details: 'Admin updated their password'
    });

    return { success: 'Password updated successfully!' };
  } catch (error: any) {
    console.error('Password update failed:', error);
    return { error: `Internal App Error: ${error.message || 'Unknown error'}` };
  }
}
