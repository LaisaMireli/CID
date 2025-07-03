// src/components/Layout.tsx
import React from 'react';
import { Menu } from './Menu';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    // Adicionado bg-white aqui para que o fundo da área do layout seja branco
    // Isso fará com que a "parte preta" atrás da sidebar e ao lado dela (quando o conteúdo não a cobre) seja branca
    <div className="flex min-h-screen bg-white">
      <Menu />
      <main className="flex-1 ml-20"> {/* main continua com ml-20 para o espaço do menu */}
        {children}
      </main>
    </div>
  );
}