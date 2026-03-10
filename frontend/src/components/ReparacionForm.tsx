import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, X } from 'lucide-react';

export const ReparacionForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [motores, setMotores] = useState<any[]>([]);
  const [filtroMotor, setFiltroMotor] = useState('');
  const [motorSeleccionado, setMotorSeleccionado] = useState<any>(null);
  const [formData, setFormData] = useState({ cliente_id: '', descripcion_motor: '', estado: 'En espera' });

  useEffect(() => {
    const fetchData = async () => {
      const [c, m] = await Promise.all([
        supabase.from('clientes').select('id, nombre_razon'),
        supabase.from('motores').select('id, marca, potencia_hp, polos, vueltas, alambre_seccion')
      ]);
      if (c.data) setClientes(c.data);
      if (m.data) setMotores(m.data);
    };
    fetchData();
  }, []);

  const motoresFiltrados = motores.filter(m => 
    m.marca?.toLowerCase().includes(filtroMotor.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('reparaciones').insert([{
      cliente_id: formData.cliente_id || null,
      motor_id: motorSeleccionado?.id || null,
      descripcion_motor: formData.descripcion_motor.trim() || null,
      estado: formData.estado,
      token_publico: crypto.randomUUID(),
      comentarios: '[]'
    }]);
    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else { alert('Reparación registrada'); onSuccess(); }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow border mb-6">
      <h2 className="text-lg font-bold mb-4">Nueva Reparación</h2>
      <div className="space-y-4">
        <select className="w-full border p-2 rounded" onChange={e => setFormData({...formData, cliente_id: e.target.value})} required>
          <option value="">Seleccionar Cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre_razon}</option>)}
        </select>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input placeholder="Buscar motor (Marca, HP, Polos, Vueltas, Alambre)..." className="w-full pl-10 p-2 border rounded" value={motorSeleccionado ? `${motorSeleccionado.marca} ${motorSeleccionado.potencia_hp}HP` : filtroMotor} onChange={e => { setFiltroMotor(e.target.value); setMotorSeleccionado(null); }} />
          {filtroMotor && !motorSeleccionado && (
            <div className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
              {motoresFiltrados.map(m => (
                <div key={m.id} className="p-2 hover:bg-blue-50 cursor-pointer text-xs border-b" onClick={() => { setMotorSeleccionado(m); setFiltroMotor(''); }}>
                  <span className="font-bold">{m.marca}</span> | {m.potencia_hp}HP | Polos: {m.polos} | Vueltas: {m.vueltas} | Alambre: {m.alambre_seccion}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <input placeholder="Descripción adicional" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, descripcion_motor: e.target.value})} />
        <button disabled={loading} className="bg-orange-600 text-white px-6 py-2 rounded w-full">Registrar</button>
      </div>
    </form>
  );
};