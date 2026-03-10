import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Trash2, Edit2, Search } from 'lucide-react';
import { ReparacionEdicion } from './ReparacionEdicion';

export const BuscadorReparaciones: React.FC = () => {
  const [reparaciones, setReparaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [editingReparacion, setEditingReparacion] = useState<any>(null);

  const fetchReparaciones = async () => {
    setLoading(true);
    const { data } = await supabase.from('reparaciones').select('*, clientes(nombre_razon, telefono, email)').order('created_at', { ascending: false });
    if (data) setReparaciones(data);
    setLoading(false);
  };

  useEffect(() => { fetchReparaciones(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta reparación?')) return;
    await supabase.from('reparaciones').delete().eq('id', id);
    fetchReparaciones();
  };

  const filtered = reparaciones.filter(r => r.clientes?.nombre_razon.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        <input placeholder="Filtrar por cliente..." className="w-full pl-10 p-2 border rounded" onChange={e => setFiltro(e.target.value)} />
      </div>
      {loading ? <Loader2 className="animate-spin mx-auto" /> : (
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3">Cliente</th>
              <th className="p-3">Motor</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(r => (
              <tr key={r.id}>
                <td className="p-3">{r.clientes?.nombre_razon}</td>
                <td className="p-3">{r.descripcion_motor}</td>
                <td className="p-3">{r.estado}</td>
                <td className="p-3">{r.created_at ? new Date(r.created_at).toLocaleDateString() : '-'}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => setEditingReparacion(r)} className="text-blue-600"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(r.id)} className="text-red-600"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingReparacion && <ReparacionEdicion reparacion={editingReparacion} onClose={() => setEditingReparacion(null)} onSuccess={() => { setEditingReparacion(null); fetchReparaciones(); }} />}
    </div>
  );
};