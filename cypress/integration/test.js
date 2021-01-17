const hoy = new Date()
const maniana = new Date(hoy)
maniana.setDate(maniana.getDate() + 1)



describe('Enviar request a la API', () => {
    it('Comprobar si responde', () => {
        cy.request('GET', 'https://api.exchangeratesapi.io/latest')
            .its('body')
            .should('include', { base: 'EUR' })

        cy.request('GET', 'https://api.exchangeratesapi.io/latest')
            .then((response) => {
                expect(response).to.have.property('status', 200)
            })


    })
})


// Primero levantar servidor localHost (en mi caso puerto 5500)
describe('Testear Pagina', () => {
    it('Verificar elementos', () => {
        cy.visit('/')
        cy.get('.row').find('#fecha').should('not.have.value', maniana)
        cy.get('.row').find('#moneda').get('select').select('USD')
        cy.get('.row').find('#botonBusqueda').click()
        cy.get('#tabla').get('td').should('have.length', 99)
    })
})
