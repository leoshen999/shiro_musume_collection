import Head from "next/head";
import ShiroMusumeList from "../src/components/ShiroMusumeList";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>城プロRE：城娘図鑑</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
      </Head>
      <ShiroMusumeList />
    </>
  );
}
