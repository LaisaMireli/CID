import React, { useState } from "react";
import { useRouter } from "next/navigation";


export function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    termos: false,
  });

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.termos) {
      alert("Você precisa aceitar os termos de uso.");
      return;
    }

    alert("Formulário enviado com sucesso!");
    router.push("/");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      {/* Lado esquerdo branco com formulário */}
      {/* Em telas pequenas (mobile), ocupa 100% da largura (w-full). */}
      {/* Em telas médias (md) e maiores (desktop), ocupa 50% da largura (md:w-1/2). */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white px-8 sm:px-16 py-8 md:py-0">
        <div className="mb-8 max-w-md mx-auto md:mx-0">
          {/* Logo simples */}
          <div className="w-12 h-12 border-2 border-green-700 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m-4-4l4 4 4-4"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-1">CID</h1>
          <p className="text-lg font-medium">Vamos começar!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto md:mx-0">
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-1"
              htmlFor="senha"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="termos"
              name="termos"
              checked={form.termos}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="termos" className="text-xs font-semibold">
              Eu aceito os{" "}
              <a href="#" className="underline text-green-700">
                termos de uso
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded transition"
          >
            Cadastrar
          </button>
        </form>
      </div>

      {/* Lado direito imagem */}
      {/* Oculto em telas pequenas (hidden). */}
      {/* Em telas médias (md) e maiores (desktop), é exibido como flex e ocupa 50% da largura (md:flex md:w-1/2). */}
      <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-8">
        <img
          src="/images/monstera.jpg"
          alt="Folhas verdes"
          className="rounded-xl object-cover h-full w-full max-w-md"
        />
      </div>
    </div>
  );
}