// src/components/Home.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion'; // Importe Variants e Transition
import { Leaf, Droplet, Sun, Thermometer, TrendingUp, Bell, ArrowRight, Twitter, Linkedin, Instagram } from 'lucide-react';

import heroImage from '@/assets/plantaLogin.svg';
import backgroundImage from '@/assets/mudas.jpg';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    } as Transition, // Mantenha a asserção aqui
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    } as Transition, // Mantenha a asserção aqui
  },
};

// Nova variante para o hover do botão CTA
// Adicionado ': Variants' para tipar explicitamente
const buttonHoverVariant: Variants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 20px rgba(222, 174, 72, 0.4)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    } as Transition, // <--- ADICIONE A ASSERÇÃO DE TIPO AQUI!
  },
};

export function HomeComponent() {
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Seção Hero */}
      <section
        className="relative h-[500px] text-white py-20 px-6 sm:px-10 lg:px-20 overflow-hidden
                   bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="absolute inset-0 bg-[#193829] opacity-70 z-0"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between z-10 relative">
          <motion.div variants={itemVariants} className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              CID: Seu Robô Fazendeiro Pessoal
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Monitore, cultive e otimize suas plantas com inteligência artificial.
            </p>
            <motion.div variants={itemVariants}>
              <Link href="/dashboard" passHref>
                <motion.button
                  variants={buttonHoverVariant}
                  whileHover="hover"
                  className="inline-flex items-center justify-center bg-[#3A5B22] hover:bg-[#55743B] text-white text-lg font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
                >
                  Ver Meus Dados <ArrowRight className="ml-2" size={20} />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section className="py-20 px-6 sm:px-10 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-16 text-[#193829]">
            Como o CID Transforma Sua Colheita
          </motion.h2>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} whileHover="hover" className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#568A56] rounded-full opacity-20 -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DEAE48] rounded-full opacity-20 -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10 p-4 rounded-full bg-white shadow-md mb-6 group-hover:shadow-lg transition-shadow duration-300 border-2 border-transparent group-hover:border-[#DEAE48]">
                <Droplet size={40} className="text-[#3A5B22] group-hover:text-[#55743B] transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#193829] group-hover:text-[#3A5B22] transition-colors duration-300">Monitoramento de Umidade</h3>
              <p className="text-gray-700">Sensores precisos garantem que suas plantas recebam a quantidade exata de água.</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover" className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#568A56] rounded-full opacity-20 -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DEAE48] rounded-full opacity-20 -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10 p-4 rounded-full bg-white shadow-md mb-6 group-hover:shadow-lg transition-shadow duration-300 border-2 border-transparent group-hover:border-[#DEAE48]">
                <Sun size={40} className="text-[#3A5B22] group-hover:text-[#55743B] transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#193829] group-hover:text-[#3A5B22] transition-colors duration-300">Controle de Luminosidade</h3>
              <p className="text-gray-700">Otimize a exposição à luz para um crescimento saudável e vigoroso.</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover" className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#568A56] rounded-full opacity-20 -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DEAE48] rounded-full opacity-20 -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10 p-4 rounded-full bg-white shadow-md mb-6 group-hover:shadow-lg transition-shadow duration-300 border-2 border-transparent group-hover:border-[#DEAE48]">
                <Thermometer size={40} className="text-[#3A5B22] group-hover:text-[#55743B] transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#193829] group-hover:text-[#3A5B22] transition-colors duration-300">Temperatura Ideal</h3>
              <p className="text-gray-700">Mantenha o ambiente na temperatura perfeita para cada tipo de cultura.</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover" className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#568A56] rounded-full opacity-20 -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DEAE48] rounded-full opacity-20 -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10 p-4 rounded-full bg-white shadow-md mb-6 group-hover:shadow-lg transition-shadow duration-300 border-2 border-transparent group-hover:border-[#DEAE48]">
                <TrendingUp size={40} className="text-[#3A5B22] group-hover:text-[#55743B] transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#193829] group-hover:text-[#3A5B22] transition-colors duration-300">Análise de Crescimento</h3>
              <p className="text-gray-700">Acompanhe o progresso das suas plantas com dados e gráficos intuitivos.</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover" className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#568A56] rounded-full opacity-20 -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DEAE48] rounded-full opacity-20 -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10 p-4 rounded-full bg-white shadow-md mb-6 group-hover:shadow-lg transition-shadow duration-300 border-2 border-transparent group-hover:border-[#DEAE48]">
                <Bell size={40} className="text-[#3A5B22] group-hover:text-[#55743B] transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#193829] group-hover:text-[#3A5B22] transition-colors duration-300">Alertas Inteligentes</h3>
              <p className="text-gray-700">Receba notificações instantâneas sobre qualquer necessidade ou anomalia.</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover" className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#568A56] rounded-full opacity-20 -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DEAE48] rounded-full opacity-20 -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10 p-4 rounded-full bg-white shadow-md mb-6 group-hover:shadow-lg transition-shadow duration-300 border-2 border-transparent group-hover:border-[#DEAE48]">
                <Leaf size={40} className="text-[#3A5B22] group-hover:text-[#55743B] transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[#193829] group-hover:text-[#3A5B22] transition-colors duration-300">Otimização Automática</h3>
              <p className="text-gray-700">O robô CID ajusta automaticamente as condições para o melhor resultado.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Chamada para Ação */}
      <section className="bg-[#55743B] text-white py-24 px-6 sm:px-10 lg:px-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#55743B] to-[#3A5B22] opacity-90 z-0"></div>
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <Leaf size={150} className="text-white transform rotate-45" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-10">
          <Droplet size={120} className="text-white transform -rotate-45" />
        </div>

        <motion.div variants={containerVariants} className="max-w-4xl mx-auto relative z-10">
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Pronto para uma Agricultura Inteligente?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg lg:text-xl mb-10 opacity-90">
           Comece a monitorar suas plantas com o CID e veja a diferença em sua colheita.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/controle" passHref>
              <motion.button
                variants={buttonHoverVariant}
                whileHover="hover"
                className="inline-flex items-center justify-center bg-[#DEAE48] hover:bg-yellow-600 text-[#193829] text-xl font-bold py-4 px-10 rounded-full transition duration-300 shadow-xl transform"
              >
                Controle - CID <ArrowRight className="ml-3" size={24} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Rodapé - MAIS LINEAR (CÓDIGO ATUALIZADO) */}
      <footer className="bg-[#193829] text-white py-8 px-6 sm:px-10 lg:px-20 border-t border-[#568A56]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left space-y-4 md:space-y-0">
          {/* Informações de Direitos Autorais e Nome do Projeto */}
          <div className="flex-shrink-0"> {/* flex-shrink-0 para evitar que encolha demais */}
            <p className="text-lg font-semibold mb-1 md:mb-0">CID Robô Fazendeiro</p>
            <p className="text-sm">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>

          {/* Links e Redes Sociais Agrupados em uma linha */}
          <div className="flex flex-col items-center md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            {/* Links de Navegação */}
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm">
              <li><Link href="/politica-privacidade" className="hover:text-[#DEAE48] transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/termos-de-uso" className="hover:text-[#DEAE48] transition-colors">Termos de Uso</Link></li>
              <li><Link href="/contato" className="hover:text-[#DEAE48] transition-colors">Contato</Link></li>
            </ul>

            {/* Redes Sociais */}
            <div className="flex space-x-4">
              <Link href="https://twitter.com/seu_cid_robo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#DEAE48] transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://linkedin.com/company/seu-cid-robo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#DEAE48] transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://instagram.com/seu_cid_robo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#DEAE48] transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
