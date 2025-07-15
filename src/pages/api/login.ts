import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';      

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  try {
    const { email, password } = req.body;

    // Validar se email e senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // 1. Encontrar o usuário no banco de dados pelo email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // 2. Se o usuário não for encontrado, as credenciais são inválidas
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // 3. Comparar a senha enviada com a senha criptografada no banco
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // 4. Se a comparação de senhas falhar, as credenciais são inválidas
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // 5. Se tudo estiver correto, o login é bem-sucedido
    // Retornamos os dados do usuário, mas NUNCA a senha.
    return res.status(200).json({
      message: 'Login bem-sucedido',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Erro ao fazer login: ', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}