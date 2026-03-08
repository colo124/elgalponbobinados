import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X, MessageCircle, Phone, Trash2, Plus, Loader2, Share2, Check, Upload } from 'lucide-react';

interface ReparacionEdicionProps {
  reparacion: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReparacionEdicion: React.FC<ReparacionEdicionProps> = ({ reparacion, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    descripcion_motor: reparacion.descripcion_motor || '',
    estado: reparacion.estado || 'En espera',
    comentarios: typeof reparacion.comentarios === 'string' ? JSON.parse(reparacion.comentarios || '[]') : (reparacion.comentarios || [])
  });
  const [nuevoComentario, setNuevoComentario] = useState('');

  const publicUrl = `${window.location.origin}/#/reparacion/${reparacion.token_publico}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from('reparaciones').upload(fileName, file);
    if (error) { alert('Error subiendo foto'); }
    else {
      const { data: urlData } = supabase.storage.from('reparaciones').getPublicUrl(fileName);
      const nuevo = { fecha: new Date().toLocaleString(), texto: 'Foto adjunta', foto: urlData.publicUrl };
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
    if (error) alert('Error: ' + error.message);
    else { alert('Actualizado'); onSuccess(); }
  };

  const handleDelete = async () => {
    if (!confirm('¿Eliminar esta reparación?')) return;
    await supabase.from('reparaciones').delete().eq('id', reparacion.id);
    onSuccess();
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
          <h2 className="text-lg font-bold">Editar Reparación</h2>
          <button onClick={onClose}><X size={20}/></button>
        </div>
        
        <button onClick={copyToClipboard} className="w-full mb-4 flex items-center justify-center gap-2 bg-slate-100 p-2 rounded text-sm hover:bg-slate-200">
          {copied ? <Check size={16} className="text-green-600"/> : <Share2 size={16}/>}
          {copied ? 'Link copiado!' : 'Compartir link público'}
        </button>

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
                <p>{c.texto}</p>
                {c.foto && <img src={c.foto} className="mt-2 max-h-32 rounded" />}
                <div className="flex gap-3 mt-2 pt-2 border-t">
                  <a href={`https://wa.me/${reparacion.clientes?.telefono}?text=${encodeURIComponent(c.texto)}`} target="_blank" className="text-green-600 flex items-center gap-1 text-xs font-bold"><Phone size={14}/> WhatsApp</a>
                  <a href={`mailto:${reparacion.clientes?.email}?subject=Actualización&body=${encodeURIComponent(c.texto)}`} className="text-blue-600 flex items-center gap-1 text-xs font-bold"><MessageCircle size={14}/> Email</a>
                  <button onClick={() => setFormData({...formData, comentarios: formData.comentarios.filter((_:any, idx:number) => idx !== i)})} className="text-red-500 ml-auto"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
            <div className="space-y-2 mt-2">
              <input className="w-full border p-2 rounded text-sm" value={nuevoComentario} onChange={e => setNuevoComentario(e.target.value)} placeholder="Nuevo comentario..." />
              <div className="flex gap-2">
                <label className="cursor-pointer bg-slate-200 p-2 rounded hover:bg-slate-300">
                  <Upload size={18}/>
                  <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                </label>
                <button onClick={agregarComentario} className="flex-1 bg-slate-800 text-white p-2 rounded"><Plus size={18}/></button>
              </div>
              {uploading && <p className="text-xs text-blue-600">Subiendo foto...</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <button disabled={loading} onClick={handleUpdate} className="flex-1 bg-blue-600 text-white py-2 rounded">{loading ? <Loader2 className="animate-spin mx-auto"/> : 'Guardar'}</button>
            <button onClick={handleDelete} className="bg-red-100 text-red-600 px-4 py-2 rounded"><Trash2 size={18}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};