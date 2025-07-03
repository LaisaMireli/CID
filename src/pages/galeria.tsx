// src/pages/galeria.tsx
import React from 'react';
import Layout from '@/components/Layout'; // Importe o Layout
import { Galeria } from '@/components/Galeria'; // Importe o componente Galeria

const GaleriaPage: React.FC = () => {
  return (
    <Layout>
      <Galeria />
    </Layout>
  );
};

export default GaleriaPage;