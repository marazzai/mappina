"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";

const categories = [
  "Musica",
  "Cibo",
  "Arte",
  "Sport",
  "Altro",
];

export default function CreaEventoPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location_text: "",
    price_text: "",
    category: "Musica",
  });
  const [image16_9, setImage16_9] = useState<File | null>(null);
  const [image1_1, setImage1_1] = useState<Blob | null>(null);
  const [preview16_9, setPreview16_9] = useState<string | null>(null);
  const [preview1_1, setPreview1_1] = useState<string | null>(null);

  const ImageUploader = dynamic(() => import("@/components/ImageUploader"), { ssr: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/login");
      else setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    let image_url = null;
    let image_url_square = null;
    if (image16_9 && image1_1) {
      // Upload 16:9
      const { data: up1, error: err1 } = await supabase.storage.from("event-images").upload(`16_9/${Date.now()}_${image16_9.name}`, image16_9, { upsert: true });
      // Upload 1:1
      const { data: up2, error: err2 } = await supabase.storage.from("event-images").upload(`1_1/${Date.now()}_square.jpg`, image1_1, { upsert: true, contentType: "image/jpeg" });
      if (err1 || err2) {
        setError("Errore upload immagini");
        return;
      }
      image_url = up1?.path ? supabase.storage.from("event-images").getPublicUrl(up1.path).data.publicUrl : null;
      image_url_square = up2?.path ? supabase.storage.from("event-images").getPublicUrl(up2.path).data.publicUrl : null;
    }
    const { error } = await supabase.from("events").insert([
      {
        ...form,
        organizer_id: user.id,
        date: form.date ? new Date(form.date).toISOString() : null,
        image_url,
        image_url_square,
      },
    ]);
    if (error) setError(error.message);
    else {
      setSuccess(true);
      setForm({ title: "", description: "", date: "", location_text: "", price_text: "", category: "Musica" });
      setImage16_9(null);
      setImage1_1(null);
      setPreview16_9(null);
      setPreview1_1(null);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Caricamento...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-lg flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">Crea un nuovo evento</h1>
        <input type="text" required placeholder="Titolo" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input input-bordered" />
        <textarea required placeholder="Descrizione" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input input-bordered" />
        <input type="datetime-local" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input input-bordered" />
        <input type="text" required placeholder="Luogo" value={form.location_text} onChange={e => setForm(f => ({ ...f, location_text: e.target.value }))} className="input input-bordered" />
        <input type="text" required placeholder="Prezzo (es. Gratuito, Da 10€)" value={form.price_text} onChange={e => setForm(f => ({ ...f, price_text: e.target.value }))} className="input input-bordered" />
        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input input-bordered">
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
        {/* Upload immagini */}
        <div>
          <div className="font-medium mb-1">Immagine 16:9 + Ritaglio 1:1</div>
          <ImageUploader
            onImagesReady={(original, cropped) => {
              setImage16_9(original);
              setImage1_1(cropped);
              setPreview16_9(URL.createObjectURL(original));
              setPreview1_1(URL.createObjectURL(cropped));
            }}
          />
          <div className="flex gap-4 mt-2">
            {preview16_9 && <img src={preview16_9} alt="16:9" className="w-32 h-20 object-cover rounded border" />}
            {preview1_1 && <img src={preview1_1} alt="1:1" className="w-20 h-20 object-cover rounded border" />}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Evento creato con successo!</div>}
        <button type="submit" className="btn bg-brand text-white hover:bg-brand-dark">Crea Evento</button>
      </form>
    </div>
  );
}
