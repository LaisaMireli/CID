// src/components/Menu.tsx
"use client";

import React from 'react';
import { Home, BarChart2, GalleryVertical, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Menu() {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Usuário deslogado!");
    router.push("/");
  };

  return (
    <aside
      className="w-20 bg-[#133023] flex flex-col items-center justify-between py-6
                 fixed left-0 top-1/2 -translate-y-1/2 z-50
                 rounded-r-3xl shadow-xl border border-white border-opacity-20"
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Logo do projeto */}
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#133023] font-bold text-xl">
          CID
        </div>

        {/* Ícones de Navegação para as 4 Páginas Principais */}
        <NavIcon icon={<Home size={20} />} href="/home" label="Home" />
        <NavIcon icon={<BarChart2 size={20} />} href="/dashboard" label="Dashboard" />
        <NavIcon icon={<GalleryVertical size={20} />} href="/galeria" label="Galeria" />
        <NavIcon icon={<Settings size={20} />} href="/controle" label="Controle" />
      </div>

      {/* Botão de Sair da Conta */}
      <NavIcon icon={<LogOut size={20} />} href="#" onClick={handleLogout} label="Sair" />
    </aside>
  );
}

// Componente NavIcon aprimorado
function NavIcon({ icon, href, onClick, label }: { icon: React.ReactNode; href: string; onClick?: () => void; label: string }) {
  const commonClasses = "w-10 h-10 flex items-center justify-center rounded hover:bg-[#1d3d2e] transition group";

  // CLONAGEM DO ÍCONE COM TRATAMENTO DE TIPOS MELHORADO
  const clonedIcon = React.cloneElement(
    // Asseguramos que 'icon' é um ReactElement e que suas props são do tipo Record<string, any>
    icon as React.ReactElement<Record<string, any>>,
    {
      className: `transition-colors duration-200 group-hover:text-[#568A56] ${
        // Acessamos 'props.className' de forma segura, verificando se existe
        (icon as React.ReactElement<Record<string, any>>).props?.className || ''
      }`
    }
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${commonClasses} text-white`} title={label}>
        {clonedIcon}
      </button>
    );
  }

  return (
    <Link href={href} passHref className={`${commonClasses} text-white`}>
      {clonedIcon}
    </Link>
  );
}