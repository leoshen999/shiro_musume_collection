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
          <meta charSet="utf-8" />
          <meta
            property="og:image"
            content={process.env.NEXT_PUBLIC_FRONTEND_BASE + "/og.png"}
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="城プロRE：城娘図鑑" />
          <meta
            property="og:description"
            content="ブラウザゲーム城プロREのキャラ検索ツールです。絞込や表示順などの設定ご利用いただけます。"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            href={process.env.NEXT_PUBLIC_FRONTEND_BASE + "/favicon.ico"}
          />
          <link
            rel="manifest"
            href={process.env.NEXT_PUBLIC_FRONTEND_BASE + "/manifest.json"}
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
