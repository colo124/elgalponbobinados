import React, { useState } from 'react';
import { MotorForm } from '../components/MotorForm';
import { Motores } from '../components/Motores';
import { Plus, Search } from 'lucide-react';

export const Home: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banco de Motores</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={18} /> Nuevo Motor</button>
      </div>
      {showForm && <MotorForm onSuccess={() => { setShowForm(false); setRefreshKey(prev => prev + 1); }} onClose={() => setShowForm(false)} />}
      <Motores key={refreshKey} />
    </div>
  );
};