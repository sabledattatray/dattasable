import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@dattasable.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Creating admin user...');

  try {
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
      },
      create: {
        email,
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created/updated successfully:');
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('\nYou can now log in at /admin/login');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
