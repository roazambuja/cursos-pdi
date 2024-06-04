import { render, screen } from '@testing-library/react';
import App from './paginas/Principal/App';
import Cartoes from './componentes/Cartoes';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes';

describe('Rotas', () => {
  test('deve renderizar a rota principal', () => {
    render(<App />, { wrapper: BrowserRouter });
    const usuario = screen.getByText('Olá, Joana :)!');
    expect(usuario).toBeInTheDocument();
  });

  test('deve renderizar a rota cartões', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');
    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });

  test('deve renderizar a localização da rota atual', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    const localizacaoAtual = screen.getByTestId('local');
    expect(localizacaoAtual).toHaveTextContent(rota);
  });

  test('deve renderizar a página 404', () => {
    const rota = '/extrato';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const paginaErro = screen.getByTestId('pagina-404');
    expect(paginaErro).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});