import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MotorForm } from '../components/MotorForm';
import { Plus, Loader2, Search, X, Edit2, Trash2 } from 'lucide-react';

export const Home: React.FC = () => {
  const [motores, setMotores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [motorAEditar, setMotorAEditar] = useState<any>(null);
  
  const [search, setSearch] = useState('');
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroConexion, setFiltroConexion] = useState('');
  const [filtroRpm, setFiltroRpm] = useState('');
  const [filtroHp, setFiltroHp] = useState('');

  const fetchMotores = async () => {
    setLoading(true);
    const { data } = await supabase.from('motores').select('*').order('created_at', { ascending: false });
    if (data) setMotores(data);
    setLoading(false);
  };

  useEffect(() => { fetchMotores(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que querés eliminar este motor?')) return;
    await supabase.from('motores').delete().eq('id', id);
    fetchMotores();
  };

  const limpiarFiltros = () => {
    setSearch(''); setFiltroMarca(''); setFiltroConexion(''); setFiltroRpm(''); setFiltroHp('');
  };

  const motoresFiltrados = motores.filter((m) => {
    const matchSearch = search === '' || m.marca?.toLowerCase().includes(search.toLowerCase()) || m.modelo?.toLowerCase().includes(search.toLowerCase());
    const matchMarca = filtroMarca === '' || m.marca === filtroMarca;
    const matchConexion = filtroConexion === '' || m.conexion === filtroConexion;
    const matchRpm = filtroRpm === '' || String(m.rpm) === filtroRpm;
    const matchHp = filtroHp === '' || String(m.potencia_hp) === filtroHp;
    return matchSearch && matchMarca && matchConexion && matchRpm && matchHp;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Banco de Motores</h1>
        <button onClick={() => { setMotorAEditar(null); setShowForm(!showForm); }} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> {showForm ? 'Cancelar' : 'Nuevo Motor'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6 border">
          <MotorForm 
            motor={motorAEditar} 
            onSuccess={() => { setShowForm(false); setMotorAEditar(null); fetchMotores(); }} 
            onClose={() => setShowForm(false)} 
          />
        </div>
      )}

      <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input placeholder="Buscar motor..." className="w-full pl-10 pr-4 py-2 border rounded" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button onClick={limpiarFiltros} className="bg-slate-200 px-4 py-2 rounded flex items-center gap-2 hover:bg-slate-300"><X size={18} /> Limpiar</button>
        </div>
      </div>

      {loading ? <Loader2 className="animate-spin mx-auto" /> : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="p-3">Marca</th><th className="p-3">Modelo</th><th className="p-3">HP</th><th className="p-3">RPM</th><th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {motoresFiltrados.map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-3">{m.marca}</td>
                  <td className="p-3">{m.modelo}</td>
                  <td className="p-3">{m.potencia_hp}</td>
                  <td className="p-3">{m.rpm}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => { setMotorAEditar(m); setShowForm(true); }} className="text-blue-600"><Edit2 size={18}/></button>
                    <button onClick={() => handleDelete(m.id)} className="text-red-600"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};