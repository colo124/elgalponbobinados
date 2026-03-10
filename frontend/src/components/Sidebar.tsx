import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Wrench, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Motores', icon: LayoutDashboard },
    { path: '/clientes', label: 'Clientes', icon: Users },
    { path: '/reparaciones', label: 'Reparaciones', icon: Wrench },
  ];

  return (
    <div className="w-64 bg-slate-800 text-slate-100 h-screen flex flex-col shadow-xl">
      <div className="p-6 text-2xl font-black tracking-tighter text-orange-500 border-b border-slate-700">
        GINO <span className="text-white">BOBINADOS</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-orange-600 text-white shadow-lg' : 'hover:bg-slate-700 text-slate-300'}`}>
              <Icon size={20} /> {item.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={() => supabase.auth.signOut()} className="p-4 flex items-center gap-3 text-slate-400 hover:text-orange-400 transition-colors">
        <LogOut size={20} /> Salir
      </button>
    </div>
  );
};