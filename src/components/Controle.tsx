
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

export default function Controle() {
  const [robotStatus, setRobotStatus] = useState<'idle' | 'moving' | 'paused' | 'returning'>('idle');
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [mensagemEnvio, setMensagemEnvio] = useState<string>('');
  const [caminho, setCaminho] = useState<any[]>([]);

  // Função para adicionar um passo ao caminho ao clicar nos botões de localização
  const moveToLocation = (locationId: string) => {
    if (robotStatus !== 'moving' && robotStatus !== 'idle') {
      alert('Robô não pode se mover neste estado. Inicie ou retome a operação.');
      return;
    }
    setRobotStatus('moving');
    setCurrentLocation(locationId);
    setCaminho(prev => [
      ...prev,
      { distance: 10, direction: 90, sector: locationId, toMeasure: false }
    ]);
    alert(`Robô: Movendo para ${locationId}...`);
  };

  // Função para enviar o caminho para a API ao clicar em "Iniciar"
  async function enviarCaminho() {
    if (caminho.length === 0) {
      setMensagemEnvio('Adicione passos antes de enviar!');
      return;
    }
    setMensagemEnvio('Robô está indo...');
    try {
      const res = await fetch('/api/path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(caminho),
      });
      await res.json();

      caminho.forEach((passo, idx) => {
        setTimeout(() => {
          if (idx === 0) {
            setMensagemEnvio('Robô está mapeando...');
          }
          if (idx === caminho.length - 1) {
            setMensagemEnvio('Robô terminou o caminho!');
            setCaminho([]);
          }
        }, idx * 1000);
      });
    } catch (error) {
      setMensagemEnvio('Erro ao enviar comando para o robô.');
    }
  }

  // Comandos globais
  const sendCommand = (command: 'start' | 'stop' | 'returnToBase' | 'pause') => {
    let newStatus: typeof robotStatus = robotStatus;
    let feedback = '';

    switch (command) {
      case 'start':
        enviarCaminho();
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
    if (command !== 'start') alert(`Robô: ${feedback}`);
  };

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

      {/* Caminho Montado - layout melhorado */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#133023] mb-6 flex items-center gap-2">
          <MapPin size={28} className="text-[#3A5B22]" />
          Caminho Montado
        </h2>
        <div className="mb-4">
          <span className="text-gray-700 font-medium">Caminho atual:</span>
          <ul className="mt-2 space-y-2">
            {caminho.length === 0 ? (
              <li className="text-gray-400 italic">Nenhum passo adicionado.</li>
            ) : (
              caminho.map((p, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 rounded px-4 py-2 flex flex-col sm:flex-row sm:items-center gap-2 text-[#133023] shadow-sm"
                >
                  <span className="font-semibold">Passo {idx + 1}:</span>
                  <span>{p.distance}cm</span>
                  <span>Direção {p.direction}°</span>
                  <span>Setor {p.sector}</span>
                  <span>
                    Medição:{" "}
                    <span className={p.toMeasure ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                      {p.toMeasure ? "Sim" : "Não"}
                    </span>
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold shadow"
          onClick={() => setCaminho([])}
        >
          Limpar Caminho
        </button>
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
            <Play size={20} className="mr-2" /> Iniciar (Enviar caminho)
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
        <p className="mt-4 text-lg text-gray-900">{mensagemEnvio}</p>
      </motion.div>

      {/* Seção de Controle por Localização */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#133023] mb-6">Mover para Localização Específica</h2>
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