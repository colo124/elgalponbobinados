import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Clientes } from './pages/Clientes';
import { Reparaciones } from './pages/Reparaciones';
import { HistorialCliente } from './pages/HistorialCliente';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/historial" element={<HistorialCliente />} />
            <Route path="/reparaciones" element={<Reparaciones />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;