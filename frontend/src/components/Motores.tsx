import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Trash2, Edit2, Search, X } from 'lucide-react';

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
    m.numero_serie?.includes(filtro)
  );

  return (
    <div className="mt-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        <input placeholder="Buscar por marca o serie..." className="w-full pl-10 p-2 border rounded" onChange={e => setFiltro(e.target.value)} />
      </div>
      
      {loading ? <Loader2 className="animate-spin mx-auto" /> : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="p-2">Marca</th><th className="p-2">HP</th><th className="p-2">Polos</th>
                <th className="p-2">RPM</th><th className="p-2">Vueltas</th><th className="p-2">Conexión</th>
                <th className="p-2">Ranuras</th><th className="p-2">Alambre</th><th className="p-2">Voltaje</th><th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-2">{m.marca}</td>
                  <td className="p-2">{m.potencia_hp}</td>
                  <td className="p-2">{m.polos}</td>
                  <td className="p-2">{m.rpm}</td>
                  <td className="p-2">{m.vueltas}</td>
                  <td className="p-2">{m.conexion}</td>
                  <td className="p-2">{m.ranuras}</td>
                  <td className="p-2">{m.alambre_seccion}</td>
                  <td className="p-2">{m.voltaje}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => setEditingMotor(m)} className="text-blue-600"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(m.id)} className="text-red-600"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingMotor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4"><h2 className="font-bold">Editar Motor</h2><button onClick={() => setEditingMotor(null)}><X/></button></div>
            <div className="grid grid-cols-3 gap-4">
              <input className="border p-2 rounded" value={editingMotor.marca || ''} onChange={e => setEditingMotor({...editingMotor, marca: e.target.value})} placeholder="Marca" />
              <input className="border p-2 rounded" value={editingMotor.potencia_hp || ''} onChange={e => setEditingMotor({...editingMotor, potencia_hp: e.target.value})} placeholder="HP" />
              <input className="border p-2 rounded" value={editingMotor.polos || ''} onChange={e => setEditingMotor({...editingMotor, polos: e.target.value})} placeholder="Polos" />
              <input className="border p-2 rounded" value={editingMotor.rpm || ''} onChange={e => setEditingMotor({...editingMotor, rpm: e.target.value})} placeholder="RPM" />
              <input className="border p-2 rounded" value={editingMotor.vueltas || ''} onChange={e => setEditingMotor({...editingMotor, vueltas: e.target.value})} placeholder="Vueltas" />
              <input className="border p-2 rounded" value={editingMotor.conexion || ''} onChange={e => setEditingMotor({...editingMotor, conexion: e.target.value})} placeholder="Conexión" />
              <input className="border p-2 rounded" value={editingMotor.ranuras || ''} onChange={e => setEditingMotor({...editingMotor, ranuras: e.target.value})} placeholder="Ranuras" />
              <input className="border p-2 rounded" value={editingMotor.alambre_seccion || ''} onChange={e => setEditingMotor({...editingMotor, alambre_seccion: e.target.value})} placeholder="Alambre" />
              <input className="border p-2 rounded" value={editingMotor.voltaje || ''} onChange={e => setEditingMotor({...editingMotor, voltaje: e.target.value})} placeholder="Voltaje" />
              <textarea className="border p-2 rounded col-span-3" value={editingMotor.comentarios || ''} onChange={e => setEditingMotor({...editingMotor, comentarios: e.target.value})} placeholder="Comentarios" />
            </div>
            <button onClick={async () => { 
              await supabase.from('motores').update(editingMotor).eq('id', editingMotor.id); 
              setEditingMotor(null); 
              fetchMotores(); 
            }} className="w-full mt-4 bg-blue-600 text-white py-2 rounded">Guardar Cambios</button>
          </div>
        </div>
      )}
    </div>
  );
};