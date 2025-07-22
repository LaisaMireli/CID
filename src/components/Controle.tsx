"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Play, Square, Home, Send, MapPin, Eraser } from 'lucide-react';

// Variantes de animação para as seções
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Variantes de animação para os botões
const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" },
  tap: { scale: 0.95 },
};

// Objeto que mapeia cada localização a seus dados específicos
const locationData: { [key: string]: { distance: number; direction: number; toMeasure: boolean } } = {
  'A1': { distance: 15, direction: 0, toMeasure: true },
  'A2': { distance: 25, direction: 0, toMeasure: true },
  'B1': { distance: 12, direction: 0, toMeasure: true },
  'B2': { distance: 30, direction: 0, toMeasure: true },
};
const locations = Object.keys(locationData);

export default function Controle() {
  const [robotStatus, setRobotStatus] = useState<'idle' | 'mapping' | 'moving' | 'returning'>('idle');
  const [mensagem, setMensagem] = useState<string>('Clique em "Iniciar Mapeamento" para começar.');
  const [caminho, setCaminho] = useState<any[]>([]);
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const adicionarPassoAoCaminho = (locationId: string) => {
    if (robotStatus !== 'mapping') {
      alert('Você precisa iniciar o mapeamento antes de adicionar passos!');
      return;
    }

    const passoInfo = locationData[locationId];
    if (!passoInfo) return;

    setLastClicked(locationId);
    setTimeout(() => setLastClicked(null), 300);

    setCaminho(prev => [...prev, {
      distance: passoInfo.distance,
      direction: passoInfo.direction,
      sector: locationId,
      toMeasure: passoInfo.toMeasure
    }]);
    setMensagem(`Passo para ${locationId} adicionado.`);
  };

  async function enviarCaminho() {
    if (caminho.length === 0) {
      setMensagem('Adicione passos antes de enviar!');
      return;
    }
    setMensagem('Enviando caminho... Robô iniciando a rota.');
    setRobotStatus('moving');

    try {
      const res = await fetch('/api/path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(caminho),
      });

      if (!res.ok) throw new Error('Falha na resposta da API.');

      const tempoTotalDoCaminho = caminho.length * 2000;
      setTimeout(() => {
        setMensagem('Mapeamento concluído com sucesso!');
        setRobotStatus('idle');
        setCaminho([]);
      }, tempoTotalDoCaminho);

    } catch (error) {
      setMensagem('Erro de conexão ao enviar comando. Tente novamente.');
      setRobotStatus('idle');
    }
  }

  const handleCommand = (command: 'start_mapping' | 'stop') => {
    switch (command) {
      case 'start_mapping':
        setRobotStatus('mapping');
        setMensagem('Modo de mapeamento ativado. Selecione os setores na ordem desejada.');
        break;
      case 'stop':
        setRobotStatus('idle');
        setMensagem('Operação parada e caminho resetado. Clique em "Iniciar Mapeamento" para começar de novo.');
        setCaminho([]);
        break;
    }
  };

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
            {robotStatus === 'mapping' && 'Montando Rota'}
            {robotStatus === 'moving' && 'Executando Rota'}
            {robotStatus === 'returning' && 'Voltando à Base'}
          </h2>
          <p className="mt-2 text-md text-gray-700">{mensagem}</p>
        </div>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#133023] mb-6">1. Selecione os Setores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {locations.map(locationId => (
            <motion.button
              key={locationId}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => adicionarPassoAoCaminho(locationId)}
              disabled={robotStatus !== 'mapping'}
              className={`flex flex-col items-center justify-center p-4 rounded-md shadow-sm transition-all duration-200
                          ${lastClicked === locationId ? 'bg-green-400 text-white' : 'bg-gray-100 hover:bg-gray-200 text-[#133023]'}
                          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <MapPin size={24} className="mb-1" />
              <span className="font-semibold">{locationId}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#133023] mb-6 flex items-center gap-2">
          2. Revise o Caminho Montado
        </h2>
        <div className="mb-4">
          <ul className="mt-2 space-y-2">
            {caminho.length === 0 ? (
              <li className="text-gray-400 italic">Nenhum passo adicionado.</li>
            ) : (
              caminho.map((p, idx) => (
                <li key={idx} className="bg-gray-100 rounded px-4 py-2 flex items-center gap-4 text-[#133023] shadow-sm">
                  <span className="font-semibold text-lg">Passo {idx + 1}:</span>
                  <span>Setor {p.sector}</span>
                  <span className="text-sm text-gray-600">(Dist: {p.distance}cm, Dir: {p.direction}°)</span>
                </li>
              ))
            )}
          </ul>
        </div>
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold shadow disabled:opacity-50"
          onClick={() => {
            setCaminho([]);
            setMensagem('Caminho limpo. Adicione novos passos.');
          }}
          disabled={caminho.length === 0}
        >
          <Eraser size={18} className="inline-block mr-2" />
          Limpar Caminho
        </button>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#133023] mb-6">3. Inicie, Envie ou Pare a Operação</h2>
        <div className="flex flex-wrap gap-4">
          <motion.button
            variants={buttonVariants} whileHover="hover" whileTap="tap"
            onClick={() => handleCommand('start_mapping')}
            disabled={robotStatus === 'mapping'}
            className="flex items-center bg-[#3A5B22] hover:bg-[#55743B] text-white font-semibold py-3 px-6 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={20} className="mr-2" /> Iniciar Mapeamento
          </motion.button>

          <motion.button
            variants={buttonVariants} whileHover="hover" whileTap="tap"
            onClick={enviarCaminho}
            disabled={robotStatus !== 'mapping' || caminho.length === 0}
            className="flex items-center bg-[#3A5B22] hover:bg-[#55743B] text-white font-semibold py-3 px-6 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} className="mr-2" /> Enviar Mapeamento
          </motion.button>

          <motion.button
            variants={buttonVariants} whileHover="hover" whileTap="tap"
            onClick={() => handleCommand('stop')}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md"
          >
            <Square size={20} className="mr-2" /> Parar e Resetar
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}