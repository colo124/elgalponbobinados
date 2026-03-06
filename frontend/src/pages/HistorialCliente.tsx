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
    if (!clienteId) {
      setData([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);

    // 1. Traer reparaciones del cliente
    const { data: reparaciones } = await supabase
      .from('reparaciones')
      .select('*')
      .eq('cliente_id', clienteId);

    // 2. Traer todos los motores
    const { data: motores } = await supabase.from('motores').select('*');

    // 3. Unir datos comparando IDs como strings para evitar errores de tipo
    const historialConMotores = (reparaciones || []).map(r => {
      const motorEncontrado = motores?.find(m => String(m.id) === String(r.motor_id));
      return {
        ...r,
        motor_info: motorEncontrado || null
      };
    });

    setData(historialConMotores);
    setLoading(false);
  };

  const totalFacturado = data.reduce((acc, curr) => acc + (Number(curr.precio) || 0), 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Historial de Cliente</h1>
      <select className="w-full p-3 border rounded mb-6" onChange={(e) => fetchHistorial(e.target.value)}>
        <option value="">Seleccione un cliente...</option>
        {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre_razon}</option>)}
      </select>

      {loading ? (
        <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
      ) : hasSearched && (
        data.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
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

            <div className="bg-white shadow rounded overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-100"><tr><th className="p-3">Motor</th><th className="p-3">Estado</th><th className="p-3">Precio</th></tr></thead>
                <tbody>
                  {data.map(r => (
                    <tr key={r.id} className="border-t">
                      <td className="p-3">
                        {r.motor_info ? `${r.motor_info.marca || ''} ${r.motor_info.modelo || ''}`.trim() : (r.descripcion_motor || 'N/A')}
                      </td>
                      <td className="p-3">{r.estado}</td>
                      <td className="p-3">$ {r.precio || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded shadow border border-slate-200 text-center">
            <AlertCircle className="mx-auto text-slate-400 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-700">Sin registros</h3>
            <p className="text-slate-500">Este cliente no tiene reparaciones registradas por el momento.</p>
          </div>
        )
      )}
    </div>
  );
};