import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X } from 'lucide-react';

interface MotorFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const MotorForm: React.FC<MotorFormProps> = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    potencia_hp: '',
    polos: '',
    rpm: '',
    voltaje: '',
    conexion: '',
    numero_serie: '',
    comentarios: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toNum = (val: string) => (val.trim() === '' ? null : Number(val));

    const payload = {
      marca: formData.marca.trim() || null,
      modelo: formData.modelo.trim() || null,
      potencia_hp: toNum(formData.potencia_hp),
      polos: toNum(formData.polos),
      rpm: toNum(formData.rpm),
      voltaje: formData.voltaje.trim() || null,
      conexion: formData.conexion.trim() || null,
      numero_serie: formData.numero_serie.trim() || null,
      comentarios: formData.comentarios.trim() || null
    };

    const { error } = await supabase.from('motores').insert([payload]);

    setLoading(false);
    if (error) {
      alert('Error al guardar motor: ' + error.message);
    } else {
      alert('Motor registrado con éxito');
      onSuccess();
    }
  };

  const inputClass = "w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg border border-slate-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800">Nuevo Motor</h2>
        <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          placeholder="Marca *" 
          className={inputClass} 
          value={formData.marca}
          onChange={e => setFormData({...formData, marca: e.target.value})} 
          required 
        />
        <input 
          placeholder="Modelo" 
          className={inputClass} 
          value={formData.modelo}
          onChange={e => setFormData({...formData, modelo: e.target.value})} 
        />
        <input 
          placeholder="Potencia (HP)" 
          type="number" 
          step="any"
          className={inputClass} 
          value={formData.potencia_hp}
          onChange={e => setFormData({...formData, potencia_hp: e.target.value})} 
        />
        <input 
          placeholder="Polos" 
          type="number" 
          className={inputClass} 
          value={formData.polos}
          onChange={e => setFormData({...formData, polos: e.target.value})} 
        />
        <input 
          placeholder="RPM" 
          type="number" 
          className={inputClass} 
          value={formData.rpm}
          onChange={e => setFormData({...formData, rpm: e.target.value})} 
        />
        <input 
          placeholder="Voltaje" 
          className={inputClass} 
          value={formData.voltaje}
          onChange={e => setFormData({...formData, voltaje: e.target.value})} 
        />
        <input 
          placeholder="Conexión (ej: Estrella, Triángulo)" 
          className={inputClass} 
          value={formData.conexion}
          onChange={e => setFormData({...formData, conexion: e.target.value})} 
        />
        <input 
          placeholder="Nº Serie" 
          className={inputClass} 
          value={formData.numero_serie}
          onChange={e => setFormData({...formData, numero_serie: e.target.value})} 
        />
      </div>

      <textarea 
        placeholder="Comentarios" 
        className={`${inputClass} mt-4`} 
        value={formData.comentarios}
        onChange={e => setFormData({...formData, comentarios: e.target.value})} 
      />

      <button 
        disabled={loading} 
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
      >
        <Save size={18} /> {loading ? 'Guardando...' : 'Guardar Motor'}
      </button>
    </form>
  );
};