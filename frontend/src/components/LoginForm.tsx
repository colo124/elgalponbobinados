import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Acceso al Taller</h2>
        <input type="email" placeholder="Email" className="w-full border p-2 mb-4 rounded" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" className="w-full border p-2 mb-4 rounded" onChange={e => setPassword(e.target.value)} />
        <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Entrando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};