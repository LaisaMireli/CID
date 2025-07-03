// src/pages/controle.tsx
import React from 'react';
import Layout from '@/components/Layout'; // Importe o Layout
import { Controle } from '@/components/Controle'; // Importe o componente Controle

const ControlePage: React.FC = () => {
  return (
    <Layout>
      <Controle />
    </Layout>
  );
};

export default ControlePage;