import { fakerPT_BR } from '@faker-js/faker';

describe('Teste de cadastro de usuário', () => {
  const usuario = {
    nome: fakerPT_BR.person.fullName(),
    email: fakerPT_BR.internet.email(),
    senha: fakerPT_BR.internet.password(),
  };

  it('deve permitir cadastrar um usuário com sucesso', () => {
    cy.visit('/');

    cy.getByData('botao-cadastro').click();
    cy.getByData('nome-input').type(usuario.nome);
    cy.getByData('email-input').type(usuario.email);
    cy.getByData('senha-input').type(usuario.senha);
    cy.getByData('checkbox-input').check();
    cy.getByData('botao-enviar').click({ force: true });

    cy.getByData('mensagem-sucesso')
      .should('exist')
      .contains('Usuário cadastrado com sucesso!');

    cy.request('GET', 'http://localhost:8000/users/').then((resposta) => {
      expect(resposta.body).to.have.lengthOf.at.least(1);
      expect(resposta.body[resposta.body.length - 1]).to.deep.include(usuario);
    });
  });
});
