"use client"; // habilita interatividade

export default function ImageFallback({ src, alt, className }) {
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://placehold.co/800x450/A3A0FF/ffffff?text=Falha+ao+Carregar+Imagem";
  };

  return <img src={src} alt={alt} className={className} onError={handleError} />;
}
