export const metadata = {
  title: "Mini SaaS",
  description: "Mini projeto com Next.js + Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#f0f0f0",
      }}>
        {children}
      </body>
    </html>
  );
}
