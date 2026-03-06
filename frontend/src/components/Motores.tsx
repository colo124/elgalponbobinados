import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Trash2, Edit2, X, Save } from 'lucide-react';

export const Motores: React.FC = () => {
  const [motores, setMotores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

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

  const handleUpdate = async (id: string) => {
    const toNum = (val: any) => (val === '' || val === null ? null : Number(val));
    const payload = {
      ...editForm,
      potencia_hp: toNum(editForm.potencia_hp),
      polos: toNum(editForm.polos),
      rpm: toNum(editForm.rpm)
    };
    const { error } = await supabase.from('motores').update(payload).eq('id', id);
    if (error) alert('Error: ' + error.message);
    else { setEditingId(null); fetchMotores(); }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
      {loading ? (
        <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="p-3">Marca</th>
              <th className="p-3">Modelo</th>
              <th className="p-3">HP</th>
              <th className="p-3">RPM</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {motores.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="p-3">
                  {editingId === m.id ? <input className="border p-1 w-full" defaultValue={m.marca} onChange={e => setEditForm({...editForm, marca: e.target.value})} /> : m.marca}
                </td>
                <td className="p-3">
                  {editingId === m.id ? <input className="border p-1 w-full" defaultValue={m.modelo} onChange={e => setEditForm({...editForm, modelo: e.target.value})} /> : m.modelo}
                </td>
                <td className="p-3">
                  {editingId === m.id ? <input type="number" className="border p-1 w-full" defaultValue={m.potencia_hp} onChange={e => setEditForm({...editForm, potencia_hp: e.target.value})} /> : m.potencia_hp}
                </td>
                <td className="p-3">
                  {editingId === m.id ? <input type="number" className="border p-1 w-full" defaultValue={m.rpm} onChange={e => setEditForm({...editForm, rpm: e.target.value})} /> : m.rpm}
                </td>
                <td className="p-3 flex gap-2">
                  {editingId === m.id ? (
                    <>
                      <button onClick={() => handleUpdate(m.id)} className="text-blue-600"><Save size={18}/></button>
                      <button onClick={() => setEditingId(null)} className="text-slate-600"><X size={18}/></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditingId(m.id); setEditForm(m); }} className="text-blue-600"><Edit2 size={18}/></button>
                      <button onClick={() => handleDelete(m.id)} className="text-red-600"><Trash2 size={18}/></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};