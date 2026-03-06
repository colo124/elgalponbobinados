import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X, MessageCircle, Phone, Trash2, Plus, Loader2, Upload } from 'lucide-react';

interface ReparacionEdicionProps {
  reparacion: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReparacionEdicion: React.FC<ReparacionEdicionProps> = ({ reparacion, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    descripcion_motor: reparacion.descripcion_motor || '',
    estado: reparacion.estado || 'En espera',
    comentarios: typeof reparacion.comentarios === 'string' ? JSON.parse(reparacion.comentarios || '[]') : (reparacion.comentarios || [])
  });
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${reparacion.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('reparaciones')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error al subir foto: ' + uploadError.message);
    } else {
      const { data } = supabase.storage.from('reparaciones').getPublicUrl(filePath);
      const nuevo = { fecha: new Date().toLocaleString(), texto: 'Foto adjunta', foto: data.publicUrl };
      setFormData({ ...formData, comentarios: [...formData.comentarios, nuevo] });
    }
    setUploading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase.from('reparaciones').update({
      descripcion_motor: formData.descripcion_motor,
      estado: formData.estado,
      comentarios: JSON.stringify(formData.comentarios)
    }).eq('id', reparacion.id);
    
    setLoading(false);
    if (error) alert('Error al actualizar: ' + error.message);
    else { alert('Actualizado'); onSuccess(); }
  };

  const agregarComentario = () => {
    if (!nuevoComentario.trim()) return;
    const nuevo = { fecha: new Date().toLocaleString(), texto: nuevoComentario };
    setFormData({ ...formData, comentarios: [...formData.comentarios, nuevo] });
    setNuevoComentario('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Detalle Reparación</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700"><X size={20}/></button>
        </div>
        
        <div className="space-y-4">
          <input className="w-full border p-2 rounded" value={formData.descripcion_motor} onChange={e => setFormData({...formData, descripcion_motor: e.target.value})} />
          
          <select className="w-full border p-2 rounded" value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
            <option>En espera</option><option>En proceso</option><option>Terminado</option>
          </select>

          <div className="border p-3 rounded bg-slate-50">
            <h3 className="font-semibold mb-2 text-sm">Seguimiento</h3>
            {formData.comentarios.map((c: any, i: number) => (
              <div key={i} className="bg-white p-2 mb-2 rounded border text-sm shadow-sm">
                <p className="text-[10px] text-slate-400">{c.fecha}</p>
                <p className="text-slate-700">{c.texto}</p>
                {c.foto && <img src={c.foto} alt="Evidencia" className="mt-2 max-h-32 rounded border" />}
                <div className="flex gap-3 mt-2 pt-2 border-t">
                  <a href={`https://wa.me/${reparacion.clientes?.telefono}?text=${encodeURIComponent(c.texto)}`} target="_blank" className="text-green-600 text-xs font-bold flex items-center gap-1"><Phone size={14}/> WA</a>
                  <button onClick={() => setFormData({...formData, comentarios: formData.comentarios.filter((_:any, idx:number) => idx !== i)})} className="text-red-500 ml-auto"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
            <div className="space-y-2 mt-2">
              <input className="w-full border p-2 rounded text-sm" value={nuevoComentario} onChange={e => setNuevoComentario(e.target.value)} placeholder="Nuevo comentario..." />
              <div className="flex gap-2">
                <label className="cursor-pointer bg-slate-200 p-2 rounded hover:bg-slate-300">
                  {uploading ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18}/>}
                  <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>
                <button onClick={agregarComentario} className="flex-1 bg-slate-800 text-white p-2 rounded"><Plus size={18}/></button>
              </div>
            </div>
          </div>

          <button disabled={loading} onClick={handleUpdate} className="w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center gap-2 hover:bg-blue-700">
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};