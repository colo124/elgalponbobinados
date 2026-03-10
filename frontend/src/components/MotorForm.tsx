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
    marca: '', modelo: '', potencia_hp: '', polos: '', rpm: '', voltaje: '', 
    conexion: '', ranuras: '', alambre_seccion: '', vueltas: '', numero_serie: '', comentarios: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toNum = (val: string) => (val.trim() === '' ? null : Number(val));
    const payload = {
      ...formData,
      potencia_hp: toNum(formData.potencia_hp),
      polos: toNum(formData.polos),
      rpm: toNum(formData.rpm),
      ranuras: toNum(formData.ranuras),
      vueltas: toNum(formData.vueltas),
      token_publico: crypto.randomUUID()
    };
    const { error } = await supabase.from('motores').insert([payload]);
    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else { alert('Motor registrado'); onSuccess(); }
  };

  const inputClass = "w-full border p-2 rounded text-sm";
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg border mb-6">
      <div className="flex justify-between mb-4"><h2 className="font-bold">Nuevo Motor</h2><button type="button" onClick={onClose}><X/></button></div>
      <div className="grid grid-cols-3 gap-4">
        <input placeholder="Marca" className={inputClass} onChange={e => setFormData({...formData, marca: e.target.value})} />
        <input placeholder="HP" type="number" className={inputClass} onChange={e => setFormData({...formData, potencia_hp: e.target.value})} />
        <input placeholder="Polos" type="number" className={inputClass} onChange={e => setFormData({...formData, polos: e.target.value})} />
        <input placeholder="RPM" type="number" className={inputClass} onChange={e => setFormData({...formData, rpm: e.target.value})} />
        <input placeholder="Conexión" className={inputClass} onChange={e => setFormData({...formData, conexion: e.target.value})} />
        <input placeholder="Ranuras" type="number" className={inputClass} onChange={e => setFormData({...formData, ranuras: e.target.value})} />
        <input placeholder="Alambre" className={inputClass} onChange={e => setFormData({...formData, alambre_seccion: e.target.value})} />
        <input placeholder="Vueltas" type="number" className={inputClass} onChange={e => setFormData({...formData, vueltas: e.target.value})} />
        <input placeholder="Voltaje" className={inputClass} onChange={e => setFormData({...formData, voltaje: e.target.value})} />
      </div>
      <textarea placeholder="Comentarios" className={`${inputClass} mt-4`} onChange={e => setFormData({...formData, comentarios: e.target.value})} />
      <button disabled={loading} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"><Save size={18} /> Guardar</button>
    </form>
  );
};