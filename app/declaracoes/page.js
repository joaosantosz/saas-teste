import { supabase } from "../../../lib/supabase";
import ImageFallback from "../../../components/ImageFallback"; // Client Component

// Renderização dinâmica (SSR) e revalidação
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Declaracao({ params }) {
  const { slug } = params;

  // Busca dados da declaração pelo slug
  const { data, error } = await supabase
    .from("declaracoes")
    .select("*")
    .eq("slug", slug)
    .single();

  // Página 404 customizada se não encontrar
  if (!data || error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-gray-700">
          ❌ Declaração não encontrada ou slug inválido.
        </p>
        <p className="text-sm text-gray-500 mt-2">Verifique o slug: {slug}</p>
      </div>
    );
  }

  // Renderização do conteúdo
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 border-b pb-2">
        {data.titulo}
      </h1>

      <p className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
        {data.mensagem}
      </p>

      {data.imagem_url && (
        <figure className="mb-6">
          <ImageFallback
            src={data.imagem_url}
            alt={`Imagem para ${data.titulo}`}
            className="w-full h-auto rounded-xl object-cover shadow-lg"
          />
          <figcaption className="text-sm text-gray-500 mt-2">Imagem de apoio.</figcaption>
        </figure>
      )}

      {data.video_url && (
        <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={data.video_url}
            title={`Vídeo para ${data.titulo}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )}

      <div className="mt-8 pt-4 border-t text-right text-sm text-gray-500">
        Gerado pelo seu micro-SaaS.
      </div>
    </div>
  );
}

// SEO dinâmico opcional
export async function generateMetadata({ params }) {
  const { slug } = params;
  return {
    title: `Declaração: ${slug}`,
  };
}
