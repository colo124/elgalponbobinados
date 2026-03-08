import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Trash2, Edit2, Save, X, Search } from 'lucide-react';

export const BuscadorClientes: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const fetchClientes = async () => {
    setLoading(true);
    const { data } = await supabase.from('clientes').select('*').order('created_at', { ascending: false });
    if (data) setClientes(data);
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

  const filtered = clientes.filter(c => 
    c.nombre_razon?.toLowerCase().includes(filtro.toLowerCase()) || 
    c.documento?.includes(filtro)
  );

  const inputClass = "border p-1 w-full text-xs";

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6 overflow-x-auto">
      <div className="relative mb-4"><Search className="absolute left-3 top-2.5 text-slate-400" size={18} /><input placeholder="Buscar por nombre o documento..." className="w-full pl-10 p-2 border rounded" onChange={e => setFiltro(e.target.value)} /></div>
      {loading ? <Loader2 className="animate-spin mx-auto" /> : (
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="p-2">Nombre</th><th className="p-2">Doc</th><th className="p-2">Tel</th>
              <th className="p-2">Email</th><th className="p-2">Domicilio</th><th className="p-2">Notas</th><th className="p-2">Estado</th><th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(c => (
              <tr key={c.id}>
                <td className="p-2">{editingId === c.id ? <input className={inputClass} defaultValue={c.nombre_razon} onChange={e => setEditForm({...editForm, nombre_razon: e.target.value})} /> : c.nombre_razon}</td>
                <td className="p-2">{editingId === c.id ? <input className={inputClass} defaultValue={c.documento} onChange={e => setEditForm({...editForm, documento: e.target.value})} /> : c.documento}</td>
                <td className="p-2">{editingId === c.id ? <input className={inputClass} defaultValue={c.telefono} onChange={e => setEditForm({...editForm, telefono: e.target.value})} /> : c.telefono}</td>
                <td className="p-2">{editingId === c.id ? <input className={inputClass} defaultValue={c.email} onChange={e => setEditForm({...editForm, email: e.target.value})} /> : c.email}</td>
                <td className="p-2">{editingId === c.id ? <input className={inputClass} defaultValue={c.domicilio} onChange={e => setEditForm({...editForm, domicilio: e.target.value})} /> : c.domicilio}</td>
                <td className="p-2">{editingId === c.id ? <input className={inputClass} defaultValue={c.notas} onChange={e => setEditForm({...editForm, notas: e.target.value})} /> : c.notas}</td>
                <td className="p-2">{editingId === c.id ? <select className={inputClass} defaultValue={c.estado} onChange={e => setEditForm({...editForm, estado: e.target.value})}><option>Activo</option><option>Inactivo</option><option>Moroso</option><option>VIP</option></select> : c.estado}</td>
                <td className="p-2 flex gap-2">
                  {editingId === c.id ? (
                    <><button onClick={() => handleUpdate(c.id)} className="text-blue-600"><Save size={16}/></button><button onClick={() => setEditingId(null)}><X size={16}/></button></>
                  ) : (
                    <><button onClick={() => { setEditingId(c.id); setEditForm(c); }} className="text-blue-600"><Edit2 size={16}/></button><button onClick={() => handleDelete(c.id)} className="text-red-600"><Trash2 size={16}/></button></>
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