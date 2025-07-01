import { useState } from "react";

import { Home, Clock, BarChart2, ShoppingBag, FileText, Users, ArrowLeft } from "lucide-react";

export function Menu() {
  return (
    <aside className="h-screen w-20 bg-[#133023] flex flex-col items-center justify-between py-6 fixed left-0 top-0 z-50">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-10 h-10 rounded-full bg-white" /> {/* Logo */}

        <NavIcon icon={<Home size={20} />} href="#home" />
        <NavIcon icon={<Clock size={20} />} href="#cadastro" />
        <NavIcon icon={<BarChart2 size={20} />} href="#dashboard" />
        <NavIcon icon={<ShoppingBag size={20} />} href="#galeria" />
        <NavIcon icon={<FileText size={20} />} href="#menu" />
        <NavIcon icon={<Users size={20} />} href="#controle" />
      </div>

      <NavIcon icon={<ArrowLeft size={20} />} href="#" />
    </aside>
  );
}

function NavIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#1d3d2e] text-white transition"
    >
      {icon}
    </a>
  );
}