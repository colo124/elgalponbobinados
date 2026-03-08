import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export const ReparacionPublica: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [reparacion, setReparacion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReparacion = async () => {
      const { data } = await supabase.from('reparaciones').select('*, clientes(nombre_razon)').eq('token_publico', token).single();
      if (data) setReparacion(data);
      setLoading(false);
    };
    fetchReparacion();
  }, [token]);

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>;
  if (!reparacion) return <div className="p-10 text-center">Reparación no encontrada.</div>;

  const comentarios = typeof reparacion.comentarios === 'string' ? JSON.parse(reparacion.comentarios || '[]') : [];

  return (
    <div className="p-8 max-w-2xl mx-auto bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Seguimiento de Reparación</h1>
      <div className="bg-white p-6 rounded shadow">
        <p><strong>Cliente:</strong> {reparacion.clientes?.nombre_razon}</p>
        <p><strong>Motor:</strong> {reparacion.descripcion_motor}</p>
        <p><strong>Estado:</strong> <span className="font-bold text-blue-600">{reparacion.estado}</span></p>
        <h3 className="font-bold mt-6 mb-2">Historial</h3>
        {comentarios.map((c: any, i: number) => (
          <div key={i} className="border-b py-4 text-sm">
            <p className="text-xs text-slate-400">{c.fecha}</p>
            <p className="mt-1">{c.texto}</p>
            {c.foto && <img src={c.foto} alt="Evidencia" className="mt-3 max-h-64 rounded shadow-sm" />}
          </div>
        ))}
      </div>
    </div>
  );
};