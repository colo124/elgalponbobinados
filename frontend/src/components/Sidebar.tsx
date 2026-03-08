import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Wrench, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Banco de Motores', icon: LayoutDashboard },
    { path: '/clientes', label: 'Clientes', icon: Users },
    { path: '/reparaciones', label: 'Reparaciones', icon: Wrench },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-slate-800">Taller Pro</div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
              <Icon size={20} /> {item.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={() => supabase.auth.signOut()} className="p-4 flex items-center gap-3 text-red-400 hover:bg-slate-800">
        <LogOut size={20} /> Cerrar Sesión
      </button>
    </div>
  );
};