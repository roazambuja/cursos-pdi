import { fakerPT_BR } from '@faker-js/faker';

describe('Atualização de dados do usuario', () => {
  const novoDadosDeUsuario = {
    nome: fakerPT_BR.person.fullName(),
    senha: fakerPT_BR.internet.password(),
  };

  it('Deve permitir o usuário atualizar seus dados', () => {
    cy.fixture('usuarios').as('usuarios');
    cy.get('@usuarios').then((usuario) => {
      cy.login(usuario[0].email, usuario[0].senha);

      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(usuario[0].nome).should('be.visible');

      cy.getByData('app-home').find('a').eq(1).click();

      cy.url().should('include', '/minha-conta');

      cy.getByData('botao-salvar-alteracoes').should('be.disabled');

      cy.get('[name = "nome"]').type(novoDadosDeUsuario.nome);
      cy.get('[name = "senha"]').type(novoDadosDeUsuario.senha);

      cy.getByData('botao-salvar-alteracoes').should('not.be.disabled');
      cy.getByData('botao-salvar-alteracoes').click();

      cy.on('window:alert', (textoDoAlert) => {
        expect(textoDoAlert).to.equal('Alterações salvas com sucesso!');
      });

      cy.url().should('include', '/home');

      cy.window().then((win) => {
        expect(win.localStorage.getItem('nomeUsuario')).to.equal(
          novoDadosDeUsuario.nome
        );

        const userId = win.localStorage.getItem('userId');
        cy.request('GET', `http://localhost:8000/users/${userId}`).then(
          (resposta) => {
            expect(resposta.status).to.eq(200);
            expect(resposta.body.nome).to.be.equal(novoDadosDeUsuario.nome);
            expect(resposta.body.senha).to.be.equal(novoDadosDeUsuario.senha);
          }
        );
      });
    });
  });
});
