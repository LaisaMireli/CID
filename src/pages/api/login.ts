import { NextApiRequest, NextApiResponse } from "next";
import  fs  from "fs";
import path from "path";
import { use } from "framer-motion/m";

const usersFilePath = path.resolve(process.cwd(), 'data', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST'){
        const { email, senha } = req.body;

        if(!email || !senha){
            return res.status(400).json({message: 'Email e senha obrigatórios'});
        }

        try {
            if(!fs.existsSync(usersFilePath)){
                fs.writeFileSync(usersFilePath, '[]', 'utf-8');
            }

            const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
            const users = fileContent ? JSON.parse(fileContent) : [];
            const user = users.find((u: any) => u.email === email);

            if(!user || user.senha !== senha){
                return res.status(401).json({message: 'Email ou senha inválidos'});
            }

            return res.status(200).json({
                message: 'Login bem-sucedido',
                user: { 
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('Erro ao fazer login: ', error);
            return res.status(500).json({message: 'Erro interno do servidor'})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} no allowed`)
    }
}