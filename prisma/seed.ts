import { PrismaClient } from '@prisma/client';
import { adminSeed } from './seeds/adminSeed';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seeds...');
  
  await adminSeed();

  console.log('Seeds executados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
