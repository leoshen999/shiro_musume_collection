import { Children } from "react";
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class RootDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Web manifest */}
          <link
            rel="manifest"
            href={process.env.NEXT_PUBLIC_FRONTEND_BASE + "manifest.json"}
          />
          {/* Theme */}
          <meta name="theme-color" content="#e6e6e6" />

          {/* Icons */}
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href={process.env.NEXT_PUBLIC_FRONTEND_BASE + "imgs/favicon.ico"}
          />
          <link
            rel="mask-icon"
            sizes="any"
            href={process.env.NEXT_PUBLIC_FRONTEND_BASE + "imgs/mask_icon.svg"}
            color="#4b4b4b"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href={
              process.env.NEXT_PUBLIC_FRONTEND_BASE +
              "imgs/apple_touch_icon.png"
            }
          />

          {/* Open Graph */}
          <meta
            property="og:image"
            content="https://leoshen999.github.io/shiro_musume_collection/imgs/og.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="城プロRE：城娘図鑑" />
          <meta property="og:site_name" content="城プロRE：城娘図鑑" />
          <meta
            property="og:url"
            content="https://leoshen999.github.io/shiro_musume_collection/"
          />
          <meta
            property="og:description"
            content="ブラウザゲーム城プロREのキャラ検索ツールです。絞込や表示順などの設定ご利用いただけます。"
          />
          <meta property="og:locale" content="ja_jp" />

          {/* Apple specific tags */}
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-title"
            content="城プロRE：城娘図鑑"
          />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="format-detection" content="telephone=no" />

          {/* Web fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
