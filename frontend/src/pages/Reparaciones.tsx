import React from 'react';
import { ReparacionForm } from '../components/ReparacionForm';
import { BuscadorReparaciones } from '../components/BuscadorReparaciones';
import { Wrench } from 'lucide-react';

export const Reparaciones: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6">
        <Wrench className="text-slate-600" /> Gestión de Reparaciones
      </h1>
      <ReparacionForm onSuccess={() => window.location.reload()} />
      <BuscadorReparaciones />
    </div>
  );
};