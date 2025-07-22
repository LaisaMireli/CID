// src/pages/api/command.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // O robô usará o método GET para pedir comandos
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // 1. Busca no banco o comando pendente mais recente
    const commandToExecute = await prisma.robotCommand.findFirst({
      where: { isExecuted: false }, // Filtra apenas os não executados
      orderBy: { createdAt: 'desc' }, // Garante que pegamos o mais novo
    });

    // 2. Se não houver comando, retorna uma resposta vazia. O robô saberá que não há nada a fazer.
    if (!commandToExecute) {
      return res.status(204).end(); // 204 No Content
    }

    // 3. Se encontrou um comando, o marca como "executado"
    await prisma.robotCommand.update({
      where: { id: commandToExecute.id },
      data: { isExecuted: true },
    });

    // 4. Envia o JSON do caminho (o array de passos) para o robô
    return res.status(200).json(commandToExecute.path);

  } catch (error) {
    console.error("Erro ao buscar comando para o robô:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}