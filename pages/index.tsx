import Head from "next/head";
import ShiroMusumeList from "../src/components/ShiroMusumeList";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>城プロRE：城娘図鑑</title>
      </Head>
      <ShiroMusumeList />
    </>
  );
}
