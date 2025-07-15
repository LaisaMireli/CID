## 🚀 Projeto CID - Dashboard de Monitoramento

Este é o repositório para a aplicação web (dashboard) do Projeto CID, desenvolvido para a disciplina de Tecnologia Web 2. A aplicação exibe dados enviados por um robô de sistemas embarcados e permite o controle de usuários e do próprio robô.

### ✅ Pré-requisitos

- Node.js (versão 18.x ou superior)
- npm (geralmente já vem instalado com o Node.js)
- Git

### ⚙️ Instalação e Configuração Local
```bash
git clone https://github.com/LaisaMireli/CID.git
cd CID
npm install
```
Agora na raiz do projeto(CID), crie um arquivo .env e cole a seguinte linha:
```
DATABASE_URL="file:./dev.db"
```
Agora, precisamos dizer ao Prisma para criar o banco de dados SQLite local com todas as tabelas definidas no schema.

Execute o seguinte comando no terminal:
```
npx prisma migrate dev
```

Agora basta iniciar o servidor com o seguinte código: 
```
npm run dev
```

Após executar o comando, a aplicação estará disponível em http://localhost:3000.

### 🛠️ Tecnologias Utilizadas
- Framework: [Next.js](https://nextjs.org/)
- Linguagem: [TypeScript](https://www.typescriptlang.org/)
- Estilização: [Tailwind CSS](https://tailwindcss.com/)
- ORM: [Prisma](https://www.prisma.io/)
- Banco de Dados (Dev): [SQLite](https://www.sqlite.org/index.html)

### 💻 Desenvolvedores
- [Laisa Mireli](https://github.com/LaisaMireli)
- [Lairton Pessoa](https://github.com/LairtonPessoa)
- [Yan Marcelo](https://github.com/YanMarcelo)
