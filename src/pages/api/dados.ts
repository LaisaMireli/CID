// src/pages/api/dados.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Garantir que a requisição seja do tipo POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const data = req.body;
    console.log("🤖 Dados recebidos via POST:", data);

    // 2. Identificar o tipo de JSON e salvar no banco (mesma lógica do socket)
    if (data.data && data.errors) { // É um JSON de Medição
      await prisma.measurement.create({
        data: {
          temperature: data.data.temperature,
          humidity: data.data.humidity,
          soilMoisture: data.data.soilMoisture,
          luminosity: data.data.luminosity,
          errors: data.errors.join(','),
        },
      });
    } else if (data.batteryLevel !== undefined) { // É um JSON de Status do Sistema
      await prisma.systemStatus.create({
        data: {
          batteryLevel: data.batteryLevel,
          connectionLevel: data.connectionLevel,
          currentActivity: data.currentActivity,
          currentSector: data.currentSector,
        },
      });
    } else {
      // Se o JSON não for reconhecido
      return res.status(400).json({ message: "Formato de JSON inválido." });
    }

    // 3. Responder ao robô que os dados foram recebidos com sucesso
    return res.status(201).json({ message: "Dados recebidos e salvos com sucesso." });

  } catch (error) {
    console.error("Falha ao salvar dados do robô via POST:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
}