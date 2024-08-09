describe('blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'jason liuu',
      username: 'jasonjason!',
      password: 'jason1118',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', () => {
    it('succeeds with right credentials', () => {
      cy.get('input:first').type('jasonjason!')
      cy.get('input:last').type('jason1118')
      cy.contains('login').click()
      cy.contains('Add new blog')
    })

    it('fails with wrong credentials', () => {
      cy.get('input:first').type('wrong!')
      cy.get('input:last').type('jason1118')
      cy.contains('login').click()
      cy.get('html').should('not.contain', 'Add new blog')
    })
  })

  describe('when logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'jasonjason!', password: 'jason1118' })
      cy.createBlog({
        title: 'cypress',
        author: 'good people',
        url: 'testurl.com',
      })
    })

    it('user should be able to create a new blog', () => {
      cy.get('.blogs').should('contain', 'cypress')
    })

    it('a created blog can be deleted', () => {
      cy.get('.deletebtn').click()
      cy.get('.blogs').should('contain', 'nothing to show, start typing!')
    })

    it('new blogs are ranked based on likes', () => {
      cy.createBlog({
        title: 'blog with more likes',
        author: 'Jason',
        url: 'jinsenliu.me',
      })

      cy.contains('blog with more likes').as('blogtolike')
      cy.get('@blogtolike').should('contain', 'blog with more')
    })
  })
})
