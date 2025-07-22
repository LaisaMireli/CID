import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const data = req.body;
    console.log("🤖 Dados recebidos via POST:", data);

    //possivel melhoria aqui para melhor identificação de oq esta sendo enviado, measurement ou systemStatus
    if (data.data && data.errors) {
      await prisma.measurement.create({
        data: {
          temperature: data.data.temperature,
          humidity: data.data.humidity,
          soilMoisture: data.data.soilMoisture,
          luminosity: data.data.luminosity,
          errors: data.errors.join(','),
        },
      });
    } else if (data.batteryLevel !== undefined) {
      await prisma.systemStatus.create({
        data: {
          batteryLevel: data.batteryLevel,
          connectionLevel: data.connectionLevel,
          currentActivity: String(data.currentActivity), 
          currentSector: data.currentSector,
        },
      });
    } else {
      return res.status(400).json({ message: "Formato de JSON inválido." });
    }

    return res.status(201).json({ message: "Dados recebidos e salvos com sucesso." });

  } catch (error) {
    console.error("Falha ao salvar dados do robô via POST:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
}