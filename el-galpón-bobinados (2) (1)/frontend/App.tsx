import React, { useState, useMemo } from 'react';

interface MotorData {
  id: string;
  polos: string;
  brand: string;
  turns: number;
  wireGauge: string;
  paso: string;
  conexion: string;
  empresa: string;
  rpm: string;
  ranuras: string;
  comments: string;
  image?: string;
}

interface Client {
  id: string;
  name: string;
  doc: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
}

interface Job {
  id: string;
  clientId: string;
  motorModel: string;
  status: 'Recibido' | 'Desarmado' | 'Bobinado' | 'Armado' | 'Listo';
  comments: string;
  image?: string;
}

export default function App() {
  const [view, setView] = useState<'db' | 'clients' | 'tracking'>('db');
  const [motors, setMotors] = useState<MotorData[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  
  // State for forms
  const [isMotorFormOpen, setIsMotorFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const saveClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newClient: Client = {
      id: editingClient?.id || Date.now().toString(),
      name: formData.get('name') as string,
      doc: formData.get('doc') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      createdAt: editingClient?.createdAt || new Date().toLocaleDateString(),
    };
    setClients(editingClient ? clients.map(c => c.id === editingClient.id ? newClient : c) : [...clients, newClient]);
    setEditingClient(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex gap-6">
          <button onClick={() => setView('db')} className={view === 'db' ? 'font-bold underline' : ''}>Base Datos Motores</button>
          <button onClick={() => setView('clients')} className={view === 'clients' ? 'font-bold underline' : ''}>Clientes</button>
          <button onClick={() => setView('tracking')} className={view === 'tracking' ? 'font-bold underline' : ''}>Seguimiento</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {view === 'db' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Base de Datos de Motores</h2>
            <button onClick={() => setIsMotorFormOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Nuevo Motor</button>
            {/* Motor Table logic here */}
          </div>
        )}

        {view === 'clients' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Gestión de Clientes</h2>
            <div className="flex gap-4 mb-6">
              <button onClick={() => setEditingClient({ id: '', name: '', doc: '', address: '', phone: '', email: '', createdAt: '' })} className="bg-green-600 text-white px-4 py-2 rounded">+ Nuevo Cliente</button>
              <input placeholder="Buscar cliente..." className="flex-1 p-2 border rounded" onChange={e => setSearchTerm(e.target.value)} />
            </div>
            
            {editingClient && (
              <form onSubmit={saveClient} className="bg-blue-50 p-4 rounded mb-6 grid grid-cols-2 gap-4">
                <input name="name" defaultValue={editingClient.name} placeholder="Nombre o Razón Social" className="p-2 border rounded" required />
                <input name="doc" defaultValue={editingClient.doc} placeholder="CUIT/CUIL/DNI" className="p-2 border rounded" />
                <input name="address" defaultValue={editingClient.address} placeholder="Domicilio" className="p-2 border rounded" />
                <input name="phone" defaultValue={editingClient.phone} placeholder="Teléfono" className="p-2 border rounded" />
                <input name="email" defaultValue={editingClient.email} placeholder="Email" className="p-2 border rounded" />
                <div className="col-span-2 flex gap-2">
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Guardar</button>
                  <button type="button" onClick={() => setEditingClient(null)} className="bg-gray-400 text-white px-6 py-2 rounded">Cancelar</button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(c => (
                <div key={c.id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm text-gray-600">{c.doc} | {c.phone}</p>
                  </div>
                  <button onClick={() => setEditingClient(c)} className="text-blue-600">Editar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'tracking' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Seguimiento de Reparaciones</h2>
            <button onClick={() => { const cid = prompt("ID Cliente:"); if(cid) setJobs([...jobs, { id: Date.now().toString(), clientId: cid, motorModel: 'Motor', status: 'Recibido', comments: '' }]) }} className="bg-purple-600 text-white px-4 py-2 rounded mb-4">+ Asignar Motor</button>
            {jobs.map(j => (
              <div key={j.id} className="border p-4 rounded mb-2 flex justify-between items-center">
                <span>Cliente: {clients.find(c => c.id === j.clientId)?.name || 'Desconocido'} - {j.motorModel}</span>
                <select value={j.status} onChange={e => { setJobs(jobs.map(x => x.id === j.id ? {...x, status: e.target.value as any} : x)); alert(`Notificación enviada: Estado actualizado a ${e.target.value}`); }} className="border p-2 rounded">
                  {['Recibido', 'Desarmado', 'Bobinado', 'Armado', 'Listo'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}