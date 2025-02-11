const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.plant.createMany({
    data: [
      { name: 'Aloe Vera', price: 10, category: 'Indoor', imageUrl: '/images/aloe.jpg' },
      { name: 'Snake Plant', price: 15, category: 'Indoor', imageUrl: '/images/snake.jpg' },
      { name: 'Money Plant', price: 8, category: 'Indoor', imageUrl: '/images/money.jpg' },
    ],
  });
  console.log('Database seeded');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
