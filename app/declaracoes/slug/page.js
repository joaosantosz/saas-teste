"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function Declaracao() {
  const params = useParams();
  const [declaracao, setDeclaracao] = useState(null);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from("declaracoes")
        .select("*")
        .eq("slug", params.slug)
        .single(); // retorna apenas 1 linha
      if (error) console.error(error);
      else setDeclaracao(data);
    }
    carregar();
  }, [params.slug]);

  if (!declaracao) return <p>Carregando...</p>;

  const videoEmbed = declaracao.video_url
    ? declaracao.video_url.replace("watch?v=", "embed/")
    : null;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        fontFamily: "Poppins, sans-serif",
        padding: 20,
        background: "#f9f9f9",
        borderRadius: 15,
      }}
    >
      <h1 style={{ textAlign: "center" }}>{declaracao.titulo}</h1>
      <p>{declaracao.mensagem}</p>

      {declaracao.imagem_url && (
        <img
          src={declaracao.imagem_url}
          alt="Imagem"
          style={{ maxWidth: "100%", borderRadius: 10, marginTop: 10 }}
        />
      )}

      {videoEmbed && (
        <iframe
          src={videoEmbed}
          width="100%"
          height="315"
          style={{ borderRadius: 10, marginTop: 10 }}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
