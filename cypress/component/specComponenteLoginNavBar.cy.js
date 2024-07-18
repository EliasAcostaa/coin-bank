describe('specComponenteLoginNavBar.cy.js', () => {
  it('playground', () => {
    // cy.mount()
    
  })
})

// realizo pruebas de componentes?¿

import LoginNavBarComponent from '@/components/LoginNavBarComponent.vue';
//cy.mount(LoginNavBarComponent);

describe('Prueba de componente', () => {
  it ('prueba de componente', () => {
    cy.mount(LoginNavBarComponent);
    cy.visit('http://localhost:8080/');
    cy.get('LoginNavBarComponent').should('exist');
  })
})
