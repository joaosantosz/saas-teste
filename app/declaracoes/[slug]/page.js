import { supabase } from "../../../lib/supabase";

export default async function Declaracao({ params }) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("declaracoes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data || error) {
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        ❌ Declaração não encontrada 😢
      </p>
    );
  }

  const videoEmbed = data.video_url
    ? data.video_url.replace("watch?v=", "embed/")
    : null;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h1>{data.titulo}</h1>
      <p>{data.mensagem}</p>
      {data.imagem_url && (
        <img
          src={data.imagem_url}
          alt="Imagem"
          style={{ maxWidth: "100%", borderRadius: 10 }}
        />
      )}
      {videoEmbed && (
        <iframe
          src={videoEmbed}
          width="100%"
          height="315"
          style={{ borderRadius: 10, marginTop: 10 }}
          allowFullScreen
        />
      )}
    </div>
  );
}
