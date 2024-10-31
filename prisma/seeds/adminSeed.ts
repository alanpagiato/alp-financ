import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function adminSeed() {
  //const username = process.env.MASTER_USERNAME || 'master';
  //const password = process.env.MASTER_PASSWORD || 'Ichwill9125_';
  const username = 'master';
  const password = 'Ichwill9125_';

  // Verificar se o grupo "admin" já existe
  let adminGroup = await prisma.userGroup.findUnique({
    where: { name: 'admin' },
  });

  // Se o grupo "admin" não existir, cria o grupo com isAdmin setado como true
  if (!adminGroup) {
    adminGroup = await prisma.userGroup.create({
      data: {
        name: 'admin',
        isAdmin: true,
      },
    });
    console.log('Grupo "admin" criado com sucesso!');
  } else {
    console.log('Grupo "admin" já existe.');
  }

  // Verificar se o usuário master já existe
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        userGroupId: adminGroup.id,
      },
    });

    console.log('Usuário master criado com sucesso!');
  } else {
    console.log('Usuário master já existe. Nenhuma ação foi necessária.');
  }
}