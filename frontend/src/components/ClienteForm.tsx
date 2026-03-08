import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X } from 'lucide-react';

export const ClienteForm: React.FC<{ onSuccess: () => void; onClose: () => void }> = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({ 
    nombre_razon: '', documento: '', domicilio: '', telefono: '', 
    contacto_alternativo: '', email: '', notas: '', estado: 'Activo' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('clientes').insert([formData]);
    onSuccess();
  };

  const inputClass = "border p-2 rounded w-full";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow border mb-6">
      <div className="flex justify-between mb-4"><h2 className="font-bold">Nuevo Cliente</h2><button type="button" onClick={onClose}><X/></button></div>
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Nombre/Razón" className={inputClass} onChange={e => setFormData({...formData, nombre_razon: e.target.value})} required />
        <input placeholder="Documento" className={inputClass} onChange={e => setFormData({...formData, documento: e.target.value})} />
        <input placeholder="Teléfono" className={inputClass} onChange={e => setFormData({...formData, telefono: e.target.value})} />
        <input placeholder="Email" className={inputClass} onChange={e => setFormData({...formData, email: e.target.value})} />
        <input placeholder="Domicilio" className={inputClass} onChange={e => setFormData({...formData, domicilio: e.target.value})} />
        <input placeholder="Contacto Alt." className={inputClass} onChange={e => setFormData({...formData, contacto_alternativo: e.target.value})} />
        <select className={inputClass} onChange={e => setFormData({...formData, estado: e.target.value})}>
          <option>Activo</option><option>Inactivo</option><option>Moroso</option><option>VIP</option>
        </select>
        <textarea placeholder="Notas" className={`${inputClass} col-span-2`} onChange={e => setFormData({...formData, notas: e.target.value})} />
        <button className="bg-green-600 text-white p-2 rounded col-span-2">Guardar Cliente</button>
      </div>
    </form>
  );
};