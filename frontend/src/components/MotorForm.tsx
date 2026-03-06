import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X } from 'lucide-react';

interface MotorFormProps {
  motor?: any;
  onSuccess: () => void;
  onClose: () => void;
}

export const MotorForm: React.FC<MotorFormProps> = ({ motor, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ marca: '', modelo: '', potencia_hp: '', conexion: '' });

  useEffect(() => { if (motor) setFormData(motor); }, [motor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = motor?.id 
      ? await supabase.from('motores').update(formData).eq('id', motor.id)
      : await supabase.from('motores').insert([formData]);
    setLoading(false);
    if (!error) onSuccess();
  };

  const inputClass = "w-full border border-slate-300 rounded p-3 min-h-[44px] text-base";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg border border-slate-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Marca" className={inputClass} value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} required />
        <input placeholder="Modelo" className={inputClass} value={formData.modelo} onChange={e => setFormData({...formData, modelo: e.target.value})} />
        <input placeholder="HP" type="number" className={inputClass} value={formData.potencia_hp} onChange={e => setFormData({...formData, potencia_hp: e.target.value})} />
        <input placeholder="Conexión" className={inputClass} value={formData.conexion} onChange={e => setFormData({...formData, conexion: e.target.value})} />
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white p-4 rounded min-h-[44px] font-bold">Guardar Motor</button>
    </form>
  );
};