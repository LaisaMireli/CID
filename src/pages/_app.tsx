// src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout  from '@/components/Layout'; // Seu componente de Layout principal (com o Menu)

function MyApp({ Component, pageProps, router }: AppProps) {
  // Rotas que NÃO devem ter o layout principal (com o menu)
  const noLayoutRoutes = ['/', '/cadastro']; // '/' é a página de Login

  const showLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <>
      {/* Se a rota precisar do layout (com menu), envolva o componente */}
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        // Se a rota não precisar do layout (login, cadastro), renderize o componente diretamente
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;