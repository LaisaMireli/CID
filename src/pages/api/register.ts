import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  try {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if(existingUser){
      return res.status(409).json({message: 'Este email já está em uso'})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    });

    return res.status(201).json({ id: user.id, name: user.name, email: user.email });

  } catch (error) {
    console.error('Erro no registro: ', error);
    return res.status(500).json({message: 'Erro interno do servidor'})
  }
  
}