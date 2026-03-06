import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MotorForm } from '../components/MotorForm';
import { Plus, Loader2, Search, X } from 'lucide-react';

export const Home: React.FC = () => {
  const [motores, setMotores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Estados de filtrado
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

  const limpiarFiltros = () => {
    setSearch('');
    setFiltroMarca('');
    setFiltroConexion('');
    setFiltroRpm('');
    setFiltroHp('');
  };

  const hayFiltrosActivos = search !== '' || filtroMarca !== '' || filtroConexion !== '' || filtroRpm !== '' || filtroHp !== '';

  // Lógica de filtrado
  const motoresFiltrados = motores.filter((m) => {
    const matchSearch = search === '' || 
      m.marca?.toLowerCase().includes(search.toLowerCase()) || 
      m.modelo?.toLowerCase().includes(search.toLowerCase()) ||
      m.comentarios?.toLowerCase().includes(search.toLowerCase());
      
    const matchMarca = filtroMarca === '' || m.marca === filtroMarca;
    const matchConexion = filtroConexion === '' || m.conexion === filtroConexion;
    const matchRpm = filtroRpm === '' || String(m.rpm) === filtroRpm;
    const matchHp = filtroHp === '' || String(m.potencia_hp) === filtroHp;

    return matchSearch && matchMarca && matchConexion && matchRpm && matchHp;
  });

  const marcas = Array.from(new Set(motores.map(m => m.marca).filter(Boolean)));
  const conexiones = Array.from(new Set(motores.map(m => m.conexion).filter(Boolean)));
  const rpms = Array.from(new Set(motores.map(m => String(m.rpm)).filter(Boolean)));
  const hps = Array.from(new Set(motores.map(m => String(m.potencia_hp)).filter(Boolean)));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Banco de Motores</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} /> {showForm ? 'Cancelar' : 'Nuevo Motor'}
        </button>
      </div>

      {showForm && <MotorForm onSuccess={() => { setShowForm(false); fetchMotores(); }} onClose={() => setShowForm(false)} />}

      <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              placeholder="Buscar motor..." 
              className="w-full pl-10 pr-4 py-2 border rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {hayFiltrosActivos && (
            <button onClick={limpiarFiltros} className="bg-slate-200 px-4 py-2 rounded flex items-center gap-2 hover:bg-slate-300">
              <X size={18} /> Limpiar
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <select className="border p-2 rounded" value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
            <option value="">Todas las Marcas</option>
            {marcas.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select className="border p-2 rounded" value={filtroConexion} onChange={(e) => setFiltroConexion(e.target.value)}>
            <option value="">Cualquier Conexión</option>
            {conexiones.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="border p-2 rounded" value={filtroRpm} onChange={(e) => setFiltroRpm(e.target.value)}>
            <option value="">Cualquier RPM</option>
            {rpms.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select className="border p-2 rounded" value={filtroHp} onChange={(e) => setFiltroHp(e.target.value)}>
            <option value="">Cualquier HP</option>
            {hps.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="p-3">Marca</th>
                <th className="p-3">Modelo</th>
                <th className="p-3">HP</th>
                <th className="p-3">RPM</th>
                <th className="p-3">Conexión</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {motoresFiltrados.map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-3 font-medium">{m.marca}</td>
                  <td className="p-3">{m.modelo}</td>
                  <td className="p-3">{m.potencia_hp}</td>
                  <td className="p-3">{m.rpm}</td>
                  <td className="p-3">{m.conexion || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {motoresFiltrados.length === 0 && <p className="p-6 text-center text-slate-500">No se encontraron motores con esos filtros.</p>}
        </div>
      )}
    </div>
  );
};