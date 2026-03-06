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
    const { data, error } = await supabase.from('clientes').select('*').order('id', { ascending: false });
    if (error) console.error('Error fetching:', error);
    else setClientes(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchClientes(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar cliente?')) return;
    await supabase.from('clientes').delete().eq('id', id);
    fetchClientes();
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase.from('clientes').update(editForm).eq('id', id);
    if (error) alert('Error al actualizar: ' + error.message);
    else {
      setEditingId(null);
      fetchClientes();
    }
  };

  const clientesFiltrados = clientes.filter(c =>
    c.nombre_razon?.toLowerCase().includes(search.toLowerCase()) ||
    c.documento?.toLowerCase().includes(search.toLowerCase()) ||
    c.telefono?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
      <div className="p-4 border-b flex items-center gap-2 bg-slate-50">
        <Search size={18} className="text-slate-400" />
        <input 
          className="w-full bg-transparent outline-none text-sm"
          placeholder="Buscar por nombre, documento, teléfono o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-100 border-b">
          <tr>
            <th className="p-3">Cliente</th>
            <th className="p-3">Contacto</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {clientesFiltrados.length > 0 ? clientesFiltrados.map(c => (
            <React.Fragment key={c.id}>
              <tr className="hover:bg-slate-50">
                <td className="p-4 flex items-center gap-3">
                  <div className="bg-slate-200 p-2 rounded-full"><User size={18} className="text-slate-600"/></div>
                  <div>
                    <p className="font-bold">{c.nombre_razon}</p>
                    <p className="text-xs text-slate-500">Doc: {c.documento || '-'}</p>
                  </div>
                </td>
                <td className="p-4 text-slate-600">
                  <p>{c.telefono || '-'}</p>
                  <p className="text-xs">{c.email || '-'}</p>
                </td>
                <td className="p-4"><span className="px-2 py-1 rounded bg-slate-100 text-xs">{c.estado}</span></td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => { setEditingId(editingId === c.id ? null : c.id); setEditForm(c); }} className="text-blue-600"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-600"><Trash2 size={18}/></button>
                </td>
              </tr>
              {editingId === c.id && (
                <tr className="bg-slate-50">
                  <td colSpan={4} className="p-4 border-b">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <input className="border p-1 rounded" placeholder="Nombre" defaultValue={c.nombre_razon} onChange={e => setEditForm({...editForm, nombre_razon: e.target.value})} />
                      <input className="border p-1 rounded" placeholder="Documento" defaultValue={c.documento} onChange={e => setEditForm({...editForm, documento: e.target.value})} />
                      <input className="border p-1 rounded" placeholder="Teléfono" defaultValue={c.telefono} onChange={e => setEditForm({...editForm, telefono: e.target.value})} />
                      <input className="border p-1 rounded" placeholder="Email" defaultValue={c.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                      <input className="border p-1 rounded" placeholder="Domicilio" defaultValue={c.domicilio} onChange={e => setEditForm({...editForm, domicilio: e.target.value})} />
                      <input className="border p-1 rounded" placeholder="Contacto Alt." defaultValue={c.contacto_alternativo} onChange={e => setEditForm({...editForm, contacto_alternativo: e.target.value})} />
                      <select className="border p-1 rounded" defaultValue={c.estado} onChange={e => setEditForm({...editForm, estado: e.target.value})}>
                        <option>Activo</option><option>Inactivo</option><option>Moroso</option><option>VIP</option>
                      </select>
                      <input className="border p-1 rounded" placeholder="Notas" defaultValue={c.notas} onChange={e => setEditForm({...editForm, notas: e.target.value})} />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => handleUpdate(c.id)} className="bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-1"><Save size={16}/> Guardar</button>
                      <button onClick={() => setEditingId(null)} className="bg-slate-300 px-4 py-1 rounded flex items-center gap-1"><X size={16}/> Cancelar</button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          )) : <tr><td colSpan={4} className="p-6 text-center text-slate-500">No se encontraron clientes.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};