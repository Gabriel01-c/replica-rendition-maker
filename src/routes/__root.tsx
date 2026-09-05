import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dr. Francisco Amaral" },
      { name: "description", content: "Descubra como escolher o vasoativo certo no plantão" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Dr. Francisco Amaral" },
      { property: "og:description", content: "Descubra como escolher o vasoativo certo no plantão" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Dr. Francisco Amaral" },
      { name: "twitter:description", content: "Descubra como escolher o vasoativo certo no plantão" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8414d5db-02c1-4ef6-bd60-ee03293b8585/id-preview-cb65160c--f6e63e7f-acca-466e-96ac-0ccdb9b7bc56.lovable.app-1779653570508.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8414d5db-02c1-4ef6-bd60-ee03293b8585/id-preview-cb65160c--f6e63e7f-acca-466e-96ac-0ccdb9b7bc56.lovable.app-1779653570508.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..700&family=Inter+Tight:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isFisiologiaFarmacologia = pathname === "/fisiologia-farmacologia";
  const isEbookViasAereas = pathname === "/ebook-vias-aereas" || pathname === "/ebook-viasaereas-obg";
  const isImersaoHppTy = pathname === "/imersao-hpp-ty";
  const excludeGlobalGtm = isFisiologiaFarmacologia || isEbookViasAereas || isImersaoHppTy;

  return (
    <html lang="en">
      <head>
        {!excludeGlobalGtm && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NNNKN4GS');`,
            }}
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(dashfacil, d, s, id){var df = window.dashfacil = window.dashfacil || {};df._c = df._c || [];var js, fjs = d.getElementsByTagName(s)[0];if (!fjs) { return; }js = d.createElement(s); js.id = id;js.src = "//server.dashfacil.com/static/assets/rastreio.js?v=" + Date.now();fjs.parentNode.insertBefore(js, fjs);df.dfq = function(k, v) { df._c.push([k, v]); };df.dfq('init', '1759');})(window, document, 'script', 'dashfacil-js');`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {!excludeGlobalGtm && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNNKN4GS" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
