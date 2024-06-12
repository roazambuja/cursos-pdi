import { call, cancel } from "redux-saga/effects";
import { categoriasSaga, observarCategorias } from "./categorias";
import categoriasService from "services/categorias";
import { adicionarTodasAsCategorias } from "store/reducers/categorias";

describe("Testando categorias saga", () => {
  describe("workers", () => {
    test("deve executar categoriasService.buscar", () => {
      const funcaoGeradora = observarCategorias();
      const funcaoEsperada = call(categoriasService.buscar);

      funcaoGeradora.next(); // delay
      const funcaoExecutada = funcaoGeradora.next();

      expect(funcaoExecutada.value).toEqual(funcaoEsperada);
    });
  });

  describe("watchers", () => {
    test("deve executar a tarefa corretamente", () => {
      const funcaoGeradora = categoriasSaga();
      funcaoGeradora.next();
      const funcaoEsperada = take(adicionarTodasAsCategorias);

      expect(funcaoGeradora.next().value).toEqual(funcaoEsperada);
    });

    test("deve executar a tarefa apenas uma vez", () => {
      const funcaoGeradora = categoriasSaga();
      const mockTarefa = createMockTask();
      funcaoGeradora.next(mockTarefa);
      const funcaoCancelarEsperada = cancel(mockTarefa.cancel());
      funcaoGeradora.next();

      expect(funcaoGeradora.next().value).toEqual(funcaoCancelarEsperada);
    });
  });
});
