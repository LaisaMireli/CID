// src/pages/api/path.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const path = req.body;

    if (!Array.isArray(path) || path.length === 0) {
      return res.status(400).json({ error: 'O caminho (path) deve ser um array e não pode estar vazio.' });
    }

    // Para garantir que o robô não execute comandos antigos,
    // podemos marcar todos os comandos anteriores como já executados.
    await prisma.robotCommand.updateMany({
      where: { isExecuted: false },
      data: { isExecuted: true },
    });
    
    // Salva o novo comando no banco de dados como "não executado"
    const newCommand = await prisma.robotCommand.create({
      data: {
        path: path, // O Prisma lida com o array de objetos JSON nativamente
        isExecuted: false,
      },
    });

    // Retorna uma resposta de sucesso para o navegador
    return res.status(201).json({ status: 'Comando recebido e armazenado com sucesso!', command: newCommand });

  } catch (error) {
    console.error("Erro ao armazenar comando:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}