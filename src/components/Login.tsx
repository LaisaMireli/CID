// src/components/Login.tsx
"use client";

import Image from "next/image";
import folha from "@/assets/folha.jpg";
import logo from "@/assets/logo.jpg";
import React, { useState } from "react";
import { useRouter } from "next/router"; // Importe useRouter para o PAGES Router
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
    // Redireciona para a página de Home (a tela simples)
    router.push("/home");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo branco com formulário */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white px-8 sm:px-16 py-8 md:py-0 rounded-l-3xl">
        <div className="mb-8 max-w-md lg:ml-40 text-center text-[#193829]">
          <div className="w-16 mx-auto mb-4">
            <Image
              src={logo}
              alt="Logo"
              className="w-full h-auto object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-1">Bem-vindo(a) de volta!</h1>
          <p className="text-lg font-medium">Faça login para continuar.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md lg:ml-40 text-[#193829]"
        >
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
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <input type="checkbox" id="lembrar" className="w-4 h-4 mr-2 accent-[#3A5B22]" />
              <label htmlFor="lembrar" className="text-xs font-semibold">
                Lembrar-me
              </label>
            </div>
            <Link
              href="#"
              className="underline text-xs font-semibold"
              style={{ color: "#3A5B22" }}
            >
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#3A5B22] hover:bg-[#497248] font-semibold py-2 rounded-xl transition"
          >
            Entrar
          </button>

          <p className="text-center text-sm mt-4 text-[#193829]">
            Não tem uma conta?{" "}
            <Link
              href="/cadastro"
              className="underline font-semibold"
              style={{ color: "#3A5B22" }}
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>

      {/* Lado direito com imagem ocupando toda a tela */}
      <div className="hidden md:block w-full md:w-1/2 h-screen relative">
        <Image
          src={folha}
          alt="Folhas verdes"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}