"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Listar() {
  const [declaracoes, setDeclaracoes] = useState([]);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from("declaracoes")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.error(error);
      } else {
        setDeclaracoes(data);
      }
    }
    carregar();
  }, []);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        fontFamily: "Poppins, sans-serif",
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: "center" }}>💌 Declarações Salvas</h1>

      {declaracoes.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          Nenhuma declaração encontrada 😢
        </p>
      )}

      {declaracoes.map((item) => {
        const videoEmbed = item.video_url
          ? item.video_url.replace("watch?v=", "embed/")
          : null;

        return (
          <div
            key={item.id}
            style={{
              background: "#1e1e1e",
              color: "#fff",
              borderRadius: 10,
              padding: 20,
              marginBottom: 20,
            }}
          >
            <h2>{item.titulo || "Sem título"}</h2>
            <p>{item.mensagem}</p>

            {item.imagem_url && (
              <img
                src={item.imagem_url}
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
      })}
    </div>
  );
}
