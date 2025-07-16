import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const steps = req.body;

  // Simulação: imprime cada passo com delay
  steps.forEach((step: any, idx: number) => {
    setTimeout(() => {
      console.log(`Simulando passo ${idx + 1}:`, step);
    }, idx * 1000); // 1 segundo entre cada passo
  });

  return res.status(200).json({ status: 'Comando recebido', steps });
}