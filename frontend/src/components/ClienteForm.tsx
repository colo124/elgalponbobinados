import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X } from 'lucide-react';

interface ClienteFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre_razon: '',
    documento: '',
    domicilio: '',
    telefono: '',
    contacto_alternativo: '',
    email: '',
    notas: '',
    estado: 'Activo'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Preparar payload: convertir strings vacíos a null para campos opcionales
    const payload = {
      nombre_razon: formData.nombre_razon.trim(),
      documento: formData.documento.trim() || null,
      domicilio: formData.domicilio.trim() || null,
      telefono: formData.telefono.trim() || null,
      contacto_alternativo: formData.contacto_alternativo.trim() || null,
      email: formData.email.trim() || null,
      notas: formData.notas.trim() || null,
      estado: formData.estado
    };

    const { error } = await supabase.from('clientes').insert([payload]);

    setLoading(false);
    if (error) {
      alert('Error al guardar cliente: ' + error.message);
    } else {
      alert('Cliente registrado con éxito');
      onSuccess();
    }
  };

  const inputClass = "w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-green-500 outline-none";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg border border-slate-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800">Nuevo Cliente</h2>
        <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          placeholder="Nombre / Razón Social *" 
          className={inputClass} 
          value={formData.nombre_razon}
          onChange={e => setFormData({...formData, nombre_razon: e.target.value})} 
          required 
        />
        <input 
          placeholder="Documento (DNI/CUIT)" 
          className={inputClass} 
          value={formData.documento}
          onChange={e => setFormData({...formData, documento: e.target.value})} 
        />
        <input 
          placeholder="Teléfono" 
          className={inputClass} 
          value={formData.telefono}
          onChange={e => setFormData({...formData, telefono: e.target.value})} 
        />
        <input 
          placeholder="Email" 
          type="email" 
          className={inputClass} 
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          placeholder="Domicilio" 
          className={inputClass} 
          value={formData.domicilio}
          onChange={e => setFormData({...formData, domicilio: e.target.value})} 
        />
        <select 
          className={inputClass} 
          value={formData.estado}
          onChange={e => setFormData({...formData, estado: e.target.value})}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Moroso">Moroso</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <textarea 
        placeholder="Notas adicionales" 
        className={`${inputClass} mt-4`} 
        value={formData.notas}
        onChange={e => setFormData({...formData, notas: e.target.value})} 
      />

      <button 
        disabled={loading} 
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
      >
        <Save size={18} /> {loading ? 'Guardando...' : 'Guardar Cliente'}
      </button>
    </form>
  );
};