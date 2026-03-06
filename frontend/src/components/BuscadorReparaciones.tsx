import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Trash2, Edit2 } from 'lucide-react';
import { ReparacionEdicion } from './ReparacionEdicion';

export const BuscadorReparaciones: React.FC = () => {
  const [reparaciones, setReparaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
      {loading ? (
        <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="p-3">Cliente</th>
              <th className="p-3">Motor</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reparaciones.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-3">{r.clientes?.nombre_razon || 'N/A'}</td>
                <td className="p-3">{r.descripcion_motor}</td>
                <td className="p-3">{r.estado}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => setEditingReparacion(r)} className="text-blue-600"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(r.id)} className="text-red-600"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingReparacion && (
        <ReparacionEdicion 
          reparacion={editingReparacion} 
          onClose={() => setEditingReparacion(null)} 
          onSuccess={() => { setEditingReparacion(null); fetchReparaciones(); }} 
        />
      )}
    </div>
  );
};