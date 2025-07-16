import type { NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET'){
        return res.status(405).end('Method not allowed');
    }

    try {
        // Busca o último registro de medição
        const latestMeasurement = await prisma.measurement.findFirst({
            orderBy: { createdAt: 'desc' },
        });

        // Busca o último registro de status do sistema
        const latestStatus = await prisma.systemStatus.findFirst({
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json({ latestMeasurement, latestStatus });
    } catch (error) {
        return res.status(500).json({message: 'Erro ao buscar dados'})
    }
}