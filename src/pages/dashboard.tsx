// Arquivo: src/pages/dashboard.tsx (VERSÃO CORRIGIDA E SIMPLES)

import { DashboardComponent } from "@/components/Dashboard";
import Head from 'next/head';

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Projeto CID</title>
      </Head>
      
      {/* A página apenas renderiza o componente, sem o Layout por enquanto para simplificar */}
      <DashboardComponent />
    </>
  );
};

export default DashboardPage;