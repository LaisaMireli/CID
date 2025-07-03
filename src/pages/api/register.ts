import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.resolve(process.cwd(), 'data', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    try {
      
      const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
      const users = JSON.parse(fileContent);

      
      const userExists = users.find((user: any) => user.email === email);
      if (userExists) {
        return res.status(409).json({ message: 'Email já cadastrado.' });
      }

      
      const newUser = {
        id: (users.length + 1).toString(), 
        nome,
        email,
        senha 
      };

      users.push(newUser);

      
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

      return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser });

    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}