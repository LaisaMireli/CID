import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Para usar sua logo.jpg como favicon: */}
        {/* 1. Certifique-se de que 'logo.jpg' foi copiado/movido para 'public/images/' */}
        {/* 2. O caminho aqui deve ser o caminho público: /images/logo.jpg */}
        <link rel="icon" type="image/jpeg" href="@/" />
        
     
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}