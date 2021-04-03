/**
 * @format
 */

import React, { useState, useEffect } from "react";

interface GlobalContextType {
  musumes: Array<any>;
  owns: Array<number>;
  onChangeOwn: (number, boolean) => void;
}
export const GlobalContext = React.createContext<GlobalContextType>({
  musumes: [],
  owns: [],
  onChangeOwn: () => {},
});
export default GlobalContext;

async function fetchJson(url: string) {
  const raw = await fetch(url);
  const json = await raw.json();
  return json;
}

interface Props {
  children: React.ReactNode;
}
export function GlobalContextProvider({ children }: Props) {
  const [musumes, setMusumes] = useState<Array<any>>([]);
  const [owns, setOwns] = useState<Array<number>>([]);

  useEffect(() => {
    (async function() {
      setOwns(await fetchJson(`${process.env.NEXT_PUBLIC_BACKEND_BASE}/get_all_owns.php`));
      setMusumes(await fetchJson("musumes.json"));
    })();
  }, []);

  async function handleChangeOwn(id: number, own: boolean) {
    const newOwns = owns.filter(currentId => (currentId !== id));
    if (own)
      newOwns.push(id);
    setOwns(newOwns);

    const formData = new FormData();
    formData.set("id", id.toString());
    formData.set("own", own ? "1" : "0");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE}/set_own.php`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        alert(`Failed to fetch set_own.php for id ${id} (${response.status})`);
      }
    } catch (err) {
      alert(`Failed to fetch set_own.php for id ${id} (${err})`);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        musumes,
        owns,
        onChangeOwn: handleChangeOwn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
