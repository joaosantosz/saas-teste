"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkDeclaracao, setLinkDeclaracao] = useState("");

  // Gera slug amigável
  function gerarSlug(texto) {
    return texto
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setLoading(true);

    const slug = gerarSlug(titulo);

    const { data, error } = await supabase
      .from("declaracoes")
      .insert([{ titulo, mensagem, imagem_url: imagem, video_url: video, slug }])
      .select();

    if (error) {
      alert("❌ Erro ao salvar: " + error.message);
    } else {
      const url = `${window.location.origin}/declaracao/${slug}`;
      setLinkDeclaracao(url);

      setTitulo("");
      setMensagem("");
      setImagem("");
      setVideo("");
    }

    setLoading(false);
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

      {linkDeclaracao && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <p>✅ Declaração salva! Acesse ou copie seu link:</p>
          <input
            type="text"
            value={linkDeclaracao}
            readOnly
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              marginBottom: 10,
            }}
          />
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={() => window.open(linkDeclaracao, "_blank")}
              style={botaoEstilo}
            >
              Abrir Declaração
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(linkDeclaracao)}
              style={botaoEstilo}
            >
              Copiar Link
            </button>
          </div>
        </div>
      )}
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
