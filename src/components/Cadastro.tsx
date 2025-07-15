// src/components/Cadastro.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/router"; // Importe useRouter para o PAGES Router
import Link from "next/link";
import Image from "next/image";

import folha from "@/assets/folha.jpg";
import logo from "@/assets/logo.jpg";

export function Cadastro() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    termos: false,
  });

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if(response.ok){
        alert("Usuário cadastrado com sucesso");
        router.push('/home')
      } else {
        alert(`Erro: ${data.message || 'Algo deu errado'}`)
      }
    } catch (error) {
      console.error('Erro ao enviar formulário: ', error);
      alert('Erro ao se conectar com o servidor. Tente novamente')
      
    } finally {
      setLoading(false);
    }
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

          <h1 className="text-4xl font-bold mb-1">Vamos começar!</h1>
          <p className="text-lg font-medium">Crie sua conta.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md lg:ml-40 text-[#193829]"
        >
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]"
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
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]"
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
              className="w-4 h-4 accent-[#3A5B22]"
            />
            <label htmlFor="termos" className="text-xs font-semibold">
              Eu aceito os{" "}
              <a href="#" className="underline text-[#3A5B22]">
                termos de uso
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#3A5B22] hover:bg-[#497248] font-semibold py-2 rounded-xl transition"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <p className="text-center text-sm mt-4 text-[#193829]">
            Já tem uma conta?{" "}
            <Link
              href="/" // Link para a rota raiz (Login)
              className="underline font-semibold"
              style={{ color: "#3A5B22" }}
            >
              Faça Login
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