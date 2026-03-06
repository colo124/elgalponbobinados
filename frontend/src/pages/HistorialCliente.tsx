import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, AlertCircle } from 'lucide-react';

export const HistorialCliente: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    supabase.from('clientes').select('id, nombre_razon').then(({ data }) => setClientes(data || []));
  }, []);

  const fetchHistorial = async (clienteId: string) => {
    if (!clienteId) { setData([]); setHasSearched(false); return; }
    setLoading(true); setHasSearched(true);
    const { data: reparaciones } = await supabase.from('reparaciones').select('*').eq('cliente_id', clienteId);
    const { data: motores } = await supabase.from('motores').select('*');
    const historial = (reparaciones || []).map(r => ({ ...r, motor_info: motores?.find(m => String(m.id) === String(r.motor_id)) }));
    setData(historial);
    setLoading(false);
  };

  const totalFacturado = data.reduce((acc, curr) => acc + (Number(curr.precio) || 0), 0);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Historial de Cliente</h1>
      <select className="w-full p-3 border rounded mb-6" onChange={(e) => fetchHistorial(e.target.value)}>
        <option value="">Seleccione un cliente...</option>
        {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre_razon}</option>)}
      </select>

      {loading ? <Loader2 className="animate-spin mx-auto" /> : hasSearched && (
        data.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                <p className="text-sm text-slate-500">Total Facturado</p>
                <p className="text-xl font-bold">$ {totalFacturado.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">
                <p className="text-sm text-slate-500">Reparaciones</p>
                <p className="text-xl font-bold">{data.length}</p>
              </div>
              <div className="bg-white p-4 rounded shadow border-l-4 border-orange-500">
                <p className="text-sm text-slate-500">Promedio</p>
                <p className="text-xl font-bold">$ {(totalFacturado / (data.length || 1)).toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded overflow-x-auto">
              <table className="w-full text-sm min-w-[400px]">
                <thead className="bg-slate-100"><tr><th className="p-3">Motor</th><th className="p-3">Estado</th><th className="p-3">Precio</th></tr></thead>
                <tbody>
                  {data.map(r => (
                    <tr key={r.id} className="border-t"><td className="p-3">{r.motor_info ? `${r.motor_info.marca} ${r.motor_info.modelo}` : r.descripcion_motor}</td><td className="p-3">{r.estado}</td><td className="p-3">$ {r.precio || 0}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded shadow text-center"><AlertCircle className="mx-auto mb-2" /> Sin registros.</div>
        )
      )}
    </div>
  );
};