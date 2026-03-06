import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Loader2 } from 'lucide-react';

interface ReparacionFormProps {
  onSuccess: () => void;
}

export const ReparacionForm: React.FC<ReparacionFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [clientes, setClientes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    cliente_id: '',
    descripcion_motor: '',
    estado: 'En espera'
  });

  useEffect(() => {
    const fetchClientes = async () => {
      const { data } = await supabase.from('clientes').select('id, nombre_razon');
      if (data) setClientes(data);
      setFetching(false);
    };
    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('reparaciones').insert([{
      cliente_id: formData.cliente_id || null,
      descripcion_motor: formData.descripcion_motor.trim() || null,
      estado: formData.estado
    }]);
    setLoading(false);
    if (error) {
      alert('Error al registrar reparación: ' + error.message);
    } else {
      alert('Reparación registrada con éxito');
      onSuccess();
    }
  };

  if (fetching) return <div className="p-4 flex items-center gap-2"><Loader2 className="animate-spin" /> Cargando clientes...</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow border border-slate-200 mb-6">
      <h2 className="text-lg font-bold mb-4">Nueva Reparación</h2>
      <div className="space-y-4">
        <select className="w-full border p-2 rounded" onChange={e => setFormData({...formData, cliente_id: e.target.value})} required>
          <option value="">Seleccionar Cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre_razon}</option>)}
        </select>
        <input 
          placeholder="Descripción del motor (editable)" 
          className="w-full border p-2 rounded" 
          onChange={e => setFormData({...formData, descripcion_motor: e.target.value})} 
        />
        <select className="w-full border p-2 rounded" onChange={e => setFormData({...formData, estado: e.target.value})}>
          <option value="En espera">En espera</option>
          <option value="En proceso">En proceso</option>
          <option value="Terminado">Terminado</option>
        </select>
        <button disabled={loading} className="bg-orange-600 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-orange-700">
          <Save size={18} /> {loading ? 'Guardando...' : 'Registrar Reparación'}
        </button>
      </div>
    </form>
  );
};