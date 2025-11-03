"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Home() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("declaracoes")
      .insert([{ titulo, mensagem, imagem_url: imagem, video_url: video }]);

    if (error) alert("❌ Erro ao salvar: " + error.message);
    else alert("✅ Declaração salva com sucesso!");

    setLoading(false);
    setTitulo("");
    setMensagem("");
    setImagem("");
    setVideo("");
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        fontFamily: "Poppins, sans-serif",
        background: "#f9f9f9",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>💌 Criar Declaração</h2>

      <form
        onSubmit={enviarFormulario}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={inputEstilo}
        />
        <textarea
          placeholder="Mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
          style={inputEstilo}
        />
        <input
          placeholder="URL da imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          style={inputEstilo}
        />
        <input
          placeholder="Link do vídeo (YouTube)"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          style={inputEstilo}
        />
        <button type="submit" disabled={loading} style={botaoEstilo}>
          {loading ? "Enviando..." : "Salvar Declaração"}
        </button>
      </form>

      {/* Botão para ir para listagem */}
      <Link
        href="/listar"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "15px",
          color: "#0070f3",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        📄 Ver todas as declarações
      </Link>
    </div>
  );
}

const inputEstilo = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const botaoEstilo = {
  background: "#0070f3",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};
