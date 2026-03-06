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
        {/* El padding-left de 64 (256px) solo aplica en desktop para dejar espacio al sidebar */}
        <main className="flex-1 w-full md:pl-64 min-h-screen">
          <div className="max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/historial" element={<HistorialCliente />} />
              <Route path="/reparaciones" element={<Reparaciones />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;