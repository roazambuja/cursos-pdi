import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/MonicaHillman/codeconnect-api/publicacoes"
    )
      .then((resposta) => resposta.json())
      .then((dados) => setDados(dados));
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <div>
        <SearchBar />
        <Filter />
        <ul className="lista-cards">
          {dados
            ? dados.map((item, index) => (
                <li key={index}>
                  <Card
                    id={item.id}
                    imagemUrl={item.imagem_capa}
                    titulo={item.titulo}
                    resumo={item.resumo}
                    linhasDeCodigo={item.linhas_de_codigo}
                    compartilhamentos={item.compartilhamentos}
                    comentarios={item.comentarios}
                    usuario={item.usuario}
                  />
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default App;
