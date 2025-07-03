// src/components/Galeria.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants, Transition } from 'framer-motion'; // Importe Variants e Transition
import { Camera, Filter, X, Leaf, Flower, CalendarCheck, TrendingUp, Search } from 'lucide-react';

// Importe TODAS as suas imagens da pasta src/assets/
import alface from '@/assets/alface.jpg';
import alface1 from '@/assets/alface1.jpg';
import logo from '@/assets/logo.jpg'; // Se usar na galeria, embora seja logo
import pimentao from '@/assets/pimentao.jpg';
import pimentao1 from '@/assets/pimentao1.jpg';
import tomateiro1 from '@/assets/tomateiro1.jpg';
import tomateiro2 from '@/assets/tomateiro2.jpg';
import manjericao from '@/assets/manjericao.jpg';
import manjericao1 from '@/assets/manjericao1.jpg';


// Dados de exemplo para as fotos das plantas
const mockPhotos = [
 
  { id: 2, src: tomateiro2, plantName: 'Tomateiro Maduro', date: '2024-03-15', stage: 'Maturação', notes: 'Tomateiro com frutos quase prontos para colheita.' },
  { id: 3, src: alface, plantName: 'Alface Verde', date: '2024-03-20', stage: 'Desenvolvimento', notes: 'Alface saudável e vigorosa no cultivo.' },
  { id: 4, src: alface1, plantName: 'Alface Nova', date: '2024-03-25', stage: 'Crescimento', notes: 'Mudas de alface recém-transplantadas no canteiro.' },
  { id: 5, src: pimentao, plantName: 'Pimentão Verde', date: '2024-03-28', stage: 'Floração', notes: 'Primeiras flores do pimentão indicando frutificação.' },
  { id: 6, src: pimentao1, plantName: 'Pimentão Crescendo', date: '2024-03-01', stage: 'Crescimento', notes: 'Fruto de pimentão em estágio inicial de crescimento.' },
  { id: 7, src: manjericao, plantName: 'Manjericao Danificado', date: '2024-03-28', stage: 'Floração', notes: 'Primeiras flores do pimentão indicando frutificação.' },
  { id: 8, src: manjericao1, plantName: 'Manjericao', date: '2024-05-14', stage: 'Desenvolvimento', notes: 'Fruto de pimentão em estágio inicial de crescimento.' },
  
  // Você pode ajustar as informações (plantName, date, stage, notes) e quais imagens usar na galeria
  // O logo (logo.jpg) geralmente não é uma foto de galeria de plantas, mas está importado se precisar.
];

// Variantes de animação para os cards
const photoCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" } as Transition // <--- Mantida a correção de tipagem
  },
  hover: { scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }
};

// Variantes de animação para o modal
const modalVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } as Transition }, // <--- Mantida a correção de tipagem
  exit: { opacity: 0, y: 50 }
};

export function Galeria() {
  const [selectedPlant, setSelectedPlant] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof mockPhotos[0] | null>(null);

  const plantOptions = [...new Set(mockPhotos.map(photo => photo.plantName))];
  const stageOptions = [...new Set(mockPhotos.map(photo => photo.stage))];

  const filteredPhotos = mockPhotos.filter(photo => {
    const matchesPlant = selectedPlant === 'all' || photo.plantName === selectedPlant;
    const matchesStage = selectedStage === 'all' || photo.stage === selectedStage;
    const matchesSearch = photo.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          photo.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          photo.stage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPlant && matchesStage && matchesSearch;
  });

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#133023] mb-8"
      >
        Galeria de Fotos das Plantas
      </motion.h1>

      {/* Barra de Filtros e Busca */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
      >
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter size={20} className="text-[#3A5B22]" />
          <select
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 text-[#133023] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]"
          >
            <option value="all">Todas as Plantas</option>
            {plantOptions.map(plant => (
              <option key={plant} value={plant}>{plant}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Leaf size={20} className="text-[#3A5B22]" />
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 text-[#133023] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]"
          >
            <option value="all">Todos os Estágios</option>
            {stageOptions.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 w-full md:flex-1">
          <Search size={20} className="text-[#3A5B22]" />
          <input
            type="text"
            placeholder="Buscar por notas ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 text-[#133023] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3A5B22]"
          />
        </div>

        <button className="bg-[#3A5B22] hover:bg-[#55743B] text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-200 w-full md:w-auto flex items-center justify-center">
            <Camera size={20} className="mr-2" /> Upload Foto
        </button>
      </motion.div>

      {/* Grade de Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={photoCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index * 0.05}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 border-t-4 border-[#568A56] hover:border-[#3A5B22]"
            >
              <div className="relative w-full h-48 sm:h-40 md:h-36 lg:h-40">
                <Image
                  src={photo.src} // Passando o OBJETO de imagem importado
                  alt={photo.plantName}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-[#133023]">{photo.plantName}</h3>
                <p className="text-sm text-gray-600">Estágio: {photo.stage}</p>
                <p className="text-xs text-gray-500">Data: {photo.date}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-gray-600 text-xl py-10"
          >
            Nenhuma foto encontrada para os filtros selecionados.
          </motion.p>
        )}
      </div>

      {/* Modal de Detalhes da Foto */}
      {selectedPhoto && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-[#133023] transition-colors"
            >
              <X size={24} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full h-64 md:h-auto">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.plantName}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#133023] mb-2">{selectedPhoto.plantName}</h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Estágio:</span> {selectedPhoto.stage}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Data:</span> {selectedPhoto.date}
                </p>
                <p className="text-gray-700 text-sm mt-3">
                  <span className="font-semibold">Notas:</span> {selectedPhoto.notes}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}