import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export const MotorPublico: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [motor, setMotor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotor = async () => {
      const { data } = await supabase.from('motores').select('*').eq('token_publico', token).single();
      if (data) setMotor(data);
      setLoading(false);
    };
    fetchMotor();
  }, [token]);

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>;
  if (!motor) return <div className="p-10 text-center">Motor no encontrado.</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{motor.marca} {motor.modelo}</h1>
      <div className="bg-white p-6 rounded shadow">
        <p><strong>Estado:</strong> {motor.estado_actual || 'En taller'}</p>
        <p><strong>Nº Serie:</strong> {motor.numero_serie}</p>
        <h3 className="font-bold mt-6 mb-2">Historial</h3>
        <p className="text-slate-600">{motor.comentarios || 'Sin observaciones'}</p>
      </div>
    </div>
  );
};