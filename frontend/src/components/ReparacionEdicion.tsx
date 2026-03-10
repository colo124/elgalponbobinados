import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X, Trash2, Plus, Loader2, Share2, Check, Upload, Search } from 'lucide-react';

export const ReparacionEdicion: React.FC<{ reparacion: any; onClose: () => void; onSuccess: () => void }> = ({ reparacion, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [motores, setMotores] = useState<any[]>([]);
  const [filtroMotor, setFiltroMotor] = useState('');
  const [motorSeleccionado, setMotorSeleccionado] = useState<any>(null);
  const [formData, setFormData] = useState({
    descripcion_motor: reparacion.descripcion_motor || '',
    estado: reparacion.estado || 'En espera',
    comentarios: typeof reparacion.comentarios === 'string' ? JSON.parse(reparacion.comentarios || '[]') : (reparacion.comentarios || [])
  });
  const [nuevoComentario, setNuevoComentario] = useState('');

  useEffect(() => {
    supabase.from('motores').select('*').then(({ data }) => { 
      if (data) {
        setMotores(data);
        if (reparacion.motor_id) setMotorSeleccionado(data.find(m => m.id === reparacion.motor_id));
      }
    });
  }, [reparacion.motor_id]);

  const motoresFiltrados = motores.filter(m => 
    m.marca?.toLowerCase().includes(filtroMotor.toLowerCase()) || 
    m.numero_serie?.includes(filtroMotor)
  );

  const publicUrl = `${window.location.origin}/#/reparacion/${reparacion.token_publico}`;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { data, error } = await supabase.storage.from('reparaciones').upload(`${Date.now()}_${file.name}`, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from('reparaciones').getPublicUrl(data!.path);
      setFormData({ ...formData, comentarios: [...formData.comentarios, { fecha: new Date().toLocaleString(), texto: 'Foto adjunta', foto: urlData.publicUrl }] });
    }
    setUploading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    await supabase.from('reparaciones').update({
      motor_id: motorSeleccionado?.id || null,
      descripcion_motor: formData.descripcion_motor,
      estado: formData.estado,
      comentarios: JSON.stringify(formData.comentarios)
    }).eq('id', reparacion.id);
    setLoading(false);
    onSuccess();
  };

  const handleDelete = async () => {
    if (!confirm('¿Eliminar esta reparación?')) return;
    await supabase.from('reparaciones').delete().eq('id', reparacion.id);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4"><h2 className="font-bold">Editar Reparación</h2><button onClick={onClose}><X/></button></div>
        
        <button onClick={() => { navigator.clipboard.writeText(publicUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="w-full mb-4 flex items-center justify-center gap-2 bg-slate-100 p-2 rounded text-sm hover:bg-slate-200">
          {copied ? <Check size={16} className="text-green-600"/> : <Share2 size={16}/>} {copied ? 'Link copiado!' : 'Compartir link público'}
        </button>

        <div className="space-y-4">
          {motorSeleccionado ? (
            <div className="p-3 border rounded bg-blue-50 text-xs space-y-1">
              <div className="flex justify-between font-bold text-sm mb-1">
                <span>{motorSeleccionado.marca} - {motorSeleccionado.modelo}</span>
                <button onClick={() => setMotorSeleccionado(null)} className="text-red-600"><X size={16}/></button>
              </div>
              <p>HP: {motorSeleccionado.potencia_hp} | Vueltas: {motorSeleccionado.vueltas}</p>
              <p>Alambre: {motorSeleccionado.alambre_seccion} | Conexión: {motorSeleccionado.conexion}</p>
              <p>Voltaje: {motorSeleccionado.voltaje} | Ranuras: {motorSeleccionado.ranuras}</p>
            </div>
          ) : (
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input placeholder="Buscar motor..." className="w-full pl-10 p-2 border rounded" value={filtroMotor} onChange={e => setFiltroMotor(e.target.value)} />
              {filtroMotor && (
                <div className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto shadow-lg">
                  {motoresFiltrados.map(m => (
                    <div key={m.id} className="p-2 hover:bg-blue-50 cursor-pointer text-xs border-b" onClick={() => { setMotorSeleccionado(m); setFiltroMotor(''); }}>
                      {m.marca} {m.modelo} ({m.numero_serie})
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <input className="w-full border p-2 rounded" value={formData.descripcion_motor} onChange={e => setFormData({...formData, descripcion_motor: e.target.value})} placeholder="Descripción adicional" />
          <select className="w-full border p-2 rounded" value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}><option>En espera</option><option>En proceso</option><option>Terminado</option></select>
          
          <div className="border p-3 rounded bg-slate-50">
            <h3 className="font-semibold mb-2 text-sm">Seguimiento</h3>
            {formData.comentarios.map((c: any, i: number) => (
              <div key={i} className="bg-white p-2 mb-2 rounded border text-sm shadow-sm">
                <p className="text-[10px] text-slate-400">{c.fecha}</p>
                <p>{c.texto}</p>
                {c.foto && <img src={c.foto} className="mt-2 max-h-32 rounded" />}
                <button onClick={() => setFormData({...formData, comentarios: formData.comentarios.filter((_:any, idx:number) => idx !== i)})} className="text-red-500 text-xs mt-2">Borrar comentario</button>
              </div>
            ))}
            <div className="space-y-2 mt-2">
              <input className="w-full border p-2 rounded text-sm" value={nuevoComentario} onChange={e => setNuevoComentario(e.target.value)} placeholder="Nuevo comentario..." />
              <div className="flex gap-2">
                <label className="cursor-pointer bg-slate-200 p-2 rounded"><Upload size={18}/><input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} /></label>
                <button onClick={() => { setFormData({...formData, comentarios: [...formData.comentarios, {fecha: new Date().toLocaleString(), texto: nuevoComentario}]}); setNuevoComentario(''); }} className="flex-1 bg-slate-800 text-white p-2 rounded"><Plus size={18}/></button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="flex-1 bg-blue-600 text-white py-2 rounded">{loading ? 'Guardando...' : 'Guardar'}</button>
            <button onClick={handleDelete} className="bg-red-100 text-red-600 px-4 py-2 rounded"><Trash2 size={18}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};