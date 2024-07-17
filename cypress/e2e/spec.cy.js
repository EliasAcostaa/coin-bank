describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')
  })
}) // ejemplo predeterminado de testeo de cypress


// primer testeo: usuario valido para el incio de sesion
describe('Primer testeo', () => {
  it('Ingresar con usuario válido', () => {
    cy.visit('http://localhost:8080/');   // visitar la pagina principal
    cy.get('#Usuario').type('usuario_valido');   // entrar con usuario valido
  });
});


// realizar mas testeos y en otras partes de la pagina tambien.