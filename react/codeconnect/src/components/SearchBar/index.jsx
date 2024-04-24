import { useState } from "react";
import "./styles.css";

export default function SearchBar() {
  const [termoPesquisa, setTermoPesquisa] = useState("");

  return (
    <input
      type="search"
      placeholder="Digite o que você procura"
      className="barra-pesquisa"
      value={termoPesquisa}
      onChange={(event) => setTermoPesquisa(event.target.value)}
    />
  );
}
