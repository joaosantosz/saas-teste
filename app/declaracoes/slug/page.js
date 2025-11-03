"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function Declaracao({ params }) {
  const { slug } = params;
  const [declaracao, setDeclaracao] = useState(null);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from("declaracoes")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error) setDeclaracao(data);
    }
    carregar();
  }, [slug]);

  if (!declaracao) return <p style={{ textAlign: "center" }}>Carregando...</p>;

  const videoEmbed = declaracao.video_url
    ? declaracao.video_url.replace("watch?v=", "embed/")
    : null;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>{declaracao.titulo}</h1>
      <p>{declaracao.mensagem}</p>
      {declaracao.imagem_url && <img src={declaracao.imagem_url} alt="Imagem" style={{ maxWidth: "100%", borderRadius: 10 }} />}
      {videoEmbed && <iframe src={videoEmbed} width="100%" height="315" style={{ borderRadius: 10, marginTop: 10 }} allowFullScreen />}
    </div>
  );
}
