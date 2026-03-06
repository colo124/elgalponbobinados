import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Wrench, History, Menu, X } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Banco de Motores', icon: LayoutDashboard },
    { path: '/clientes', label: 'Clientes', icon: Users },
    { path: '/clientes/historial', label: 'Historial Cliente', icon: History },
    { path: '/reparaciones', label: 'Reparaciones', icon: Wrench },
  ];

  return (
    <>
      {/* Botón Hamburguesa (solo visible en mobile) */}
      <div className="md:hidden p-4 bg-slate-900 text-white flex items-center justify-between">
        <span className="font-bold">Taller Pro</span>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 text-xl font-bold border-b border-slate-800 hidden md:block">Taller Pro</div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
                <Icon size={20} /> {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Overlay móvil */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};