Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('verificaTexto', (seletor, texto) => {
  cy.get(`${seletor}`).contains(`${texto}`);
});
