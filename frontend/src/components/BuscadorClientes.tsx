import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Trash2, Edit2, Save, X, User, Search } from 'lucide-react';

export const BuscadorClientes: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [search, setSearch] = useState('');

  const fetchClientes = async () => {
    setLoading(true);
    const { data } = await supabase.from('clientes').select('*').order('id', { ascending: false });
    setClientes(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchClientes(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar cliente?')) return;
    await supabase.from('clientes').delete().eq('id', id);
    fetchClientes();
  };

  const handleUpdate = async (id: string) => {
    await supabase.from('clientes').update(editForm).eq('id', id);
    setEditingId(null);
    fetchClientes();
  };

  const clientesFiltrados = clientes.filter(c =>
    c.nombre_razon?.toLowerCase().includes(search.toLowerCase()) ||
    c.documento?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-6 w-full">
      <div className="p-4 border-b flex items-center gap-2 bg-slate-50">
        <Search size={18} className="text-slate-400" />
        <input className="w-full bg-transparent outline-none text-sm" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[500px]">
          <thead className="bg-slate-100 border-b">
            <tr><th className="p-3">Cliente</th><th className="p-3">Contacto</th><th className="p-3">Acciones</th></tr>
          </thead>
          <tbody className="divide-y">
            {clientesFiltrados.map(c => (
              <React.Fragment key={c.id}>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold">{c.nombre_razon}</td>
                  <td className="p-4 text-slate-600">{c.telefono}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => { setEditingId(editingId === c.id ? null : c.id); setEditForm(c); }} className="p-2 text-blue-600"><Edit2 size={20}/></button>
                    <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600"><Trash2 size={20}/></button>
                  </td>
                </tr>
                {editingId === c.id && (
                  <tr className="bg-slate-50"><td colSpan={3} className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-2"><input className="border p-2 rounded" defaultValue={c.nombre_razon} onChange={e => setEditForm({...editForm, nombre_razon: e.target.value})} /><input className="border p-2 rounded" defaultValue={c.telefono} onChange={e => setEditForm({...editForm, telefono: e.target.value})} /><button onClick={() => handleUpdate(c.id)} className="bg-blue-600 text-white p-2 rounded">Guardar</button></div></td></tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};