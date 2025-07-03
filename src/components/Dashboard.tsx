// src/components/Dashboard.tsx
"use client";

import React, { useState, useEffect } from 'react'; // Importado useEffect
import { Leaf, Droplet, Sun, Thermometer, TrendingUp, Flower, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Variantes para animação (mantidas)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }
};

// Função para gerar dados aleatórios para gráficos
const generateRandomData = (count: number, max: number, min: number = 0) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export function DashboardComponent() {
  // Dados de exemplo das plantas
  const plants = [
    { id: 'plant1', name: 'Tomateiro 1' },
    { id: 'plant2', name: 'Alface Hidropônica' },
    { id: 'plant3', name: 'Manjericão da Horta' },
    { id: 'plant4', name: 'Pimentão Verde' },
  ];

  // Estado para a planta selecionada
  const [selectedPlantId, setSelectedPlantId] = useState(plants[0].id);
  const selectedPlant = plants.find(p => p.id === selectedPlantId);

  // Estados para os dados dos gráficos, que serão atualizados
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [airHumidityData, setAirHumidityData] = useState<number[]>([]);
  const [soilHumidityData, setSoilHumidityData] = useState<number[]>([]);
  const [currentStage, setCurrentStage] = useState('Carregando...');
  const [avgTemp, setAvgTemp] = useState('...');
  const [soilHum, setSoilHum] = useState('...');
  const [luminosity, setLuminosity] = useState('...');


  // Hook useEffect para simular o carregamento de dados quando a planta selecionada muda
  useEffect(() => {
    // Em uma aplicação real, você faria uma chamada de API aqui:
    // fetch(`/api/plantData?id=${selectedPlantId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setTemperatureData(data.temperatures);
    //     setAirHumidityData(data.airHumidity);
    //     setSoilHumidityData(data.soilHumidity);
    //     // ... atualizar outros estados com dados reais
    //   });

    // Simulando carregamento de dados aleatórios para a planta selecionada
    console.log(`Carregando dados para: ${selectedPlant?.name || 'N/A'}`);
    setTemperatureData(generateRandomData(24, 32, 18));
    setAirHumidityData(generateRandomData(10, 90, 40));
    setSoilHumidityData(generateRandomData(10, 80, 30));

    // Atualizando dados dos cards (simulados)
    const randomStage = ['Crescimento', 'Floração', 'Maturação', 'Desenvolvimento'][Math.floor(Math.random() * 4)];
    setCurrentStage(randomStage);
    setAvgTemp(`${(Math.random() * (28 - 20) + 20).toFixed(1)}°C`);
    setSoilHum(`${Math.floor(Math.random() * (80 - 40) + 40)}%`);
    setLuminosity(Math.random() > 0.5 ? 'Ótima' : 'Boa');


  }, [selectedPlantId]); // Roda este efeito toda vez que selectedPlantId muda

  const tempMin = 15;
  const tempMax = 35;

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-bold text-[#133023]">
          Dashboard de {selectedPlant?.name || 'Carregando...'}
        </h1>
        {/* Seletor de Plantas */}
        <div className="relative">
          <select
            id="plant-selector"
            value={selectedPlantId}
            onChange={(e) => setSelectedPlantId(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 text-[#133023] py-3 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#3A5B22] focus:border-transparent"
          >
            {plants.map((plant) => (
              <option key={plant.id} value={plant.id}>
                {plant.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </motion.div>

      {/* Seção de Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer transform transition-all duration-300"
        >
          <div className="p-3 rounded-full bg-[#E6F0E6]">
            <Leaf size={24} className="text-[#3A5B22]" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Estágio Atual</p>
            <h2 className="text-xl font-semibold text-[#133023]">{currentStage}</h2>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
          whileHover="hover"
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer transform transition-all duration-300"
        >
          <div className="p-3 rounded-full bg-[#E6F0E6]">
            <Thermometer size={24} className="text-[#3A5B22]" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Temperatura Média</p>
            <h2 className="text-xl font-semibold text-[#133023]">{avgTemp}</h2>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0.2}
          whileHover="hover"
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer transform transition-all duration-300"
        >
          <div className="p-3 rounded-full bg-[#E6F0E6]">
            <Droplet size={24} className="text-[#3A5B22]" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Umidade do Solo</p>
            <h2 className="text-xl font-semibold text-[#133023]">{soilHum}</h2>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0.3}
          whileHover="hover"
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer transform transition-all duration-300"
        >
          <div className="p-3 rounded-full bg-[#E6F0E6]">
            <Sun size={24} className="text-[#3A5B22]" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Luminosidade</p>
            <h2 className="text-xl font-semibold text-[#133023]">{luminosity}</h2>
          </div>
        </motion.div>
      </div>

      {/* Seção de Estágios de Desenvolvimento */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#133023] mb-6">Estágios de Desenvolvimento da Planta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Flower size={36} />, label: "Crescimento", desc: "Fase vegetativa da planta.", color: "#3A5B22" },
            { icon: <Flower size={36} />, label: "Floração", desc: "Início da produção de flores.", color: "#3A5B22" },
            { icon: <CalendarCheck size={36} />, label: "Maturação", desc: "Período de amadurecimento dos frutos.", color: "#3A5B22" },
            { icon: <TrendingUp size={36} />, label: "Desenvolvimento", desc: "Acompanhamento geral do progresso.", color: "#193829" },
          ].map((stage, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
              className="flex flex-col items-center text-center p-4 border border-gray-200 rounded-md cursor-pointer transform transition-all duration-300"
            >
              {React.cloneElement(stage.icon as React.ReactElement, {
                className: `${(stage.icon as React.ReactElement).props.className || ''} text-[${stage.color}] mb-2`
              })}
              <p className="font-medium text-[#133023]">{stage.label}</p>
              <p className="text-sm text-gray-600">{stage.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Seção de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Linha: Temperatura ao longo do dia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          className="bg-white p-8 rounded-lg shadow-md cursor-pointer transform transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-[#133023] mb-6">Temperatura ao Longo do Dia</h2>
          <div className="w-full h-48 relative bg-gray-100 rounded-md p-4">
            <svg viewBox={`0 0 100 ${tempMax - tempMin + 20}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <line x1="10" y1={tempMax - tempMin + 10} x2="90" y2={tempMax - tempMin + 10} stroke="#E0E0E0" strokeWidth="0.3" />
              <line x1="10" y1="10" x2="10" y2={tempMax - tempMin + 10} stroke="#E0E0E0" strokeWidth="0.3" />

              <polyline
                fill="none"
                stroke="#3A5B22"
                strokeWidth="1"
                points={temperatureData.map((temp, i) => {
                  const x = 10 + (i / (temperatureData.length - 1)) * 80;
                  const y = (tempMax - temp + 10);
                  return `${x},${y}`;
                }).join(' ')}
              />

              {temperatureData.map((temp, i) => {
                const x = 10 + (i / (temperatureData.length - 1)) * 80;
                const y = (tempMax - temp + 10);
                return (
                  <React.Fragment key={`point-${i}`}>
                    <circle cx={x} cy={y} r="1" fill="#DEAE48" stroke="#193829" strokeWidth="0.2" />
                    <text x={x} y={y - 1.5} fontSize="3.5" fill="#193829" textAnchor="middle">{temp}°</text>
                  </React.Fragment>
                );
              })}

              {Array.from({ length: 5 }).map((_, i) => {
                const hour = (i * 6);
                const x = 10 + (hour / 23) * 80;
                return (
                  <text key={`x-label-${i}`} x={x} y={tempMax - tempMin + 13} fontSize="3.5" fill="#666" textAnchor="middle">{hour}h</text>
                );
              })}

              {Array.from({ length: 3 }).map((_, i) => {
                const tempLabel = tempMin + 5 + i * 5;
                const y = (tempMax - tempLabel + 10);
                if (y >= 10 && y <= tempMax - tempMin + 10) {
                   return (
                    <text key={`y-label-${i}`} x="8" y={y} fontSize="3.5" fill="#666" textAnchor="end" dominantBaseline="middle">{tempLabel}°</text>
                  );
                }
                return null;
              })}
            </svg>
          </div>
        </motion.div>

        {/* Gráfico de Barras: Umidade do Ar e Solo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          className="bg-white p-8 rounded-lg shadow-md cursor-pointer transform transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-[#133023] mb-6">Umidade do Ar e Solo</h2>
          <div className="w-full h-64 relative bg-gray-100 rounded-md p-4 flex items-end justify-around space-x-2">
            <div className="absolute bottom-4 left-4 right-4 h-px bg-gray-300"></div>
            <div className="absolute top-4 bottom-4 left-4 w-px bg-gray-300"></div>

            {airHumidityData.map((airH, index) => {
              const soilH = soilHumidityData[index];
              return (
                <div key={index} className="flex flex-col justify-end items-center h-full relative w-8">
                  <div
                    className="w-3 rounded-t-sm bg-[#568A56] hover:bg-[#3A5B22] transition-colors duration-200"
                    style={{ height: `${airH}%` }}
                    title={`Ar: ${airH}%`}
                  ></div>
                  <div
                    className="w-3 rounded-t-sm bg-[#55743B] hover:bg-[#193829] transition-colors duration-200 mt-0.5"
                    style={{ height: `${soilH}%` }}
                    title={`Solo: ${soilH}%`}
                  ></div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}