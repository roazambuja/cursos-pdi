import buscaReducer, { mudarBusca, resetarBusca } from "./busca";

describe("Testando busca reducer", () => {
  test("deve mudar busca como esperado", () => {
    expect(buscaReducer("", mudarBusca("teste"))).toEqual("teste");
  });

  test("deve resetar busca como esperado", () => {
    expect(buscaReducer("outro valor", resetarBusca())).toEqual("");
  });
});
