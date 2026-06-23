describe('Tests loading of public pages', () => {
  it('loads the home page', () => {
    cy.visit('/')
  })
  it('loads the projects page', () => {
    cy.visit('/projects')
  })
  it('loads the contact page', () => {
    cy.visit('/contact')
  })
  it('loads the login page', () => {
    cy.visit('/login')
  })
})