// src/components/Dashboard.tsx (VERSÃO FINAL + SEÇÃO DE ESTÁGIOS)

import React, { useState, useEffect } from 'react';
import { Leaf, Droplet, Sun, Thermometer, BatteryMedium, AlertTriangle, Flower, CalendarCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// Variantes de animação para os cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Variantes de animação para os itens (usado na seção de Estágios)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


export function DashboardComponent() {
  // Estados para guardar os dados reais vindos da API
  const [latestMeasurement, setLatestMeasurement] = useState<any>(null);
  const [latestStatus, setLatestStatus] = useState<any>(null);
  const [measurementErrors, setMeasurementErrors] = useState<string[]>([]);

  // useEffect que busca os dados da API em loop (polling)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/latest-data');
        if (!response.ok) return;
        const data = await response.json();
        
        if (data.latestMeasurement) {
          setLatestMeasurement(data.latestMeasurement);
          if (data.latestMeasurement.errors) {
            setMeasurementErrors(data.latestMeasurement.errors.split(','));
          }
        }
        if (data.latestStatus) {
          setLatestStatus(data.latestStatus);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // "Variáveis de exibição" seguras que previnem erros
  const displayTemp = latestMeasurement ? `${latestMeasurement.temperature?.toFixed(1)}°C` : '...';
  const displaySoilHum = latestMeasurement ? `${latestMeasurement.soilMoisture}%` : '...';
  const displayLuminosity = latestMeasurement ? `${latestMeasurement.luminosity}%` : '...';
  const displayBattery = latestStatus ? `${latestStatus.batteryLevel}%` : '...';
  const displayCurrentSector = latestStatus ? latestStatus.currentSector : 'Desconhecido';

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-bold text-[#133023]">Dashboard de Monitoramento</h1>
        <div className="text-right">
          <p className="text-gray-500 text-sm">Setor Atual do Robô</p>
          <h2 className="text-xl font-semibold text-[#133023]">{displayCurrentSector}</h2>
        </div>
      </motion.div>

      {/* Card de Erros */}
      {measurementErrors.length > 0 && measurementErrors[0] !== 'NONE' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mb-8">
          <div className="flex items-center">
            <AlertTriangle className="mr-3" />
            <p className="font-bold">Atenção! Erros detectados: {measurementErrors.join(', ')}</p>
          </div>
        </motion.div>
      )}

      {/* Seção de Cards de Resumo */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <Card icon={<BatteryMedium size={24} />} label="Bateria do Robô" value={displayBattery} />
        <Card icon={<Thermometer size={24} />} label="Temperatura Atual" value={displayTemp} />
        <Card icon={<Droplet size={24} />} label="Umidade do Solo" value={displaySoilHum} />
        <Card icon={<Sun size={24} />} label="Luminosidade" value={displayLuminosity} />
      </motion.div>

      {/* ================================================================= */}
      {/* MUDANÇA: Seção de Estágios de Desenvolvimento adicionada abaixo */}
      {/* ================================================================= */}
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
                className: `text-[${stage.color}] mb-2`,
                style: { color: stage.color } // Adicionado para garantir a cor
              })}
              <p className="font-medium text-[#133023]">{stage.label}</p>
              <p className="text-sm text-gray-600">{stage.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Componente auxiliar para os cards
function Card({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
      className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"
    >
      <div className="p-3 rounded-full bg-[#E6F0E6] text-[#3A5B22]">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-xl font-semibold text-[#133023]">{value}</h2>
      </div>
    </motion.div>
  );
}