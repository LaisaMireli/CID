// src/components/Login.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    alert("Formulário de Login enviado! Redirecionando...");
    router.push("/");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      {/* Lado esquerdo branco com formulário */}
      <div className="flex flex-col justify-center w-full  md:w-1/2 bg-white px-8 sm:px-16 py-8 md:py-0">
        <div className="mb-8 max-w-md mx-auto md:mx-0 text-center"> {/* Adicionado text-center aqui */}
          {/* Logo simples */}
          <div className="w-12 h-12 border-2 border-green-700 rounded-full flex items-center justify-center mb-4 mx-auto"> {/* Adicionado mx-auto para centralizar o logo */}
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
          <h1 className="text-4xl font-bold mb-1">Bem-vindo(a) de volta!</h1>
          <p className="text-lg font-medium">Faça login para continuar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto md:mx-0">
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

          <div className="flex justify-between items-center text-sm"> {/* Não adicionado text-center aqui para manter justificado */}
            <div className="flex items-center">
              <input type="checkbox" id="lembrar" className="w-4 h-4 mr-2" />
              <label htmlFor="lembrar" className="text-xs font-semibold">Lembrar-me</label>
            </div>
            <Link href="#" className="underline text-green-700 text-xs font-semibold">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded transition"
          >
            Entrar
          </button>

          <p className="text-center text-sm mt-4"> {/* Adicionado text-center aqui */}
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="underline text-green-700 font-semibold">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>

      {/* Lado direito imagem */}
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