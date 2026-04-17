import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seedAdminUser = async () => {
  try {
    console.log("Starting Admin seeding...");

    const adminRole = await prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: { name: 'ADMIN' },
    });
    console.log(`Role ensured: ${adminRole.name}`);

    const existingAdmin = await prisma.user.findFirst({
      where: {
        roles: { some: { id: adminRole.id } },
      },
    });

    if (existingAdmin) {
      console.log('Admin user already exists. Skipping creation.');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin@12345', 10);

    await prisma.user.create({
      data: {
        email: 'admin@solarops.com',
        userName: 'admin',
        firstName: 'System',
        lastName: 'Admin',
        password: hashedPassword,
        roles: { connect: [{ id: adminRole.id }] },
      },
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@solarops.com');
    console.log('Password: admin@12345');

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
};

if (require.main === module) {
  seedAdminUser()
    .then(() => console.log('Seeding complete!'))
    .catch((err) => console.error('Seeding failed:', err));
}