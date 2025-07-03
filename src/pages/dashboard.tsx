// src/pages/dashboard.tsx
import React from 'react';
import Layout from '@/components/Layout';
import { DashboardComponent } from '@/components/Dashboard'; // <-- ATENÇÃO AQUI: COM CHAVES

// GARANTA que esta função é o componente da sua página
const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <DashboardComponent />
    </Layout>
  );
};

// GARANTA que esta página é exportada como 'default'
export default DashboardPage;