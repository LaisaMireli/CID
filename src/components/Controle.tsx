// src/components/Controle.tsx
"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Play, Square, Home, Pause, MapPin } from 'lucide-react';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" },
  tap: { scale: 0.95 },
};

export function Controle() {
  const [robotStatus, setRobotStatus] = useState<'idle' | 'moving' | 'paused' | 'returning'>('idle');
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const sendCommand = (command: 'start' | 'stop' | 'returnToBase' | 'pause', locationId?: string) => {
    let newStatus: typeof robotStatus = robotStatus;
    let feedback = '';

    switch (command) {
      case 'start':
        newStatus = 'moving';
        feedback = 'Robô iniciado e pronto para operar.';
        break;
      case 'stop':
        newStatus = 'idle';
        feedback = 'Robô parado.';
        setCurrentLocation(null);
        break;
      case 'returnToBase':
        newStatus = 'returning';
        feedback = 'Robô voltando para a base.';
        setCurrentLocation('Base');
        break;
      case 'pause':
        newStatus = 'paused';
        feedback = 'Robô pausado.';
        break;
      default:
        break;
    }
    setRobotStatus(newStatus);
    console.log(`Comando enviado: ${command} ${locationId ? 'para ' + locationId : ''}. Status: ${feedback}`);
    alert(`Robô: ${feedback}`);
  };

  const moveToLocation = (locationId: string) => {
    if (robotStatus !== 'moving' && robotStatus !== 'idle') {
      alert('Robô não pode se mover neste estado. Inicie ou retome a operação.');
      return;
    }
    setRobotStatus('moving');
    setCurrentLocation(locationId);
    console.log(`Robô movendo para: ${locationId}`);
    alert(`Robô: Movendo para ${locationId}...`);
  };

  // APENAS AS LOCALIZAÇÕES ESPECIFICADAS: A1, A2, B1, B2
  const locations = ['A1', 'A2', 'B1', 'B2'];


  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#133023] mb-8"
      >
        Controle do Robô
      </motion.h1>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center space-x-4"
      >
        <MapPin size={36} className="text-[#3A5B22]" />
        <div>
          <p className="text-gray-500 text-sm">Status Atual do Robô:</p>
          <h2 className="text-xl font-semibold text-[#133023]">
            {robotStatus === 'idle' && 'Ocioso'}
            {robotStatus === 'moving' && `Movendo para ${currentLocation || 'um local'}`}
            {robotStatus === 'paused' && 'Pausado'}
            {robotStatus === 'returning' && 'Voltando à Base'}
          </h2>
          {currentLocation && robotStatus !== 'returning' && robotStatus !== 'idle' && (
            <p className="text-sm text-gray-600">Local atual: {currentLocation}</p>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#133023] mb-6">Comandos Globais</h2>
        <div className="flex flex-wrap gap-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => sendCommand('start')}
            className="flex items-center bg-[#3A5B22] hover:bg-[#55743B] text-white font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-200"
          >
            <Play size={20} className="mr-2" /> Iniciar
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => sendCommand('stop')}
            className="flex items-center bg-[#DEAE48] hover:bg-yellow-600 text-[#193829] font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-200"
          >
            <Square size={20} className="mr-2" /> Parar
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => sendCommand('pause')}
            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-200"
          >
            <Pause size={20} className="mr-2" /> Pausar
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => sendCommand('returnToBase')}
            className="flex items-center bg-[#568A56] hover:bg-[#6a994e] text-white font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-200"
          >
            <Home size={20} className="mr-2" /> Voltar à Base
          </motion.button>
        </div>
      </motion.div>

      {/* Seção de Controle por Localização */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#133023] mb-6">Mover para Localização Específica</h2>
        {/* Ajustado o grid para ficar melhor com menos itens */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {locations.map(locationId => (
            <motion.button
              key={locationId}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => moveToLocation(locationId)}
              className={`flex flex-col items-center justify-center p-4 rounded-md shadow-sm transition-all duration-200
                         ${currentLocation === locationId ? 'bg-[#3A5B22] text-white' : 'bg-gray-100 hover:bg-gray-200 text-[#133023]'}`}
            >
              <MapPin size={24} className="mb-1" />
              <span className="font-semibold">{locationId}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}