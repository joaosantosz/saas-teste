"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Declaracoes() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from("declaracoes")
        .select("*")
        .order("id", { ascending: false });
      if (!error) setDados(data);
    }
    carregar();
  }, []);

  return (
    <div style={{
      maxWidth: 700,
      margin: "40px auto",
      fontFamily: "Poppins, sans-serif"
    }}>
      <h2 style={{ textAlign: "center" }}>📝 Declarações</h2>
      {dados.length === 0 && <p style={{ textAlign: "center" }}>Nenhuma declaração ainda 😢</p>}

      {dados.map((item) => (
        <div key={item.id} style={{
          margin: "20px 0",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#fafafa"
        }}>
          <h3>{item.titulo}</h3>
          <p>{item.mensagem}</p>

          {item.imagem_url && (
            <img src={item.imagem_url} alt="Imagem" style={{
              width: "100%",
              borderRadius: "8px",
              margin: "10px 0"
            }} />
          )}

          {item.video_url && (
            <iframe
              width="100%"
              height="315"
              src={item.video_url.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: "8px" }}
            ></iframe>
          )}
        </div>
      ))}

      <a href="/" style={{ display: "block", textAlign: "center", color: "#0070f3", marginTop: "20px" }}>
        ← Voltar
      </a>
    </div>
  );
}
