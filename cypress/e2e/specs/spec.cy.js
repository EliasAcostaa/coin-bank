describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')
  })
}) // ejemplo predeterminado de testeo de cypress


// primer testeo: usuario e ingreso validos para el incio de sesion
describe('Ingreso exitoso / Primer testeo', () => {
  it('Ingresar con usuario válido', () => {
    cy.visit('http://localhost:8080/');                        // visitar la pagina principal
    cy.get('#Usuario').type('usuario_valido');                 // entrar con usuario valido
    cy.get('#boton').click()                                   // presionar boton Ingresar 
    cy.url().should('include', 'http://localhost:8080/Home');  // url debe incluir Home
  });
});


// segundo testeo: existencia barra de navegacion y enlaces
describe('Test de barra de navegacion', () => {
  it('Verificar barra de navegacion presente', () => {
    cy.visit('http://localhost:8080/');
    cy.get('[data-testid="barraNavegacion"]').should('exist');  // data-testid= atributo utilizado para nombrar al 
  })    
  
  it('Verificar enlaces', () => {
    cy.visit('http://localhost:8080/');
    cy.get('router-link to: [name:"Contacto"]').should('have.attr', 'href', 'http://localhost:8080/Contacto');
  })  //ver o dejar comprobacion de enlaces?¿?
})
  // VER: EXISTE FORMA DE INCLUIR UN COMPONENTE EN LOS TESTEOS?????















// comandos, herramientas/METODOS y ACCIONES que nos ofrece CYPRESS:

// describe --> define estructura de nuestro test, guarda conjuntos de tests (funcion y nombre del testeo) 
// it --> define cada test individual
// cy.visit('\') --> sirve para visitar url
// cy.url() --> obtiene la url en la que estamos
// cy.contains('h1', 'tituloDeEtiquetaH1')
// cy.contains("label", "Content") --> comprobamos si la pagina contiene dichos elementos
// cy.should('have.css', 'color', '#ff0000') --> contains generalizado. comprobacion de proposito general sobre dichos elementos
// cy.request('POST', uri, {}) --> para realizar peticiones
// cy.get('.clase') --> obtener elemento segun su clase
// cy.get('#id') --> obtener elemento segun su id
// cy.get('[data-test-id= "myId') --> obtener elemento segun su argumento
// cy.click() --> accion de click
// cy.type("username") --> accion de escribir (type)

// SE PUEDEN REALIZAR CONCATENACIONES DE LOS METODOS: 
// ejemplo: cy.get('#counterInfo').contains(0) --> al obtener el contador, éste a la vez debe estar en 0. 

