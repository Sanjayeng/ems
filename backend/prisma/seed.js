const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      id: 'admin-1',
      email: 'admin@owms.com',
      name: 'Admin User',
      role: 'admin',
    },
  });
  console.log('✓ Created admin user:', admin.email);

  // Create department
  const dept = await prisma.department.create({
    data: {
      id: 'dept-engineering',
      name: 'Engineering',
      userId: admin.id,
    },
  });
  console.log('✓ Created department:', dept.name);

  // Create intern users
  const interns = await Promise.all([
    prisma.user.create({
      data: {
        id: 'intern-1',
        email: 'sarah.jones@owms.com',
        name: 'Sarah Jones',
        role: 'intern',
      },
    }),
    prisma.user.create({
      data: {
        id: 'intern-2',
        email: 'david.lee@owms.com',
        name: 'David Lee',
        role: 'intern',
      },
    }),
    prisma.user.create({
      data: {
        id: 'intern-3',
        email: 'emily.chen@owms.com',
        name: 'Emily Chen',
        role: 'intern',
      },
    }),
    prisma.user.create({
      data: {
        id: 'intern-4',
        email: 'michael.brown@owms.com',
        name: 'Michael Brown',
        role: 'intern',
      },
    }),
    prisma.user.create({
      data: {
        id: 'intern-5',
        email: 'jessica.wilson@owms.com',
        name: 'Jessica Wilson',
        role: 'intern',
      },
    }),
  ]);

  console.log('✓ Created', interns.length, 'intern users');

  // Create sample tasks
  const now = new Date();
  const sampleTasks = [
    {
      title: 'Research Q4 Market Trends',
      description: 'Analyze and document Q4 market trends for the engineering department',
      departmentId: dept.id,
      assignedToId: interns[0].id,
      assignedById: admin.id,
      dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      priority: 'high',
      status: 'pending',
    },
    {
      title: 'Develop API Integration Draft',
      description: 'Create a draft for the new API integration module',
      departmentId: dept.id,
      assignedToId: interns[1].id,
      assignedById: admin.id,
      dueDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      priority: 'medium',
      status: 'pending',
    },
  ];

  await Promise.all(
    sampleTasks.map(task =>
      prisma.task.create({ data: task })
    )
  );

  console.log('✓ Created', sampleTasks.length, 'sample tasks');

  console.log('\n✅ Database seeding completed!\n');
  console.log('Test User Credentials:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin:');
  console.log('  Email:', admin.email);
  console.log('  ID:', admin.id);
  console.log('\nInterns:');
  interns.forEach((intern, i) => {
    console.log(`  ${i + 1}. ${intern.name} (${intern.email})`);
  });
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
