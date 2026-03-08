import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Trash2, Edit2, Search, X, Save } from 'lucide-react';

export const Motores: React.FC = () => {
  const [motores, setMotores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [editingMotor, setEditingMotor] = useState<any>(null);

  const fetchMotores = async () => {
    setLoading(true);
    const { data } = await supabase.from('motores').select('*').order('created_at', { ascending: false });
    if (data) setMotores(data);
    setLoading(false);
  };

  useEffect(() => { fetchMotores(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este motor?')) return;
    await supabase.from('motores').delete().eq('id', id);
    fetchMotores();
  };

  const filtered = motores.filter(m => 
    m.marca?.toLowerCase().includes(filtro.toLowerCase()) || 
    m.modelo?.toLowerCase().includes(filtro.toLowerCase()) ||
    m.numero_serie?.includes(filtro)
  );

  return (
    <div className="mt-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        <input placeholder="Buscar por marca, modelo o serie..." className="w-full pl-10 p-2 border rounded" onChange={e => setFiltro(e.target.value)} />
      </div>
      
      {loading ? <Loader2 className="animate-spin mx-auto" /> : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 border-b">
              <tr><th className="p-3">Marca</th><th className="p-3">Modelo</th><th className="p-3">Nº Serie</th><th className="p-3">Acciones</th></tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-3">{m.marca}</td>
                  <td className="p-3">{m.modelo}</td>
                  <td className="p-3">{m.numero_serie}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => setEditingMotor(m)} className="text-blue-600"><Edit2 size={18}/></button>
                    <button onClick={() => handleDelete(m.id)} className="text-red-600"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingMotor && (
        <MotorEditModal 
          motor={editingMotor} 
          onClose={() => setEditingMotor(null)} 
          onSuccess={() => { setEditingMotor(null); fetchMotores(); }} 
        />
      )}
    </div>
  );
};

const MotorEditModal: React.FC<{ motor: any; onClose: () => void; onSuccess: () => void }> = ({ motor, onClose, onSuccess }) => {
  const [form, setForm] = useState(motor);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await supabase.from('motores').update(form).eq('id', motor.id);
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4"><h2 className="font-bold">Editar Motor</h2><button onClick={onClose}><X/></button></div>
        <div className="grid grid-cols-3 gap-4">
          <input className="border p-2 rounded" value={form.marca || ''} onChange={e => setForm({...form, marca: e.target.value})} placeholder="Marca" />
          <input className="border p-2 rounded" value={form.modelo || ''} onChange={e => setForm({...form, modelo: e.target.value})} placeholder="Modelo" />
          <input className="border p-2 rounded" value={form.potencia_hp || ''} onChange={e => setForm({...form, potencia_hp: e.target.value})} placeholder="HP" />
          <input className="border p-2 rounded" value={form.polos || ''} onChange={e => setForm({...form, polos: e.target.value})} placeholder="Polos" />
          <input className="border p-2 rounded" value={form.rpm || ''} onChange={e => setForm({...form, rpm: e.target.value})} placeholder="RPM" />
          <input className="border p-2 rounded" value={form.voltaje || ''} onChange={e => setForm({...form, voltaje: e.target.value})} placeholder="Voltaje" />
          <input className="border p-2 rounded" value={form.numero_serie || ''} onChange={e => setForm({...form, numero_serie: e.target.value})} placeholder="Nº Serie" />
          <input className="border p-2 rounded" value={form.ranuras || ''} onChange={e => setForm({...form, ranuras: e.target.value})} placeholder="Ranuras" />
          <input className="border p-2 rounded" value={form.tipo_motor || ''} onChange={e => setForm({...form, tipo_motor: e.target.value})} placeholder="Tipo" />
          <textarea className="border p-2 rounded col-span-3" value={form.comentarios || ''} onChange={e => setForm({...form, comentarios: e.target.value})} placeholder="Comentarios" />
        </div>
        <button onClick={handleSave} className="w-full mt-4 bg-blue-600 text-white py-2 rounded">{loading ? 'Guardando...' : 'Guardar'}</button>
      </div>
    </div>
  );
};