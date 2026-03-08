import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Clientes } from './pages/Clientes';
import { Reparaciones } from './pages/Reparaciones';
import { MotorPublico } from './pages/MotorPublico';
import { ReparacionPublica } from './pages/ReparacionPublica';
import { LoginForm } from './components/LoginForm';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  if (!session) return <LoginForm onLogin={() => {}} />;

  return (
    <HashRouter>
      <Routes>
        <Route path="/motor/:token" element={<MotorPublico />} />
        <Route path="/reparacion/:token" element={<ReparacionPublica />} />
        <Route path="*" element={
          <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/reparaciones" element={<Reparaciones />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;