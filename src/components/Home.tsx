import { useState } from "react";

export function HomeComponent() {
  return (
    <div className="flex min-h-screen bg-[#f9f9f9] text-gray-800">
      {/* Sidebar */}
      <aside className="w-20 bg-gradient-to-b from-[#1c3c2f] to-[#2a5933] flex flex-col items-center py-6 space-y-6">
        {/* Ícones do menu */}
        <div className="h-10 w-10 bg-white rounded-full" /> {/* Logo */}
        <div className="w-8 h-8 bg-white rounded" />
        <div className="w-8 h-8 bg-white rounded" />
        <div className="w-8 h-8 bg-white rounded" />
        <div className="w-8 h-8 bg-white rounded" />
        <div className="w-8 h-8 bg-white rounded" />
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-green-900 rounded-full" /> {/* Ícone CID */}
            <h1 className="text-3xl font-semibold text-[#1c3c2f]">CID</h1>
          </div>
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-[#2a5933] rounded-sm" />
            <div className="w-6 h-6 bg-[#3a7645] rounded-sm" />
            <div className="w-6 h-6 bg-[#4a9c58] rounded-sm" />
          </div>
        </header>

        {/* Cards superiores */}
        <section className="grid grid-cols-5 gap-4 mb-6">
          <div className="h-24 rounded-xl bg-white shadow" />
          <div className="h-24 rounded-xl bg-gradient-to-t from-[#2a5933] to-white shadow" />
          <div className="h-24 rounded-xl bg-white shadow" />
          <div className="h-24 rounded-xl bg-white shadow" />
          <div className="h-24 rounded-xl bg-white shadow" />
        </section>

        {/* Cards do meio */}
        <section className="grid grid-cols-3 gap-4 mb-6">
          <div className="h-64 rounded-xl bg-gradient-to-b from-[#2a5933] to-[#4a9c58] shadow" />
          <div className="h-64 rounded-xl bg-white shadow" />
          <div className="h-64 rounded-xl bg-white shadow flex items-center justify-center">
            {/* Gráficos */}
            <div className="flex space-x-6">
              <div className="w-24 h-24 rounded-full border-[10px] border-green-600 border-t-transparent" />
              <div className="w-32 h-24 bg-white">
                {/* Barras (fake) */}
                <div className="flex items-end space-x-1 h-full">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-green-700"
                      style={{ height: `${(Math.random() * 100).toFixed(0)}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Botões */}
        <section className="flex justify-end space-x-4">
          <button className="px-6 py-2 rounded-md bg-gray-200 text-[#2a5933]">
            Adicionar
          </button>
          <button className="px-6 py-2 rounded-md bg-[#2a5933] text-white">
            Atualizar
          </button>
        </section>
      </main>
    </div>
  );
}