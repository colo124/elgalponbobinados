import React, { useState } from 'react';
import { ClienteForm } from '../components/ClienteForm';
import { BuscadorClientes } from '../components/BuscadorClientes';
import { Plus, Users } from 'lucide-react';

export const Clientes: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="text-slate-600" /> Clientes
        </h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={18} /> {showForm ? 'Cancelar' : 'Nuevo Cliente'}
        </button>
      </div>

      {showForm && (
        <ClienteForm 
          onSuccess={() => { 
            setShowForm(false); 
            setRefreshKey(prev => prev + 1); 
          }} 
          onClose={() => setShowForm(false)} 
        />
      )}

      <BuscadorClientes key={refreshKey} />
    </div>
  );
};